export interface Event {
    id: string | undefined;
    title: string;
    startTime: string;
    endTime: string;
    startRecur: string;
    endRecur: string;
    daysOfWeek: number[];
}

export interface Habit {
    _id?: string;
    name: string;
    category: 'Sports' | 'Nutrition' | 'Mental health' | 'Sleep' | 'Learning' | 'Work' | 'Finances' | 'Music' | 'Art' | 'Sustainability' | 'Personal growth';
    frequency: 'Daily' | 'Weekly'; 
    timeOfDay: string; 
    duration: number;
    date: string;
}