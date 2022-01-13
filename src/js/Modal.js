export default class Modal {
  constructor() {
    this.modalContainer = document.querySelector('.modal-container')
    this.modal = document.querySelector('.modal')
    this.modalBtn = document.querySelector('.modal-btn')
    this.closeBtn = document.querySelector('.close-modal')
    this.successBtn = document.querySelector('.btn-success')

    this.successBtn.addEventListener('click', () => {
      this.closeModal()
    })

    window.addEventListener('click', (e) => {
      if (e.target == this.modalContainer) {
        this.closeModal()
      }
    })
  }

  closeModal(){
    this.modalContainer.style.zIndex = '-1'
    this.modalContainer.style.opacity = '0'
  
    this.modal.style.opacity = '0'
    this.modal.style.transform = 'translateY(-100%)'
  }
  
  openModal(){
    this.modalContainer.style.zIndex = '1'
    this.modalContainer.style.opacity = '1'
  
    this.modal.style.opacity = '1'
    this.modal.style.transform = 'translateY(0)'
  }
}