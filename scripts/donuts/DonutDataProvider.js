//! Get the data
//* 1. Create a variable to hold the collection of data
//? What's the data type of the data? An array of objects
//? What's the variable's initial value? An empty array
let donutsArray = []

//* 2. Get the collection of data
//? Where is the data coming from? An API

//*   i. Fetch request for HTTP request
//?   Which HTTP method? GET
//?   What's the path (URL)? http://localhost:8088/donuts
//?   Any headers? No
//?   Anything in the body? No


//*   ii. After receiving an HTTP response (.then), convert it to JSON so that we can access the data 
//*   iii. After parsing the response (.then), assign the data to the variable from Step 1
export const getDonuts = () => {
  return fetch("http://localhost:8088/donuts")
  .then(response => response.json())
  .then(donutsCollection => {
    donutsArray = donutsCollection
    // console.log("donutsArray", donutsArray)
  })
}


//*   iv. Since we want other components to have access to the data but only want them to have "read-only" access, we export a function that returns a copy of the array. NOTE: We don't import donutsArray itself. 
export const useDonuts = () => donutsArray.slice()
