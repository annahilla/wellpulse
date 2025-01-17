export enum HabitCategories {
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
        category: HabitCategories
    }
}

export interface Habit {
    _id?: string;
    name: string;
    category: HabitCategories
    frequency: 'Daily' | 'Weekly'; 
    timeOfDay: string; 
    duration: number;
    date: string;
    completedDays: string[];
}

export interface HabitDetailsInterface {
    _id?: string;
    name: string;
    category: HabitCategories
    frequency: 'Daily' | 'Weekly'; 
    timeOfDay: string; 
    duration: number;
    date: string;
    eventDate:string;
    completedDays: string[];
}

export type LocationCategory =
  | "parks"
  | "cafes"
  | "gyms"
  | "civicCenters"
  | "healthyRestaurants"
  | "relaxZones"
  | "coworking"
  | "outdoorSports"
  | "libraries"
  | "hikingRoutes"
  | "craftWorkshops";