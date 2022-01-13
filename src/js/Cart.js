import Storage from "./Storage";
import UI from "./UI";
import Products from "./Products";

export default class Cart {
  constructor() {
    this.btnShowCarts = document.querySelector(".modal-btn");
    this.modalContent = document.querySelector(".modal-content");
    this.clearCartBtn = document.querySelector(".btn-clear");

    this.btnShowCarts.addEventListener("click", () => {
      this.showProductsInCart().then(() => {
        // start event for remove product in cart
        this.removeProductInCart();

        // start event for increment and decrement
        this.increment();
        this.decrement();

        // total all products price
        this.computingTotalPrice();
      });
    });

    // start event for clear all products in cart
    this.clearAllProductsInCart();
  }

  static updateCartBadge() {
    let badge = document.querySelector(".badge");
    let cartsData = Storage.getCartsData();
    badge.innerText = cartsData.length;
  }

  // show products in cart modal
  async showProductsInCart() {
    let cartsData = Storage.getCartsData();

    // check cart is not empty
    if (cartsData.length < 1) {
      // set styles (if carts is empty)
      // set clear style for btn clear
      document.querySelector(".btn-clear").classList.add("disabled");
      // not display cart price
      document.querySelector(".cart-total-price").style.display = "none";
      // end set styles (if carts is empty)

      let elem = document.createElement("h4");
      elem.style.textAlign = "center";
      elem.style.padding = "1rem 0 2rem";

      this.modalContent.innerHTML = "";
      elem.innerHTML = "سبد خرید شما خالی است! لطفا محصولی را انتخاب نمایید.";
      return this.modalContent.appendChild(elem);
    }

    // set styles (if carts not empty)
    // set clear style for btn clear
    document.querySelector(".btn-clear").classList.remove("disabled");
    // display cart price
    document.querySelector(".cart-total-price").style.display = "block";
    // end set styles (if carts not empty)

    this.modalContent.innerHTML = "";

    cartsData.forEach((product) => {
      let elem = document.createElement("div");
      elem.classList.add("cart-item");
      elem.dataset.id = product.id;

      elem.innerHTML = `
        <img src="${product.imgURL}" alt="product ${product.id}" width="100">

        <div class="cart-item-detial">
          <h4 class="cart-item-title">${product.title}</h4>
          <div class="cart-item-price">
            <span class="cart-item-price-number">${product.price}</span>
            <span>هزار تومان</span>
          </div>
        </div>

        <div class="cart-item-actions">
          <div class="cart-item-counter">
            <span class="cart-item-counter-up">
              <i class="fas fa-angle-up fa-lg"></i>
            </span>
            <span class="cart-item-counter-number">${product.count}</span>
            <span class="cart-item-counter-down">
              <i class="fas fa-angle-down fa-lg"></i>
            </span>
          </div>

          <div class="cart-item-remove">
            <i class="fas fa-trash-alt fa-lg"></i>
          </div>
        </div>
      `;

      this.modalContent.insertBefore(elem, this.modalContent.firstChild);
    });

    return true;
  }

  // clear all products in cart
  clearAllProductsInCart() {
    this.clearCartBtn.addEventListener("click", function () {
      // check carts is empty
      if (Storage.getCartsData().length < 1) {
        return false;
      }

      Storage.setDataInCarts([]);

      // update elements
      Cart.updateCartBadge();
      new Cart().showProductsInCart();
      new UI().displayProducts().then(() => {
        // start add to carts event
        new Products().addToCart();
      });
      // total all products price
      new Cart().computingTotalPrice();
    });
  }

  // remove product in cart
  removeProductInCart() {
    let removeProductsInCartBtn =
      document.querySelectorAll(".cart-item-remove");

    removeProductsInCartBtn.forEach((removeProduct) => {
      removeProduct.addEventListener("click", function () {
        let cartItem = removeProduct.closest(".cart-item");

        new Cart().removeProductWithId(+cartItem.dataset.id);
        // total all products price
        new Cart().computingTotalPrice();
      });
    });
  }

  // increment a product
  increment() {
    let allIncrementBtn = document.querySelectorAll(".cart-item-counter-up");
    allIncrementBtn.forEach((incrementBtn) => {
      let incrementBtnParent = incrementBtn.closest(".cart-item");
      let incrementNumber = incrementBtnParent.querySelector(
        ".cart-item-counter-number"
      );

      let id = +incrementBtnParent.dataset.id;

      incrementBtn.addEventListener("click", function () {
        incrementNumber.innerText = ++incrementNumber.innerText;

        new Cart().computingProductCount(id, "+");
      });
    });
  }

  // decrement a product
  decrement() {
    let allDecrementBtn = document.querySelectorAll(".cart-item-counter-down");
    allDecrementBtn.forEach((decrementBtn) => {
      let decrementBtnParent = decrementBtn.closest(".cart-item");
      let decrementNumber = decrementBtnParent.querySelector(
        ".cart-item-counter-number"
      );

      let id = +decrementBtnParent.dataset.id;

      decrementBtn.addEventListener("click", function () {
        if (+decrementNumber.innerText <= 1) {
          return new Cart().removeProductWithId(id);
        }

        decrementNumber.innerText = --decrementNumber.innerText;

        new Cart().computingProductCount(id, "-");
      });
    });
  }

  computingTotalPrice() {
    let cartsData = Storage.getCartsData();

    let totalPriceNumber = 0;
    cartsData.forEach((cartData) => {
      totalPriceNumber += cartData.price * cartData.count;
    });

    let totalPrice = totalPriceNumber;
    let totalPriceString = totalPriceNumber.toString();
    let threeEndNumber = totalPriceString.split("").splice(-3, 3).join("");
    let firstSectionNumber = totalPriceString
      .split("")
      .splice(0, totalPriceString.length - 3)
      .join("");

    if (totalPriceString.length > 3) {
      totalPrice = firstSectionNumber + " میلیون " + threeEndNumber;
    }

    document.querySelector(".cart-total-price-number").innerText = totalPrice;
  }

  // utility methods

  // remove product with id
  removeProductWithId(id) {
    let cartsData = Storage.getCartsData();

    let newCartData = cartsData.reduce((acc, curr) => {
      if (id != +curr.id) {
        acc.push(curr);
      }
      return acc;
    }, []);

    Storage.setDataInCarts(newCartData);

    // update elements
    Cart.updateCartBadge();
    new Cart().showProductsInCart();
    new UI().displayProducts().then(() => {
      // start add to carts event
      new Products().addToCart();
    });
    new Cart().showProductsInCart().then(() => {
      // start event for remove product in cart
      new Cart().removeProductInCart();

      new Cart().increment();
      new Cart().decrement();
    });
  }

  computingProductCount(id, operation) {
    let cartsData = Storage.getCartsData();

    let newCartData = cartsData.reduce((acc, curr) => {
      if (id == +curr.id) {
        operation == "-" ? --curr.count : ++curr.count;
      }
      acc.push(curr);
      return acc;
    }, []);

    Storage.setDataInCarts(newCartData);

    this.computingTotalPrice();
  }
}
