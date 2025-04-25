import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCartFromSupabase,
  addToCartInSupabase,
  deleteFromCartInSupabase,
  updateQuantityInSupabase,
} from "./CartThunks";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState:{
    cart:[],
    cartTotal:0,
    wasGuest: false,
    loading:false,
    error:null
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      //add the new quantity to the old quantity of the product if the product exist in the cart
      //update the suptotal of the product 
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
        })
        state.cartTotal = state.cart.reduce(
          (total, item) => total + item.subtotal,
          0
        );
      }
      state.wasGuest = true;

         },
    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.id
      );
      state.cartTotal = state.cart.reduce(
        (total, item) => total + (item.subtotal || 0),
        0
      );
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
      state.cartTotal = state.cart.reduce(
        (total, item) => total + item.subtotal,
        0
      );
    },
    clearCart: (state) => {
      state.cart = [];
      state.cartTotal = 0;
    },
    setWasGuest: (state, action) => {
      state.wasGuest = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartFromSupabase.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartFromSupabase.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCartFromSupabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //-------------------add to cart-----------------------------
      .addCase(addToCartInSupabase.fulfilled, (state, action) => {
        const newItem = {
          ...action.payload.products,
          quantity: action.payload.quantity,
          subtotal: action.payload.subtotal,
        };
        const exists = state.cart.find((item) => item.id === newItem.id);
        if (exists) {
          exists.quantity = newItem.quantity;
          exists.subtotal = newItem.subtotal;
        } else {
          state.cart.push(newItem);
        }
        state.cartTotal = state.cart.reduce(
          (total, item) => total + item.subtotal,
          0
        );
      })
      //--------------------delete from cart -------------------------
      .addCase(deleteFromCartInSupabase.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
        state.cartTotal = state.cart.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        );
      })
      // ----------------update product quantity ------------------
      .addCase(updateQuantityInSupabase.fulfilled, (state, action) => {
        const { productId, quantity, price } = action.payload;
        const item = state.cart.find((item) => item.id === productId);
        if (item) {
          item.quantity = quantity;
          item.subtotal = quantity * price;
          console.log(item);
        }
        state.cartTotal = state.cart.reduce(
          (total, item) => total + (item.subtotal || 0),
          0
        );
      });
  },
});

export const { addToCart, deleteFromCart, updateQuantity, clearCart, setWasGuest } =
  cartSlice.actions;
export default cartSlice.reducer;
