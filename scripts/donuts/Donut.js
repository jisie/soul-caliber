export const DonutHTMLRepresentation = (donut) => {
  //!   The HTML for an item
  //?   What is the data structure of the one item? An object
  //?   Based on the data structure, how do you access the data you need to put on the DOM? Dot notation to access all properties except the key
  //?   What HTML tags should be used? See below
  // <section>
  //   <h3>Flavor: </h3>
  //   <p>Filling:</p>
  //   <p>Shape:</p>
  //   <p>Topping:</p>
  //   <p>Price:</p>
  // </section>
  //?   Where within the HTML do we put the data? See below
  //?   What data type is used to represent the HTML within JS? String
  // `<section>
  //   <h3>Flavor: ${donut.flavor}</h3>
  //   <p>Filling: ${donut.filling}</p>
  //   <p>Shape: ${donut.shape}</p>
  //   <p>Topping: ${donut.topping}</p>
  //   <p>Price: ${donut.price}</p>
  // </section>`
  //?   Is there any related data that needs to be considered? No

  const htmlForOneDonut = `<section class="donut">
    <h3>Flavor: ${donut.flavor}</h3>
    <p>Filling: ${donut.filling}</p>
    <p>Shape: ${donut.shape}</p>
    <p>Topping: ${donut.topping}</p>
    <p>Price: ${donut.price}</p>
    </section>`
  // debugger
  return htmlForOneDonut
}
