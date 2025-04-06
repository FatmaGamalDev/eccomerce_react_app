import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

const API_URL = process.env.REACT_APP_API_URL;
//fetch all products from the data base
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true })
      .limit(100)
      .neq("category", "mens-shoes")
      .neq("category", "mens-shirts")
      .neq("category", "groceries")
      .neq("category", "vehicle")
      .neq("category", "motorcycle")
      .neq("category", "mens-watches")
      .neq("category", "sports-accessories");
      // .not("category", "in", '( "mens-shoes", "mens-shirts","groceries", "vehicle","motorcycle", "mens-watches", "sports-accessories")');
    if (error) {
      throw new Error(error.message);
    }
    return data; 
  }
);
//fetch  the categories from the api
export const fetchCategories = createAsyncThunk(
  "Categories/fetchCategories",
  async () => {
    const { data, error } = await supabase
      .from("products")
      .select("category") 
      .order("id", { ascending: true })
      .neq("category", null); 
    if (error) throw new Error(error.message);
    const uniqueCategories = [...new Set(data.map((item) => item.category))];
    return uniqueCategories;
  }
);

//fetch products by category name
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (categoryName) => {
    let { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", categoryName);
    
    if (error) throw error;
    return data;
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
    searchProducts: (state, action) => {
      const searchQuery = action.payload.toLowerCase();
      if (!searchQuery.trim()) {
        return [];
      }
      state.searchResult = state.products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
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
        state.products = action.payload;
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
export const { searchProducts } = productsSlice.actions;
export default productsSlice.reducer;
