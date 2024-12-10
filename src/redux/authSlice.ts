import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendUserToken } from "./authActions";

interface AuthState {
  email: string;
  isAuthenticated: boolean;
  token?: string;
  error: string | null;
}

const initialState: AuthState = {
  email: "",
  isAuthenticated: false,
  token: undefined,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string ; token: string }>) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.email = "";
      state.isAuthenticated = false;
      state.token = undefined;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendUserToken.fulfilled, (state, action) => {
      console.log('Token sent to backend successfully');
    });
    builder.addCase(sendUserToken.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { setUser, setError, logout } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;