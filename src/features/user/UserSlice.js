import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../api/supabaseClient";
// get user meta data from supabase
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const user = state.auth.user;
    if (
      state.user.userData &&
      state.user.userData.id === user?.id
    ) {
      return state.user.userData;
    }
    if (!user) return rejectWithValue("No authenticated user");
    try {
      //get user profile data from supabase user taple
      const { data, error } = await supabase
        .from("users")
        .select("id, firstName, lastName, email, address, phoneNumber")
        .eq("id", user.id)
        .single();

      if (error) return rejectWithValue(error.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateUserData = createAsyncThunk(
  "user/updateUserData",
  async (userData, { rejectWithValue, getState }) => {
    const { auth } = getState();
    const user = auth.user;
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
  reducers: {
    resetUserData: (state) => {
      state.userData = null;
      state.lastFetched = null;
      state.loading = false;
      state.error = null;
    },
  },
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
export const { resetUserData } = userSlice.actions;
export default userSlice.reducer;
