import React, { useState } from 'react';
import { Sliders, Check, X } from 'lucide-react';
import { DietType, MealType } from '../types';

interface FilterOptionsProps {
  dietTypes: DietType[];
  mealType: MealType | null;
  calorieRange: [number, number];
  onApplyFilters: (
    dietTypes: DietType[],
    mealType: MealType | null,
    calorieRange: [number, number]
  ) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  dietTypes: initialDietTypes,
  mealType: initialMealType,
  calorieRange: initialCalorieRange,
  onApplyFilters
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dietTypes, setDietTypes] = useState<DietType[]>(initialDietTypes);
  const [mealType, setMealType] = useState<MealType | null>(initialMealType);
  const [calorieRange, setCalorieRange] = useState<[number, number]>(initialCalorieRange);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const handleApplyFilters = () => {
    onApplyFilters(dietTypes, mealType, calorieRange);
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    setDietTypes([]);
    setMealType(null);
    setCalorieRange([0, 500]);
  };

  const toggleDietType = (type: DietType) => {
    if (dietTypes.includes(type)) {
      setDietTypes(dietTypes.filter(t => t !== type));
    } else {
      setDietTypes([...dietTypes, type]);
    }
  };

  const dietTypeOptions: { value: DietType; label: string }[] = [
    { value: 'keto', label: '生酮饮食' },
    { value: 'vegan', label: '纯素食' },
    { value: 'vegetarian', label: '素食' },
    { value: 'paleo', label: '古饮食' },
    { value: 'lowCarb', label: '低碳水' },
    { value: 'glutenFree', label: '无麸质' },
    { value: 'dairyFree', label: '无乳制品' }
  ];

  const mealTypeOptions: { value: MealType; label: string }[] = [
    { value: 'breakfast', label: '早餐' },
    { value: 'lunch', label: '午餐' },
    { value: 'dinner', label: '晚餐' },
    { value: 'snack', label: '小食' }
  ];

  return (
    <div className="relative">
      <button
        className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        onClick={toggleFilter}
      >
        <Sliders size={16} className="mr-2" />
        筛选选项
        {(dietTypes.length > 0 || mealType || calorieRange[0] > 0 || calorieRange[1] < 500) && (
          <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white rounded-lg shadow-xl w-72 sm:w-96 right-0 border border-gray-200 animate-fade-in">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">筛选选项</h3>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Diet Types */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">饮食类型</h4>
              <div className="grid grid-cols-2 gap-2">
                {dietTypeOptions.map(option => (
                  <button
                    key={option.value}
                    className={`px-3 py-2 rounded-md text-sm transition-all duration-200 flex items-center ${
                      dietTypes.includes(option.value)
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                    }`}
                    onClick={() => toggleDietType(option.value)}
                  >
                    {dietTypes.includes(option.value) && (
                      <Check size={14} className="mr-1" />
                    )}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Meal Types */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">餐点类型</h4>
              <div className="grid grid-cols-2 gap-2">
                {mealTypeOptions.map(option => (
                  <button
                    key={option.value}
                    className={`px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                      mealType === option.value
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                    }`}
                    onClick={() => setMealType(mealType === option.value ? null : option.value)}
                  >
                    {mealType === option.value && (
                      <Check size={14} className="mr-1 inline" />
                    )}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calorie Range */}
            <div>
              <div className="flex justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-700">卡路里范围</h4>
                <span className="text-sm text-gray-500">
                  {calorieRange[0]} - {calorieRange[1]} 卡路里
                </span>
              </div>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={calorieRange[0]}
                  onChange={(e) => 
                    setCalorieRange([
                      parseInt(e.target.value), 
                      Math.max(parseInt(e.target.value), calorieRange[1])
                    ])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={calorieRange[1]}
                  onChange={(e) => 
                    setCalorieRange([
                      Math.min(calorieRange[0], parseInt(e.target.value)), 
                      parseInt(e.target.value)
                    ])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between p-4 border-t border-gray-200">
            <button
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 focus:outline-none"
              onClick={handleResetFilters}
            >
              重置筛选
            </button>
            <button
              className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-md text-sm font-medium hover:shadow-md transition-all duration-200"
              onClick={handleApplyFilters}
            >
              应用筛选
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterOptions;