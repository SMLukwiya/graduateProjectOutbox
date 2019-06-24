const cart = {
  // Get total number of items in cart
  itemTotal() {
    if (typeof window !==undefined) {
      if (sessionStorage.getItem('cart')) {
        return JSON.parse(sessionStorage.getItem('cart')).length
      }
    }
    return 0;
  },

// Get cart from session storage
  getCart() {
    if (typeof window !== undefined) {
      let currentCart = sessionStorage.getItem('cart')
      if (currentCart !== null) {
        return JSON.parse(currentCart)
      }
    }
    return []
  },

// Remove item from cart
  removeItem(itemIndex) {
    let cart = []
    if (typeof window !== undefined) {
      if (sessionStorage.getItem('cart')) {
        cart = JSON.parse(sessionStorage.getItem('cart'))
      }
      cart.splice(itemIndex, 1)
      sessionStorage.setItem('cart', JSON.stringify(cart))
    }
    return cart
  },

// Empty court
  emptyCart(callback) {
    if (typeof window !== undefined) {
      sessionStorage.removeItem('cart')
      callback()
    }
  }
}

export default cart;
