import { useState, useEffect } from 'react';
import { DietType, Meal, MealType, UserProfile } from '../types';
import { meals } from '../data/meals';

// Default user profile
const defaultProfile: UserProfile = {
  favorites: [],
  dietPreferences: [],
  calorieGoal: 1800,
  weeklyPlan: {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  }
};

export const useMeals = () => {
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>(meals);
  const [currentMeal, setCurrentMeal] = useState<Meal | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [filterOptions, setFilterOptions] = useState<{
    dietTypes: DietType[];
    mealType: MealType | null;
    calorieRange: [number, number];
  }>({
    dietTypes: [],
    mealType: null,
    calorieRange: [0, 500]
  });

  // Load user profile from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Save user profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Apply filters
  useEffect(() => {
    let result = meals;

    // Filter by diet types
    if (filterOptions.dietTypes.length > 0) {
      result = result.filter(meal => 
        filterOptions.dietTypes.every(dietType => 
          meal.dietType.includes(dietType)
        )
      );
    }

    // Filter by meal type
    if (filterOptions.mealType) {
      result = result.filter(meal => meal.mealType === filterOptions.mealType);
    }

    // Filter by calorie range
    result = result.filter(
      meal => 
        meal.calories >= filterOptions.calorieRange[0] && 
        meal.calories <= filterOptions.calorieRange[1]
    );

    setFilteredMeals(result);
  }, [filterOptions]);

  // Generate a random meal from filtered meals
  const generateRandomMeal = () => {
    setIsRevealed(false);
    if (filteredMeals.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredMeals.length);
      setCurrentMeal(filteredMeals[randomIndex]);
      
      // Use setTimeout to create reveal animation effect
      setTimeout(() => {
        setIsRevealed(true);
      }, 500);
    } else {
      setCurrentMeal(null);
    }
  };

  // Toggle favorite status for a meal
  const toggleFavorite = (mealId: string) => {
    setUserProfile(prev => {
      const isFavorite = prev.favorites.includes(mealId);
      
      return {
        ...prev,
        favorites: isFavorite
          ? prev.favorites.filter(id => id !== mealId)
          : [...prev.favorites, mealId]
      };
    });
  };

  // Add meal to weekly plan
  const addToWeeklyPlan = (mealId: string, day: keyof UserProfile['weeklyPlan']) => {
    setUserProfile(prev => ({
      ...prev,
      weeklyPlan: {
        ...prev.weeklyPlan,
        [day]: [...prev.weeklyPlan[day], mealId]
      }
    }));
  };

  // Remove meal from weekly plan
  const removeFromWeeklyPlan = (mealId: string, day: keyof UserProfile['weeklyPlan']) => {
    setUserProfile(prev => ({
      ...prev,
      weeklyPlan: {
        ...prev.weeklyPlan,
        [day]: prev.weeklyPlan[day].filter(id => id !== mealId)
      }
    }));
  };

  // Update diet preferences
  const updateDietPreferences = (preferences: DietType[]) => {
    setUserProfile(prev => ({
      ...prev,
      dietPreferences: preferences
    }));
    setFilterOptions(prev => ({
      ...prev,
      dietTypes: preferences
    }));
  };

  // Update calorie goal
  const updateCalorieGoal = (goal: number) => {
    setUserProfile(prev => ({
      ...prev,
      calorieGoal: goal
    }));
  };

  return {
    meals: filteredMeals,
    currentMeal,
    isRevealed,
    userProfile,
    filterOptions,
    setFilterOptions,
    generateRandomMeal,
    toggleFavorite,
    addToWeeklyPlan,
    removeFromWeeklyPlan,
    updateDietPreferences,
    updateCalorieGoal
  };
};