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
    const res = await fetch(
      `https://dummyjson.com/products/category/${categoryName}`
    );
    const data = await res.json();
    return data;
  }
);

//fetch all the product from the api
// export const fetchProductsByNameOrBrand = createAsyncThunk(
//   "products/fetchProductsByNameOrBrand",
//   async (searchQuery) => {
//     if (!searchQuery.trim()) {
//       return []; 
//     }
//     const res = await fetch("https://dummyjson.com/products");
//     const data = await res.json();
//     const searchResult = data.products.filter((product) => (
//       product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
//     ));
//     return searchResult ;

//   }
// );

export const fetchProductsByNameOrBrand = createAsyncThunk(
  "products/fetchProductsByNameOrBrand",
  async (searchQuery, { getState }) => {
    if (!searchQuery.trim()) {
      return []; 
    }
    const state= getState();
    let products = state.products.products
    const searchResult = products.filter((product) => (
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    return searchResult ;

  }
);
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    categories: [],
    searchResult: [],
    loading: false,
    error: null,
  },
  reducers: {
    searchProducts:(state,action)=>{
      const searchQuery = action.payload.toLowerCase();
        if (!searchQuery.trim()) {
          return []; 
        }
 state.searchResult= state.products.filter((product) => (
  product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
));
    }
  },
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
        state.loading = false;
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
        state.loading = false;
        state.error = action.error.message;
      })
      //category products reducers
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload.products ;
        state.loading = false;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
       //search result products reducers
      //  .addCase(fetchProductsByNameOrBrand.fulfilled, (state, action) => {
      //   state.searchResult= action.payload || [];
      //   state.loading = false;
      // })
      // .addCase(fetchProductsByNameOrBrand.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchProductsByNameOrBrand.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      // })
  },
});
export const { searchProducts } = productsSlice.actions;

export default productsSlice.reducer;
