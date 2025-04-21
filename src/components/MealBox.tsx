import React, { useState } from 'react';
import { Package, ArrowRight, Heart, Calendar } from 'lucide-react';
import { Meal } from '../types';
import NutritionInfo from './NutritionInfo';

interface MealBoxProps {
  meal: Meal | null;
  isRevealed: boolean;
  isFavorite: boolean;
  onGenerateClick: () => void;
  onFavoriteToggle: () => void;
  onViewDetails: () => void;
  onAddToWeeklyPlan: () => void;
}

const MealBox: React.FC<MealBoxProps> = ({
  meal,
  isRevealed,
  isFavorite,
  onGenerateClick,
  onFavoriteToggle,
  onViewDetails,
  onAddToWeeklyPlan
}) => {
  const [isBoxOpening, setIsBoxOpening] = useState(false);

  const handleGenerate = () => {
    setIsBoxOpening(true);
    onGenerateClick();
    
    // Reset box opening animation after it completes
    setTimeout(() => {
      setIsBoxOpening(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!meal || !isRevealed ? (
        <div 
          className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center min-h-[400px] transition-all duration-500 cursor-pointer ${
            isBoxOpening ? 'transform scale-105' : ''
          }`}
          onClick={handleGenerate}
        >
          <div className={`transition-all duration-700 ${isBoxOpening ? 'animate-bounce' : ''}`}>
            <Package 
              size={80} 
              className="text-green-400 mb-4"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">减脂餐盲盒</h2>
          <p className="text-gray-600 text-center mb-6">
            点击盲盒，为您的下一餐获取一个健康惊喜！
          </p>
          <button
            className="bg-gradient-to-r from-green-400 to-blue-400 text-white font-medium py-2 px-8 rounded-full hover:shadow-lg transition-all duration-300 flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              handleGenerate();
            }}
          >
            开启盲盒
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform scale-100">
          <div className="relative">
            <img 
              src={meal.image} 
              alt={meal.name} 
              className="w-full h-52 object-cover"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                className={`rounded-full p-2 transition-all duration-300 ${
                  isFavorite 
                    ? 'bg-red-50 text-red-500' 
                    : 'bg-white text-gray-500 hover:text-red-500'
                }`}
                onClick={onFavoriteToggle}
              >
                <Heart 
                  size={20} 
                  fill={isFavorite ? "#ef4444" : "none"} 
                />
              </button>
              <button
                className="rounded-full p-2 bg-white text-gray-500 hover:text-blue-500 transition-all duration-300"
                onClick={onAddToWeeklyPlan}
              >
                <Calendar size={20} />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">{meal.name}</h2>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {meal.calories} 卡路里
              </div>
            </div>
            
            <div className="mb-6 space-y-2">
              <p className="text-gray-600">准备时间: {meal.preparationTime} 分钟</p>
              <div className="flex flex-wrap gap-2">
                {meal.dietType.map(type => (
                  <span 
                    key={type} 
                    className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs"
                  >
                    {type === 'keto' && '生酮饮食'}
                    {type === 'vegan' && '纯素食'}
                    {type === 'vegetarian' && '素食'}
                    {type === 'paleo' && '古饮食'}
                    {type === 'lowCarb' && '低碳水'}
                    {type === 'glutenFree' && '无麸质'}
                    {type === 'dairyFree' && '无乳制品'}
                  </span>
                ))}
              </div>
            </div>
            
            <NutritionInfo 
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
            />
            
            <div className="mt-6 flex justify-between">
              <button
                className="bg-white border border-green-400 text-green-500 font-medium py-2 px-6 rounded-full hover:bg-green-50 transition-all duration-300"
                onClick={handleGenerate}
              >
                重新生成
              </button>
              <button
                className="bg-gradient-to-r from-green-400 to-blue-400 text-white font-medium py-2 px-6 rounded-full hover:shadow-lg transition-all duration-300"
                onClick={onViewDetails}
              >
                查看详情
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealBox;