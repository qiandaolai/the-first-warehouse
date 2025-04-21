export interface Meal {
  id: string;
  name: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string[];
  dietType: DietType[];
  mealType: MealType;
  preparationTime: number;
}

export type DietType = 'keto' | 'vegan' | 'vegetarian' | 'paleo' | 'lowCarb' | 'glutenFree' | 'dairyFree';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface UserProfile {
  favorites: string[];
  dietPreferences: DietType[];
  calorieGoal: number;
  weeklyPlan: WeeklyPlan;
}

export interface WeeklyPlan {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  imageUrl?: string;
  likes: number;
  createdAt: string;
  comments?: Comment[];
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
}