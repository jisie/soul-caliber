const contentTarget = document.querySelector(".button__facilities")
const eventHub = document.querySelector(".container")


export const renderFacilitiesButton = () => {
  render()
}

const render = () => contentTarget.innerHTML = `<button id="display-facilities-button">List Facilities</button>`

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "display-facilities-button") {
    const facilityButtonClicked = new CustomEvent("facilitiesClicked")

    eventHub.dispatchEvent(facilityButtonClicked)

  }
})
