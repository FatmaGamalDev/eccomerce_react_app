import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient";

//create thunk action called signUp and the action payload is the api response
//data => {user: {…}, session: {…}}
// regest new user
export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return rejectWithValue(error.message);
    console.log("Form Data Submitted:", data);
    return data;
  }
);
// user signIn
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Login Error:", error);
      return rejectWithValue(error.message);
    }
    console.log("Logging in with:", data);
    return data;
  }
);
//user signOut
export const signOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    const { error } = await supabase.auth.signOut();
    if (error) return rejectWithValue(error.message);
    return {};
  }
);

export const getSession = createAsyncThunk("auth/getSession", async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data?.session?.user || null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    loginSuccess: false, // <-- متغير جديد عشان نعرف هل المستخدم سجل الدخول الآن

  },
  reducers: { resetLoginState: (state) => {
      state.loginSuccess = false; // <-- لإعادة تعيين الحالة بعد التنقل
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
        state.loginSuccess = true;  // <-- لازم نحدثها هنا عشان تتفعل useEffect في SignIn.js

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
        state.loginSuccess = true;  // <-- لازم نحدثها هنا عشان تتفعل useEffect في SignIn.js

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
      .addCase(getSession.fulfilled, (state, action) => {
        state.user = action.payload;
      })
  },
});
export const {resetLoginState} = authSlice.actions;

export default authSlice.reducer;
