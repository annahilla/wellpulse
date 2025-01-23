import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationInterface } from "../types/types";

interface LocationState {
    locations: LocationInterface[];
    loading: boolean;
    error: string | null;
}

const initialState: LocationState = {
    locations: [],
    loading: false,
    error: null,
};

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        setLocations(state, action: PayloadAction<LocationInterface[]>) {
            state.locations = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>){
            state.loading = action.payload;
        }
    }
})

export const {setLocations, setError, setLoading} = locationsSlice.actions;

export default locationsSlice.reducer;