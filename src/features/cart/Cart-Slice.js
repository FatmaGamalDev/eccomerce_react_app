import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../api/supabaseClient";
// first manage the cart actions (fetch ,add, delete, update) in supabase
//fetch the cart items with products details from supabase
export const fetchCartFromSupabase = createAsyncThunk(
  "cartSlice/fetchCart",
  async (userId) => {
    const { data, error } = await supabase
      .from("cart")
      .select( ` *, products ( id, title, thumbnail, price,brand,stock ) `)
      .eq("user_id", userId);
    if (error) {
      throw new Error(error.message);
    }
    //  merging the cart data with product details into a flat structure
    const cartItems = data.map((cartItem) => ({
      ...cartItem.products,
      quantity: cartItem.quantity,
      subtotal: cartItem.subtotal,
    }));
    return cartItems;
  }
);
//add product to cart table
export const addToCartInSupabase = createAsyncThunk(
  "cartSlice/addToCartInSupabase ",
  async ({ product, userId }) => {
    const { data, error } = await supabase
      .from("cart")
      .upsert(
        [
          {
            user_id: userId,
            product_id: product.id,
            quantity: product.quantity,
            subtotal: product.price * product.quantity,
          },
        ],
        //make  update in case of repeated item
        {
          onConflict: ["user_id", "product_id"],
        }
      )
      .select("*");
    if (error) throw new Error(error.message);
    return {
      ...data[0],
      products: product,
    };
  }
);
//delete item from cart taple
export const deleteFromCartInSupabase = createAsyncThunk(
  "cartSlice/deleteFromCartInSupabase",
  async ({ id, userId }) => {
    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", id);
    if (error) throw new Error(error.message);
    return id;
  }
);
//update item from cart taple
export const updateQuantityInSupabase = createAsyncThunk(
  "cartSlice/updateQuantityInSupabase",
  async ({ userId, productId, quantity, price }) => {
    const { error } = await supabase
      .from("cart")
      .update({ quantity, subtotal: quantity * price })
      .eq("user_id", userId)
      .eq("product_id", productId);
    if (error) throw error;

    return { productId, quantity, price };
  }
);

const getInitialState = () => {
  const cart = localStorage.getItem("cart");
  return {
    cart: cart ? JSON.parse(cart) : [],
    cartTotal: cart
      ? JSON.parse(cart).reduce(
          (total, cartItem) => total + (cartItem.subtotal || 0),
          0
        )
      : 0,
  };
};
const cartSlice = createSlice({
  name: "cartSlice",
  initialState: getInitialState(),
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
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
      state.cartTotal = state.cart.reduce(
        (total, item) => total + item.subtotal,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.id
      );
      state.cartTotal = state.cart.reduce(
        (total, item) => total + (item.subtotal || 0),
        0
      );
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
      state.cartTotal = state.cart.reduce(
        (total, item) => total + item.subtotal,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      state.cartTotal = 0;
      localStorage.removeItem("cart");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartFromSupabase.pending, (state) => {
        state.loadind = true;
      })
      .addCase(fetchCartFromSupabase.fulfilled, (state, action) => {
        state.loadind = false;
        state.cart = action.payload;
      })
      .addCase(fetchCartFromSupabase.rejected, (state, action) => {
        state.loadind = false;
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
        // localStorage.setItem("cart", JSON.stringify(state.cart));
      })
      //--------------------delete from cart state-------------------------
      .addCase(deleteFromCartInSupabase.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
        state.cartTotal = state.cart.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        );
      })
      // ----------------update product quantity in redux state------------------
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

export const { addToCart, deleteFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
