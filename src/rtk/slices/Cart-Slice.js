import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: getInitialState(),
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteFromCart: (state, action) => {
      const updatedcart = state.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(updatedcart));
      return updatedcart;
    },
    // clear: (state, action) => {
    //     localStorage.removeItem("cart")
    //   return [];
    // },
  },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
