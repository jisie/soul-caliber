import { getDonuts, useDonuts } from "./DonutDataProvider.js"
import { DonutHTMLRepresentation } from "./Donut.js"

//* Because there are two functions in this component that uses the array of donuts, we make sure the variable donutsArray is accessible within the scope of the component. This way, this component is responsible for it's own data and any changes in the state of that data.
let donutsArray = []

export const DonutList = () => {
  //* DonutList is the function that we execute from main.js. This function provides an abstraction for what happens when we render our collection of donuts:
  //* 1. Get the data from the API: getDonuts() 
  //* 2. Then, get a copy of the array of donuts: useDonuts() 
  //* 3. Once we have the data, render the data to the DOM: render() 
  //! getDonuts and useDonuts are functions defined in DonutDataProvider.js and imported into this component
  getDonuts()
    .then(() => {
      donutsArray = useDonuts()
      render()
    })
}

const render = () => {
  //! Render the data to the DOM
  //? What does the data look like? An array of objects
  //? What needs to be rendered on the DOM? A string with HTML for each donut

  //* 3. Create a variable to hold the HTML that will eventually be rendered to the DOM?
  //? What's the data type? String
  //? What's the variable's initial value? Empty string
  let htmlDonutCollection = ""

  //* 4. Iterate through the data
  //? What's the data structure of the data? An array
  //? Based on the data structure, what are my options to loop through the collection to access each item? .map, for...of, .forEach, for loop
  //? From the above options, which one do I want to use? .map because it allows us to return the html representation for each item, eventually giving us an array of strings
  //? How do you access the current item being iterated over within the loop? The first parameter of the callback function for .map. Here, that's donut
  donutsArray.map((donut) => {
    // debugger
    //* 5. For each item in the collection, build the HTML representation
    //*   i. Build the HTML for one item
          //! DonutHTMLRepresentation is a function defined in Donut.js and imported into this component
    const htmlForOneDonut = DonutHTMLRepresentation(donut)

    //*   ii. Add the HTML for the current item to the variable from Step 3
    //? What can be used to add to the the current value of the variable so that we do that loose the current value? +=
    htmlDonutCollection += htmlForOneDonut
    // debugger
  })
  // debugger

  //* 6. Find the element on the DOM where you will put the HTML that has been built
  //? What are can be used to identify this element? A class, donutContainer
  //? What methods will give us a reference to an element on the DOM? querySelector, getElementById, getElementsByClass, etc.
  //? From the above methods, which one will be used here? querySelector
  const donutContainer = document.querySelector(".donutContainer")

  //* 7. Render the HTML inside the element from Step 6.
  //? Is there any additional HTML to add to what has currently been built? Yes, add a h1 above the sections: <h1>Donut Menu</h1>
  //? Which property gives access to the HTML content of an element? innerHtml
  donutContainer.innerHTML = `<h1>Donut Menu:</h1>${htmlDonutCollection}`
}
