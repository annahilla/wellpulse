import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import  {auth}  from "../firebaseConfig";
import { setUser, setError, logout } from "./authSlice";
import { RootState } from "./store";
import { sendTokenToBackend } from "../utils/sendTokenToBackend";

interface User {
  email:string;
  password: string;
}

export const checkAuthState = createAsyncThunk(
  "auth/checkAuthState",
  async (_, thunkAPI) => {
    return new Promise<{ email: string; token: string } | null>((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const token = await user.getIdToken();
          const userData = { email: user.email!, token };
          thunkAPI.dispatch(setUser(userData));
          resolve(userData);
        } else {
          thunkAPI.dispatch(logout());
          resolve(null);
        }
      });
    });
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: User, thunkAPI) => {
    if (!email || email.trim() === "") {
      const errorMessage = "Please enter your email"; 
      thunkAPI.dispatch(setError(errorMessage)); 
      return thunkAPI.rejectWithValue(errorMessage);
    }

    if (!password || password.trim() === "") {
      const errorMessage = "Please enter your password"; 
      thunkAPI.dispatch(setError(errorMessage)); 
      return thunkAPI.rejectWithValue(errorMessage);
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      const userData = { email: user.email!, token };
      thunkAPI.dispatch(setUser(userData));
      return userData;
    } catch (error: any) {
      if(error.code === "auth/invalid-credential") {
        const errorMessage = "Your email or password are incorrect."
        thunkAPI.dispatch(setError(errorMessage));
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        const errorMessage = "Your email or password are incorrect."
        thunkAPI.dispatch(setError(errorMessage));
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  }
);

export const loginUserWithGoogle = createAsyncThunk(
  "auth/loginUserWithGoogle",
  async (_, thunkAPI) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      const userData = { email: user.email!, token };
      thunkAPI.dispatch(setUser(userData));
      return userData;
    } catch (error) {
      const errorMessage = "Error during Google login.";
      thunkAPI.dispatch(setError(errorMessage));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (
    { email, password }: User, thunkAPI
  ) => {
    if (!email || email.trim() === "") {
      const errorMessage = "Please enter an email"; 
      thunkAPI.dispatch(setError(errorMessage)); 
      return thunkAPI.rejectWithValue(errorMessage);
    }

    if (!password || password.trim() === "") {
      const errorMessage = "Please enter a password"; 
      thunkAPI.dispatch(setError(errorMessage)); 
      return thunkAPI.rejectWithValue(errorMessage);
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      const userData = { email: user.email!, token };
      
      thunkAPI.dispatch(setUser(userData));
      return userData;
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        const errorMessage = "This email is already in use.";
        thunkAPI.dispatch(setError(errorMessage));
        return thunkAPI.rejectWithValue(errorMessage);
      } else if (error.code === "auth/invalid-email") {
        const errorMessage = "Please enter a valid email.";
        thunkAPI.dispatch(setError(errorMessage));
        return thunkAPI.rejectWithValue(errorMessage); 
      }  else if (error.code === "auth/weak-password") {
        const errorMessage = "Password should be at least 6 characters.";
        thunkAPI.dispatch(setError(errorMessage));
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        const errorMessage = "There was an error in the registration, please try again later.";
        thunkAPI.dispatch(setError(errorMessage));
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      thunkAPI.dispatch(logout());
    } catch (error: any) {
      thunkAPI.dispatch(setError(error.message));
    }
  }
);

export const sendUserToken = createAsyncThunk(
  'auth/sendUserToken',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.user.token;

    if (!token) {
      const errorMessage = 'No token available for authentication.';
      thunkAPI.dispatch(setError(errorMessage));
      return thunkAPI.rejectWithValue(errorMessage);
    }

    try {
      const response = await sendTokenToBackend(token);  
      return response;
    } catch (error) {
      const errorMessage = 'Failed to send token to the backend.';
      thunkAPI.dispatch(setError(errorMessage));
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);