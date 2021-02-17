/*
 *   OfficerSelect component that renders a select HTML element
 *   which lists all the officers in the Glassdale PD API
 */
import { getOfficers, useOfficers } from "./OfficerProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__officer")

// On the event hub, listen for a "change" event.
eventHub.addEventListener("change", changeEvent => {
    // Only do this if the element with id `officerSelect` was changed
    if (changeEvent.target.id === "officerSelect") {
        // Get the name of the selected officer
        const selectedOfficer = changeEvent.target.value
        // Create custom event
        const officerSelectedCustomEvent = new CustomEvent("officerSelected", {
            detail: {
                selectedOfficerName: selectedOfficer
            }
        })

        // Dispatch to event hub
        eventHub.dispatchEvent(officerSelectedCustomEvent)
    }
})

export const OfficerSelect = () => {
    // Trigger fetching the API data and loading it into application state
    getOfficers()
        .then(() => {
            // Get all convictions from application state
            const officers = useOfficers()
            render(officers)
        })
}

const render = officerCollection => {
    contentTarget.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer...</option>
            ${officerCollection.map(officer => `<option value="${officer.name}">${officer.name}</option>`).join("")
        }
        </select>
    `
}

eventHub.addEventListener("crimeChosen", crimeChosenEvent => document.querySelector("#officerSelect").value = 0)
