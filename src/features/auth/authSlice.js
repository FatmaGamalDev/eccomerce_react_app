import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../api/supabaseClient";
import { resetUserData } from "../user/UserSlice";
import { clearCart } from "../cart/Cart-Slice";
import { clearWishlist } from "../wishlist/WishlistSlice";

//create thunk action called signUp and the action payload is the api response
//data => {user: {…}, session: {…}}
// regest new user
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }, { rejectWithValue , dispatch }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return rejectWithValue(error.message);
    // eslint-disable-next-line no-undef
    dispatch(resetUserData());
    return data;
  }
);
// user signIn
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue , dispatch }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return rejectWithValue(error.message);
    }
    // eslint-disable-next-line no-undef
    dispatch(resetUserData());
    return data;
  }
);
//user signOut
export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue , dispatch }) => {
    const { error } = await supabase.auth.signOut();
    // eslint-disable-next-line no-undef
    dispatch(resetUserData());
    dispatch(clearCart());
    dispatch(clearWishlist());
    if (error) return rejectWithValue(error.message);
    return {};
  }
);

export const getSession = createAsyncThunk("auth/getSession", async () => {
  const { data, error } = await supabase.auth.getSession();
  // console.log("🔥 Supabase getSession result:", data);

  if (error) throw error;
  return data?.session?.user || null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    loginSuccess: false,

  },
  reducers: {
     resetLoginState: (state) => {
      state.loginSuccess = false; 
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // signUp cases
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.loginSuccess = true; 

      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // signIn cases
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.loginSuccess = true; 
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // signOut cases
      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //get session cases
      .addCase(getSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {resetLoginState,setUser} = authSlice.actions;

export default authSlice.reducer;
