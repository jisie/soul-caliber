const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".button__witnesses")


export const renderWitnessesButton = () => {

  contentTarget.innerHTML = `
    <button id="display-witnesses-button">Witness Statements</button>
    `
}

eventHub.addEventListener("click", (clickEvent) => {
  if (clickEvent.target.id === "display-witnesses-button") {

    const witnessButtonClicked = new CustomEvent("witnessesClicked")

    eventHub.dispatchEvent(witnessButtonClicked)

  }
})
