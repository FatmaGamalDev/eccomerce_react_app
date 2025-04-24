import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../api/supabaseClient";

//fetch all products from the data base
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true })
      .limit(194)
      .neq("category", "mens-shirts")
      .neq("category", "mens-shoes")
      .neq("category", "smartphones")
      .neq("category", "groceries")
      .neq("category", "vehicle")
      .neq("category", "motorcycle")
      .neq("category", "mens-watches")
      .neq("category", "sports-accessories");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    activeCategory: null,
    searchQuery: "",
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
      state.searchQuery = action.payload;
      state.searchResult = state.products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
    getProductDetails: (state, action) => {
      const productId = action.payload;
      state.selectedProduct = state.products.find((product) => product.id === productId);
    }
,    
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});
export const { searchProducts, setActiveCategory, getProductDetails} = productsSlice.actions;
export default productsSlice.reducer;
