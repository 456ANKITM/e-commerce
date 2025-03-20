 export const updateCart = (state) => {
  state.itemPrice = state.cartItems
  .reduce(
    (acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);
  state.shippingCharge = Number(state.itemPrice) > 100 ? 0 : 10;
  state.totalPrice = Number(state.itemPrice) + Number(state.shippingCharge);
  localStorage.setItem('cart', JSON.stringify(state))

  return state;
}

