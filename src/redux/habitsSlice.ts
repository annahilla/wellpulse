import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Habit } from '../types/types';

interface HabitsState {
    habits: Habit[];
    error: string | null;
}

const initialState: HabitsState = {
    habits: [],
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
        removeHabit(state, action: PayloadAction<string>) {
            state.habits = state.habits.filter(habit => habit._id !== action.payload);
        },
        updateHabit(state, action: PayloadAction<Habit>) {
            const index = state.habits.findIndex(habit => habit._id === action.payload._id);
            if (index !== -1) {
                state.habits[index] = action.payload;
            }
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export const { setHabits, addHabit, removeHabit, updateHabit, setError } = habitsSlice.actions;

export default habitsSlice.reducer;
