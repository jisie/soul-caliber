// TODO: PART 1 - Make Button - Dispatch Custom Event
// Create a ShowAssociates Button component that returns some button HTML representation
// Add ShowAssociates button to Criminal Card - (needs import)
// Use the Criminal’s ID in the ID property of the button - (component will most likely take in a criminal object or ID as an argument)
// Need event listener to hear the click - so you need a reference to the Event Hub
// AddEventListener to Event Hub that listens for that specific button click
// Check event for id to match part of the string - (associates--1 or something like that)
// Dispatch Custom Event named something like "showAssociates" and pass Id of Criminal in the detail object


import "./AssociatesModal.js"

export const ShowAssociatesButton = (criminalObj) => {
    return `<button id="associates--${criminalObj.id}">Associate Alibis</button>`
}

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", event => {
    if (event.target.id.startsWith("associates--")) {
        const [prefix, criminalId] = event.target.id.split("--")
        const customEvent = new CustomEvent("AssociatesClicked", {
            detail: {
                criminalId: parseInt(criminalId)
            }
        })
        eventHub.dispatchEvent(customEvent)
    }

})