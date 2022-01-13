import '@fortawesome/fontawesome-free/js/all'
import '../scss/main.scss'
import Modal from './Modal'
import productsData from './productsData.json'

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