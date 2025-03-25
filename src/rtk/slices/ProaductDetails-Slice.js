import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//fetch productDetails from the api
//create thunk action called fetchProductDetails and the action payload is the api response
export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (productID) => {
    const res = await fetch(`https://dummyjson.com/products/${productID}`);
    const data = await res.json();
    return data;
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
      state.error=null
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
