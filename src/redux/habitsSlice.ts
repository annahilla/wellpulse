import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Habit } from '../types/types';

interface HabitsState {
    habits: Habit[];
    loading: boolean;
    error: string | null;
}

const initialState: HabitsState = {
    habits: [],
    loading: false,
    error: null,
};

const habitsSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        setHabits(state, action: PayloadAction<Habit[]>) {
            state.habits = action.payload;
        },
        addHabit(state, action: PayloadAction<Habit>) {
            state.habits = [...state.habits, action.payload];
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export const { setHabits, addHabit, setError } = habitsSlice.actions;

export default habitsSlice.reducer;
