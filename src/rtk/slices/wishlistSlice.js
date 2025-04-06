import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const wishlist = localStorage.getItem("wishlist");
  return {
    wishlist: wishlist ? JSON.parse(wishlist) : [],
  };
};
const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState: getInitialState(),
  reducers: {
    addToWishlist: (state, action) => {

      const existingItem = state.wishlist.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.wishlist.push({
          ...action.payload,
        });
      }
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    deleteFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (product) => product.id !== action.payload.id
      );
      state.wishlistTotal = state.wishlist.reduce(
        (total, item) => total + (item.subtotal || 0),
        0
      );
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.wishlist.find((item) => {
        return item.id === id;
      });
      if (item) {
        item.quantity = quantity;
        item.subtotal = quantity * item.price;
      }

      state.wishlistTotal = state.wishlist.reduce(
        (total, item) => total + item.subtotal,
        0
      );
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
  },
});

export const { addToWishlist, deleteFromWishlist, updateQuantity } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
