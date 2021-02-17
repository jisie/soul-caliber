export const Facility = (facilityObject, criminalsArray) => {
  return `
      <article class="facility">
        <h4>${facilityObject.facilityName}</h4>
        <p>Security Level: ${facilityObject.securityLevel}</p>
        <p>Capacity: ${facilityObject.capacity}</p>
        <div>
          <h5>Criminals</h5>
          <ul>
              ${criminalsArray.map(c => `<li>${c.name}</li>`).join("")}
          </ul>
        </div>
      </article>
  `
}
