import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from "../types/types";

interface LocationState {
    locations: Location[];
    error: string | null;
}

const initialState: LocationState = {
    locations: [],
    error: null,
};

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        setLocations(state, action: PayloadAction<Location[]>) {
            state.locations = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    }
})

export const {setLocations, setError} = locationsSlice.actions;

export default locationsSlice.reducer;