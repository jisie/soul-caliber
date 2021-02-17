import { getNotes, useNotes } from "./NoteProvider.js";
import { NoteHTMLConverter } from "./Note.js";
import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js";

// Query the DOM for the element that your notes will be added to 
const contentTarget = document.querySelector(".notesContainer")
// Define ye olde Evente Hubbe
const eventHub = document.querySelector(".container")

let allNotes = []
let allCriminals = []

eventHub.addEventListener("showNotesClicked", customEvent => {
  NoteList()
})

eventHub.addEventListener("noteStateChanged", event => {
  if (contentTarget.innerHTML !== "") {
    NoteList()
  }
})

// Standard list function you're used to writing by now. BUT, don't call this in main.js! Why not?
export const NoteList = () => {
  getNotes()
  .then(getCriminals)
    .then(() => {
      allNotes = useNotes()
      allCriminals = useCriminals()
      render()
    })
}

const render = () => {
  const allNotesConvertedToStrings = allNotes.map(noteObject => {
    const relatedCriminalObject = allCriminals.find(criminal => criminal.id === noteObject.criminalId)
    return NoteHTMLConverter(noteObject, relatedCriminalObject)
    // debugger

    // convert the notes objects to HTML with NoteHTMLConverter
  }).join("")

  contentTarget.innerHTML = `
    <h3>Case Notes</h3>
    <section class="notesList">
    ${allNotesConvertedToStrings}
    </section>
  `
}
