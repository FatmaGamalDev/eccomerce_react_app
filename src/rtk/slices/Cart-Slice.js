import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const cart = localStorage.getItem("cart");
  return {
    cart: cart ? JSON.parse(cart) : [],
    cartTotal: cart ? JSON.parse(cart).reduce((total, cartItem) => total + (cartItem.subtotal||0), 0 ) : 0
  };
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: getInitialState(),
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + action.payload.quantity;
        if (newQuantity <= existingItem.stock) {
          existingItem.quantity += action.payload.quantity;
          existingItem.subtotal +=
            action.payload.quantity * action.payload.price;
        } else {
          existingItem.quantity = existingItem.stock;
          existingItem.subtotal = existingItem.quantity * action.payload.price;
        }
      } else {
        state.cart.push({
          ...action.payload,
          quantity: action.payload.quantity,
          subtotal: action.payload.price,
        });
      }
      state.cartTotal = state.cart.reduce((total, item) => total + item.subtotal , 0);

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    deleteFromCart: (state, action) => {
     state.cart = state.cart.filter(
        (product) => product.id !== action.payload.id
      );
      state.cartTotal = state.cart.reduce((total, item) => total + (item.subtotal||0), 0);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((item) => {
        return item.id === id;
      });
      if (item) {
        item.quantity = quantity;
        item.subtotal = quantity * item.price;
      }

      state.cartTotal = state.cart.reduce((total, item) => total + item.subtotal, 0);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    // clear: (state, action) => {
    //     localStorage.removeItem("cart")
    //   return [];
    // },
  },
});

export const { addToCart, deleteFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
