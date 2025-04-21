import React, { createContext, useContext, useState, useEffect } from 'react';
import { DietType, Meal, MealType, UserProfile } from '../types';
import { meals } from '../data/meals';

const MealsContext = createContext<ReturnType<typeof useMealsState> | null>(null);

// 将原来的 useMeals 逻辑移到这里
const useMealsState = () => {
  // ... 从 useMeals.ts 复制所有状态和函数 ...
};

export const MealsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = useMealsState();
  return <MealsContext.Provider value={state}>{children}</MealsContext.Provider>;
};

export const useMeals = () => {
  const context = useContext(MealsContext);
  if (!context) {
    throw new Error('useMeals must be used within a MealsProvider');
  }
  return context;
};