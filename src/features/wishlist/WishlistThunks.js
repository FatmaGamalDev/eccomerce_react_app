import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../api/supabaseClient";
//fetch the Wishlist items with products details from supabase
export const fetchWishlistFromSupabase = createAsyncThunk(
  "wishlistSlice/fetchWishlist",
  async (userId) => {
    const { data, error } = await supabase
      .from("wishlist")
      // there is a relation between wishlist taple and products taple
      .select(` *, products ( id, title, thumbnail, price,brand,stock ) `)
      .eq("user_id", userId);
    if (error) {
      throw new Error(error.message);
    }
    //  merging the Wishlist data with product details into a flat structure
    const WishlistItems = data.map((wishlistItem) => ({
      ...wishlistItem.products,
      quantity: wishlistItem.quantity,
      subtotal: wishlistItem.subtotal,
    }));
    return WishlistItems;
  }
);
//add product to Wishlist table
export const addToWishlistInSupabase = createAsyncThunk(
  "wishlistSlice/addToWishlistInSupabase ",
  async ({ product, userId }) => {
    const { data, error } = await supabase
      .from("wishlist")
      .upsert(
        [
          {
            user_id: userId,
            product_id: product.id,
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
//delete item from Wishlist taple
export const deleteFromWishlistInSupabase = createAsyncThunk(
  "wishlistSlice/deleteFromWishlistInSupabase",
  async ({ id, userId }) => {
    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", id);
    if (error) throw new Error(error.message);
    return id;
  }
);