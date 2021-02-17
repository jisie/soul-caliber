import { getWitnessStatements, useWitnessStatements } from "./WitnessProvider.js"
import { WitnessStatement } from "./Witness.js";

const eventHub = document.querySelector(".container")
const witnessesContainer = document.querySelector(".witnessesContainer")


eventHub.addEventListener("witnessesClicked", () => WitnessList())

eventHub.addEventListener("criminalsClicked", () => witnessesContainer.innerHTML = "")

eventHub.addEventListener("facilitiesClicked", () => witnessesContainer.innerHTML = "")

const WitnessList = () => {

  getWitnessStatements()
    .then(() => {
      const witnessesArray = useWitnessStatements()
      // console.log(witnessesArray)
      render(witnessesArray)
    })

}

const render = (witnessStatementsArray) => {
  let witnessStatementsHTMLRepresentations = ""
  for (const witness of witnessStatementsArray) {

    witnessStatementsHTMLRepresentations += WitnessStatement(witness)
  }

  witnessesContainer.innerHTML = `
        <h2>Witness Statements</h2>
        <section class="witnessesList">
          ${witnessStatementsHTMLRepresentations}
        </section>
      `
}
