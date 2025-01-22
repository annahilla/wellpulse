import { LatLngTuple } from "leaflet";

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
    location?: LocationInterface;
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
    location?: LocationInterface;
    eventDate:string;
    completedDays: string[];
}

export enum LocationCategories {
    Parks = "Parks",
    Cafes = "Cafes",
    Gyms = "Gyms",
    CivicCenters = "Civic Centers",
    HealthyRestaurants = "Healthy Restaurants",
    RelaxZones = "Relax Zones",
    Coworking = "Coworking",
    OutdoorSports = "Outdoor Sports",
    Libraries = "Libraries",
    HikingRoutes = "Hiking Routes",
    CraftWorkshops = "Craft Workshops"
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

  export interface LocationInterface {
    _id: string;
    name: string;
    category: LocationCategory;
    position: LatLngTuple;
    direction: string;
    website:string;
}