import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//fetch all the product from the api
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    return data;
  }
);
//fetch  the categories from the api
export const fetchCategories = createAsyncThunk(
  "Categories/fetchCategories",
  async () => {
    const res = await fetch("https://dummyjson.com/products/category-list");
    const data = await res.json();
    return data;
  }
);
//fetch products by category name
export const fetchProductsByCategory = createAsyncThunk(
  "Categories/fetchProductsByCategory",
  async (categoryName) => {
    const res = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
    const data = await res.json();
    return data;
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    categories:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.loading = false;
      })
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading=false
        state.error = action.error.message;
      })
      //categories reducers
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading=false
        state.error = action.error.message;
      })
        //category products reducers
        .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
          state.products = action.payload.products || []; 
          state.loading = false;
        })
        .addCase(fetchProductsByCategory.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProductsByCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
  },
});

export default productsSlice.reducer;
