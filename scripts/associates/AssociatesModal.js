// TODO: PART 2 - Listen for Custom Event and Display Associates on DOM
// Which Component Needs to Listen for the "showAssociates" event?
// ** New AssociatesModalComponent
// Create ModalComponent that takes in a Criminal object and returns some HTML representation of a criminal’s associates
// Add EventListener to Event Hub that listens for "showAssociates" event
// TEST - need event listener on DOM >> Where? Button Component
// Needs a place to go in the DOM - add Modal Container to index.html
// Get the Criminal ID from the detail
// Find the criminal from the array of criminals (>> import useCriminals)
// Call the ModalComponent function and pass in the criminal as an argument and store HTML string in a variable
// Add the resulting HTML to the DOM
// ADD MODAL CSS
// Import modal.css to main.css

import { useCriminals } from "../criminals/CriminalProvider.js"

const contentContainer = document.querySelector(".associatesContainer")

export const AssociatesModal = (criminalObj) => {
    const HTMLRep = `
    <div id="alibi__modal" class="modal--parent">
        <div class="modal--content">
            <h1>Known associates for ${criminalObj.name}</h1>
            ${criminalObj.known_associates.map(associate => {
        return `<section class="associate__container">
            <div class="associate__name">${associate.name}</div>
            <div class="associate__alibi">Alibi: ${associate.alibi}</div>
            </section>`
    }).join("")}
    <button id="modal--close">close modal</button>
        </div>
    </div>
        `

    contentContainer.innerHTML = HTMLRep
}

const eventHub = document.querySelector(".container")
eventHub.addEventListener("AssociatesClicked", event => {
    const selectedCriminalId = event.detail.criminalId
    const criminalsArray = useCriminals()
    const selectedCriminal = criminalsArray.find((criminal) => criminal.id === selectedCriminalId)
    AssociatesModal(selectedCriminal)
})


eventHub.addEventListener("click", event => {
    if (event.target.id === "modal--close") {
        closeModal()
    }
})

const closeModal = () => {
    contentContainer.innerHTML = ""
}
