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
      .limit(40)
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
// fetch products count
export const fetchProductCount = createAsyncThunk(
  "products/fetchProductCount",
  async () => {
    const { count, error } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .neq("category", "mens-shirts")
      .neq("category", "mens-shoes")
      .neq("category", "groceries")
      .neq("category", "vehicle")
      .neq("category", "motorcycle")
      .neq("category", "mens-watches")
      .neq("category", "sports-accessories");

    if (error) {
      throw new Error(error.message);
    }

    return count;
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
    // all products
    products: [],
    productsCount: 0,
    //specific category products
    categoryProducts: [],
    //flag to identify what will be showed in the productlist component ?all products or categoy products
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
      //category products cases
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.categoryProducts = action.payload;
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
      // fetch products count  cases
      .addCase(fetchProductCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductCount.fulfilled, (state, action) => {
        state.loading = false;
        state.productCount = action.payload;
      })
      .addCase(fetchProductCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { searchProducts, setActiveCategory } = productsSlice.actions;
export default productsSlice.reducer;
