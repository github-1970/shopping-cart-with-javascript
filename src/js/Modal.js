import UI from "./UI";
import Products from "./Products";

export default class Modal {
  constructor() {
    this.modalContainer = document.querySelector(".modal-container");
    this.modal = document.querySelector(".modal");
    this.modalBtn = document.querySelector(".modal-btn");
    this.closeBtn = document.querySelector(".close-modal");
    this.successBtn = document.querySelector(".btn-success");

    // for not show everything in start load (not very necessary)
    this.modalContainer.style.display = "flex";

    this.successBtn.addEventListener("click", () => {
      this.closeModal();
    });

    window.addEventListener("click", (e) => {
      if (e.target == this.modalContainer) {
        this.closeModal();
      }
    });

    this.modalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.openModal();
    });

    this.closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.closeModal();
    });
  }

  closeModal() {
    this.modalContainer.style.zIndex = "-1";
    this.modalContainer.style.opacity = "0";

    this.modal.style.opacity = "0";
    this.modal.style.transform = "translateY(-100%)";

    // update ui products when modal is close
    new UI().displayProducts().then(() => {
      // start add to carts event
      new Products().addToCart();
    });
  }

  openModal() {
    this.modalContainer.style.zIndex = "1";
    this.modalContainer.style.opacity = "1";

    this.modal.style.opacity = "1";
    this.modal.style.transform = "translateY(0)";
  }
}
