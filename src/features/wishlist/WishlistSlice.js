import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWishlistFromSupabase,
  addToWishlistInSupabase,
  deleteFromWishlistInSupabase,
} from "./WishlistThunks";

const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState: {
    wishlist: [],
    wishlistTotal: 0,
    wasGuest: false,
    loading: false,
    error: null,
  },
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.wishlist.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.wishlist.push({
          ...action.payload,
        });
        state.wasGuest = true;
      }
      // localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    deleteFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (product) => product.id !== action.payload.id
      );
      state.wishlistTotal = state.wishlist.reduce(
        (total, item) => total + (item.subtotal || 0),
        0
      );
      // localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    clearWishlist: (state) => {
      state.wishlist = [];
      state.wishlistTotal = 0;
    },
    setWasGuest: (state, action) => {
      state.wasGuest = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistFromSupabase.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlistFromSupabase.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlistFromSupabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //-------------------add to Wishlist-----------------------------
      .addCase(addToWishlistInSupabase.fulfilled, (state, action) => {
        const newItem = {
          ...action.payload.products,
          quantity: action.payload.quantity,
          subtotal: action.payload.subtotal,
        };
        const exists = state.wishlist.find((item) => item.id === newItem.id);
        if (exists) {
          exists.quantity = newItem.quantity;
          exists.subtotal = newItem.subtotal;
        } else {
          state.wishlist.push(newItem);
        }
        state.wishlistTotal = state.wishlist.reduce(
          (total, item) => total + item.subtotal,
          0
        );
      })
      //--------------------delete from Wishlist -------------------------
      .addCase(deleteFromWishlistInSupabase.fulfilled, (state, action) => {
        state.wishlist = state.wishlist.filter(
          (item) => item.id !== action.payload
        );
        state.wishlistTotal = state.wishlist.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        );
      });
  },
});

export const {
  addToWishlist,
  deleteFromWishlist,
  updateQuantity,
  clearWishlist,
  setWasGuest,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
