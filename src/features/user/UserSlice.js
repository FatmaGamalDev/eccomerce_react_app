import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../api/supabaseClient";
// get user addetional data from supabase
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const user = auth.user;
    
    if (!user) return rejectWithValue("No authenticated user");

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) return rejectWithValue(error.message);
    return data;
  }
);

export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (userData, { rejectWithValue, getState }) => {
    const { auth } = getState();
    const user = auth.user;
    // console.log(user)
    if (!user) return rejectWithValue("No authenticated user");

    const { data, error } = await supabase
      .from("users")
      .upsert([{ id: user.id, ...userData }])
      .select()
      .single();

    if (error) return rejectWithValue(error.message);
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getUserData cases
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload; 
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateUserData cases
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        console.log(state.userData);
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
