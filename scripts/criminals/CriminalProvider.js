let criminals = []

export const useCriminals = () => {
  return criminals.slice()
}

export const getCriminals = () => {
  /*
      Load database state into application state with a fetch().
      Make sure the last then() updates the criminals array
  */
  return fetch("https://criminals.glassdale.us/criminals")
    .then(response => response.json())
    .then(parsedResponse => {
      // console.log(parsedResponse)
      criminals = parsedResponse
    })

}
