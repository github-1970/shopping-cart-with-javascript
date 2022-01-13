import '@fortawesome/fontawesome-free/js/all'
import '../scss/main.scss'
import Modal from './Modal'

const modals = new Modal()






console.log(modals.closeBtn)

const modalContainer = document.querySelector('.modal-container')
const modal = document.querySelector('.modal')
const modalBtn = document.querySelector('.modal-btn')
const closeBtn = document.querySelector('.close-modal')
const successBtn = document.querySelector('.btn-success')

modalBtn.addEventListener('click', (e) => {
  e.preventDefault()

  modalContainer.style.zIndex = '1'
  modalContainer.style.opacity = '1'

  modal.style.opacity = '1'
  modal.style.transform = 'translateY(0)'
})

closeBtn.addEventListener('click', (e) => {
  e.preventDefault()

  closeModal()
})

successBtn.addEventListener('click', () => {
  closeModal()
})

window.addEventListener('click', (e) => {
  if (e.target == modalContainer) {
    closeModal()
  }
})

function closeModal(){
  modalContainer.style.zIndex = '-1'
  modalContainer.style.opacity = '0'

  modal.style.opacity = '0'
  modal.style.transform = 'translateY(-100%)'
}