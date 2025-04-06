import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../api/supabaseClient";

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

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
