import { configureStore } from '@reduxjs/toolkit';
import userReducer from './authSlice';
import habitsReducer from './habitsSlice'
import locationsReducer from './locationsSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    habits: habitsReducer,
    locations: locationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
