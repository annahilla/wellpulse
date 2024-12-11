export interface Habit {
    name: string;
    category: 'Sports' | 'Nutrition' | 'Mental health' | 'Sleep' | 'Learning' | 'Work' | 'Finances' | 'Music' | 'Art' | 'Sustainability' | 'Personal growth';
    frequency: 'Daily' | 'Weekly' | 'Monthly'; 
    timeOfDay: string; 
    duration: number;
    date: string;
}