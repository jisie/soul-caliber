import { ShowAssociatesButton } from "../associates/ShowAssociatesButton.js"

export const Criminal = (criminalObj, facilitiesArray) => {
    return `
      <article class="criminal">
          <h4>${criminalObj.name}</h4>
          <p>Age: ${criminalObj.age}</p>
          <p>Crime: ${criminalObj.conviction}</p>
          <p>Term start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</p>
          <p>Term end: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</p>
          <div>
                <h5>Facilities</h5>
                <ul>
                    ${facilitiesArray.map(f => `<li>${f.facilityName}</li>`).join("")}
                </ul>
            </div>
          ${ShowAssociatesButton(criminalObj)}
      </article>
  `
}
