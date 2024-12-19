export enum Categories {
    Sports = 'Sports',
    Nutrition = 'Nutrition',
    MentalHealth = 'Mental health',
    Learning = 'Learning',
    Art = 'Art'
}

export interface Event {
    id: string | undefined;
    title: string;
    startTime: string;
    endTime: string;
    startRecur: string;
    endRecur: string;
    daysOfWeek: number[];
    extendedProps: {
        category: Categories
    }
}

export interface Habit {
    _id?: string;
    name: string;
    category: Categories
    frequency: 'Daily' | 'Weekly'; 
    timeOfDay: string; 
    duration: number;
    date: string;
    completedDays: string[];
}