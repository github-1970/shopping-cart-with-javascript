import productsData from './productsData.json'
import Storage from './Storage'
import UI from './UI'

export default class Products {
  // get products
  constructor() {
    this.productsData = productsData
    this.productItemsBtn = document.querySelectorAll('.products-item .btn')
  }

  getProducts() {
    return this.productsData
  }

  addToCart() {
    this.productItemsBtn.forEach(productItemBtn => {
      productItemBtn.addEventListener('click', () => {
        productItemBtn.innerText = 'در سبد خرید موجود است!'
        productItemBtn.disabled = true

        let productItemId = productItemBtn.closest('.products-item').dataset.id
        let productItemData = this.productsData.find(item => {
          return item.id === +productItemId
        })
        if (!productItemData) {
          return false
        }

        let cartsData = Storage.getCartsData()
        cartsData.push(productItemData)
        Storage.setDataInCarts(cartsData)

        // another tasks
        // update count in cart badge
        new UI().updateCartBadge()
      })
    })


  }
}