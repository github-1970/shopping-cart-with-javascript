import Products from './Products'
import Storage from './Storage'

export default class UI {
  // display dynamic products
  constructor() {
    this.productsContainer = document.querySelector('.products-container')
    this.products = new Products().getProducts()
  }

  async displayProducts() {
    this.products.forEach(product => {
      let elem = document.createElement('div')

      // check element in to carts list
      let cartsData = Storage.getCartsData()
      let checkBtnDisabled = cartsData.some(cartData => {
        return cartData.id == product.id
      })
      let disabled = ''
      if(checkBtnDisabled){
        disabled = 'disabled'
      }

      elem.innerHTML = `
      <div class="products-item" data-id="${product.id}">
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

        <button class="btn" ${disabled}>اضافه به سبد خرید</button>
      </div>
    </div>
      `

      this.productsContainer.appendChild(elem)

      // another tasks
      new UI().updateCartBadge()
    })
  }

  updateCartBadge(){
    let badge = document.querySelector('.badge')
    let cartsData = Storage.getCartsData()
    badge.innerText = cartsData.length
  }

}