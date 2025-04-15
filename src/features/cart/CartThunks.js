import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../api/supabaseClient";
// first manage the cart actions (fetch ,add, delete, update) in supabase
//fetch the cart items with products details from supabase
export const fetchCartFromSupabase = createAsyncThunk(
  "cartSlice/fetchCart",
  async (userId) => {
    const { data, error } = await supabase
      .from("cart")
      // there is a relation between cart taple and products taple
      .select(` *, products ( id, title, thumbnail, price,brand,stock ) `)
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
