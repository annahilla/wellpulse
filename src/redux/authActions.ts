import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { setUser, setError, logout } from "./userSlice";

interface User {
  email:string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: User, thunkAPI) => {
    if (!email || email.trim() === "") {
      const errorMessage = "Please enter an email"; 
      thunkAPI.dispatch(setError(errorMessage)); 
      return thunkAPI.rejectWithValue(errorMessage);
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = { email: user.email! };
      thunkAPI.dispatch(setUser(userData));
      return userData;
    } catch (error: any) {
      if(error.code === "auth/invalid-credential") {
        const errorMessage = "Your email or password are incorrect."
        thunkAPI.dispatch(setError(errorMessage));
        return thunkAPI.rejectWithValue(errorMessage);
      } else {
        const errorMessage = "There was an error in the login process, please try again later."
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
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      
      if (user && token) {
        const userData = { email: user.email!, token };
        thunkAPI.dispatch(setUser(userData));
        return userData;
      } else {
        const errorMessage = "No user returned from Google login.";
        thunkAPI.dispatch(setError(errorMessage));
        return thunkAPI.rejectWithValue(errorMessage);
      }
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
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email || "";
      
      thunkAPI.dispatch(setUser({ email: userEmail }));
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