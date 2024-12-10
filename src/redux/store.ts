import { configureStore } from '@reduxjs/toolkit';
import userReducer from './authSlice';
import habitsReducer from './habitsSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    habits: habitsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
