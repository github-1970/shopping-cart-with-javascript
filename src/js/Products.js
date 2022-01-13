import Cart from "./Cart";
import productsData from "./productsData.json";
import Storage from "./Storage";

export default class Products {
  constructor() {
    this.productsData = productsData;
  }

  // get all products
  getProducts() {
    return this.productsData;
  }

  // add product in carts list
  addToCart() {
    const productItemsBtn = document.querySelectorAll(".products-item .btn");

    productItemsBtn.forEach((productItemBtn) => {
      productItemBtn.addEventListener("click", () => {
        productItemBtn.innerText = "در سبد خرید موجود است!";
        productItemBtn.disabled = true;

        let productItemId = productItemBtn.closest(".products-item").dataset.id;
        let productItemData = this.productsData.find((item) => {
          return item.id === +productItemId;
        });
        if (!productItemData) {
          return false;
        }

        let cartsData = Storage.getCartsData();
        cartsData.push({ ...productItemData, count: 1 });
        Storage.setDataInCarts(cartsData);

        // another tasks
        // update count in cart badge
        Cart.updateCartBadge();
      });
    });
  }
}
