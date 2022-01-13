import Cart from "./Cart";
import Products from "./Products";
import Storage from "./Storage";

export default class UI {
  constructor() {
    this.productsContainer = document.querySelector(".products-container");
    this.products = new Products().getProducts();
  }

  // display dynamic products
  // set async just for return promise
  async displayProducts() {
    this.productsContainer.innerHTML = "";

    this.products.forEach((product) => {
      let elem = document.createElement("div");
      elem.classList.add("products-item");
      elem.dataset.id = product.id;

      // check elements is into carts list
      let cartsData = Storage.getCartsData();
      let checkBtnDisabled = cartsData.some((cartData) => {
        return cartData.id == product.id;
      });
      let disabled = "";
      let btnText = "اضافه به سبد خرید";
      if (checkBtnDisabled) {
        disabled = "disabled";
        btnText = "در سبد خرید موجود است!";
      }

      elem.innerHTML = `
        <img src="${product.imgURL}"
          alt="product ${product.id}"
          width="100">

        <div class="products-content">
          <div class="products-detail">
            <span class="products-title">${product.title}</span>
            <span class="products-price">
              <span class="products-price-number">${product.price}</span>
              <span>هزار تومان</span>
            </span>
          </div>

          <button class="btn" ${disabled}>${btnText}</button>
        </div>
      `;

      this.productsContainer.appendChild(elem);

      return true;
    });

    // another tasks
    // set count in cart badge, in start app
    Cart.updateCartBadge();
  }
}
