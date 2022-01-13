export default class Storage {
  // get cart data
  static getCartsData() {
    let carts = localStorage.getItem("carts") || JSON.stringify([]);
    return JSON.parse(carts);
  }

  // set data in carts
  static setDataInCarts(data) {
    try {
      localStorage.setItem("carts", JSON.stringify(data));
      return true;
    } catch {
      return false;
    }
  }
}
