import '@fortawesome/fontawesome-free/js/all'
import '../scss/main.scss'
import Modal from './Modal'
import Products from './Products'
import UI from './UI'

// display products in start app
let ui = new UI()
ui.displayProducts().then(() => {
  let products = new Products()
  // start add to carts event
  products.addToCart()
})








// modal events
const modal = new Modal()

modal.modalBtn.addEventListener('click', (e) => {
  e.preventDefault()
  modal.openModal()
})

modal.closeBtn.addEventListener('click', (e) => {
  e.preventDefault()
  modal.closeModal()
})
// end modal