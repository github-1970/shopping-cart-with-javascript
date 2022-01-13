import "@fortawesome/fontawesome-free/js/all";
import "../scss/main.scss";
import Cart from "./Cart";
import Modal from "./Modal";
import Products from "./Products";
import UI from "./UI";

// display products in start app
let ui = new UI();
ui.displayProducts().then(() => {
  let products = new Products();
  // start add to carts event
  products.addToCart();
});

// start all event for car
new Cart();

// start all events for modal
new Modal();
