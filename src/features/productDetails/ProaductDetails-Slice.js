import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../api/supabaseClient";

//fetch productDetails from the api
export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (productID) => {
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("*")
      .eq("id", productID)
      .single();

    if (productError) throw new Error(productError.message);
    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productID);

    if (reviewsError) throw new Error(reviewsError.message);
    return { ...product, reviews };
  }
);

const productDetails = createSlice({
  name: "productDetails",
  initialState: {
    product: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default productDetails.reducer;
