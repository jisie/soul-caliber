import { getCriminals, useCriminals } from "./CriminalProvider.js"
import { Criminal } from "./Criminal.js"
import { useConvictions } from "./../convictions/ConvictionProvider.js"
import { getCriminalFacilities, useCriminalFacilities } from "../facilities/CriminalFacilityProvider.js"
import { getFacilities, useFacilities } from "./../facilities/FacilityProvider.js"

const eventHub = document.querySelector(".container")
const criminalsContainer = document.querySelector(".criminalsContainer")

export const CriminalList = () => {
    // Kick off the fetching of all the collections of data
    getCriminals()
        .then(getCriminalFacilities)
        .then(getFacilities)
        .then(() => {
            // Pull in the data now that it has been fetched
            const criminalsArray = useCriminals()
            const criminalFacilitiesArray = useCriminalFacilities()
            const facilitiesArray = useFacilities()

            // Pass all three collections of data to render()
            renderToDom(criminalsArray, criminalFacilitiesArray, facilitiesArray)

        })
}

const renderToDom = (criminalCollection, crimFacCollection, facilityCollection) => {
    let criminalsHTMLRepresentations = ""
    // debugger

    // Step 1 - Iterate all criminals
    for (const criminal of criminalCollection) {
        // Step 2 - Filter all relationships to get only ones for this criminal
        const arrayOfCrimFacObjects = crimFacCollection.filter(criminalFacility => criminal.id === criminalFacility.criminalId)

        // Step 3 - Convert the relationships to facilities with map()
        const arrayOfFacilityObjects = arrayOfCrimFacObjects.map(criminalFacility => {
            // debugger
            const relatedFacilityObject = facilityCollection.find(facility => facility.id === criminalFacility.facilityId)
            return relatedFacilityObject
        })

        // const arrayOfFacilityObjects = arrayOfCrimFacObjects.map(criminalFacility => facilityCollection.find(facility => facility.id === criminalFacility.facilityId))
        // debugger

        // Must pass the matching facilities to the Criminal component
        criminalsHTMLRepresentations += Criminal(criminal, arrayOfFacilityObjects)
    }

    criminalsContainer.innerHTML = `
    <h2>Criminals</h2>
    <section class="criminalsList">
    ${criminalsHTMLRepresentations}
    </section>`
}

// Listen for the "crimeChosen" custom event you dispatched in ConvictionSelect
eventHub.addEventListener("crimeChosen", crimeChosenEvent => {
    if (crimeChosenEvent.detail.crimeThatWasChosen !== "0") {
        // debugger
        /*
          We have the the id of the conviction that the user selected from the drop down (crimeChosenEvent.target.crimeThatWasChosen). But each criminal object has the name of the crime they were convicted for. So we need to get the name of the conviction associated with the unique identifier. To get the name, we get the conviction object which has the property for name.
        */

        // Get a copy of the array of convictions from the data provider
        const convictionsArray = useConvictions()

        // Use the find method to get the first object in the convictions array that has the same id as the id of the chosen crime
        const chosenConvictionObject = convictionsArray.find(convictionObj => {
            // console.log("currently checking", convictionObj)
            return convictionObj.id === parseInt(crimeChosenEvent.detail.crimeThatWasChosen)
        })
        // debugger
        console.log(chosenConvictionObject.name)

        /*
            Filter the criminals application state down to the people that committed the crime
        */

        // Get a copy of the array of criminals from the data provider
        const criminalsArray = useCriminals()
        const crimFacArray = useCriminalFacilities()
        const facilitiesArray = useFacilities()

        /*
          Now that we have the name of the chosen crime, filter the criminals data down to the people that committed the crime
        */
        //  debugger
        const filteredCriminalsArray = criminalsArray.filter(criminalObj => criminalObj.conviction === chosenConvictionObject.name)


        /*
            Then invoke render() and pass the filtered collection as
            an argument
        */
        renderToDom(filteredCriminalsArray, crimFacArray, facilitiesArray)
    }
})

eventHub.addEventListener("officerSelected", event => {
    // How can you access the officer name that was selected by the user?
    const officerName = event.detail.selectedOfficerName

    // How can you get the criminals that were arrested by that officer?
    const criminals = useCriminals()
    const filteredCriminalsArray = criminals.filter(
        criminalObject => {
            if (criminalObject.arrestingOfficer === officerName) {
                return true
            }
        }
    )

    const crimFacArray = useCriminalFacilities()
    const facilitiesArray = useFacilities()

    //Render filtered criminals to DOM
    renderToDom(filteredCriminalsArray, crimFacArray, facilitiesArray)
})

eventHub.addEventListener("witnessesClicked", () => {
    criminalsContainer.innerHTML = ""
})

eventHub.addEventListener("facilitiesClicked", () => {
    criminalsContainer.innerHTML = ""
})


eventHub.addEventListener("criminalsClicked", () => CriminalList())
