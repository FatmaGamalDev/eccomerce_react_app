import { createSlice } from "@reduxjs/toolkit";
import { RiEyeCloseFill } from "react-icons/ri";

const getInitialState = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: getInitialState(),
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);

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
        state.push({
          ...action.payload,
          quantity: action.payload.quantity,
          subtotal: action.payload.price,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteFromCart: (state, action) => {
      const updatedcart = state.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(updatedcart));
      return updatedcart;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find((item) => {
        return item.id === id;
      });
      if (item) {
        item.quantity = quantity;
        item.subtotal = quantity * item.price;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    // clear: (state, action) => {
    //     localStorage.removeItem("cart")
    //   return [];
    // },
  },
});

export const { addToCart, deleteFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
