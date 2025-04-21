import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Clock, User, Calendar, Save } from 'lucide-react';
import { useMeals } from '../hooks/useMeals';
import { meals } from '../data/meals';
import NutritionInfo from '../components/NutritionInfo';

const MealDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userProfile, toggleFavorite } = useMeals();
  
  const meal = meals.find(m => m.id === id);
  
  if (!meal) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">餐食未找到</h2>
        <button
          className="flex items-center text-blue-500 hover:text-blue-700 font-medium"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={20} className="mr-2" />
          返回首页
        </button>
      </div>
    );
  }

  const isFavorite = userProfile.favorites.includes(meal.id);

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <button
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={20} className="mr-1" />
        返回
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={meal.image} 
              alt={meal.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{meal.name}</h1>
              <button
                className={`p-2 rounded-full ${
                  isFavorite 
                    ? 'bg-red-50 text-red-500' 
                    : 'text-gray-400 hover:text-red-500'
                }`}
                onClick={() => toggleFavorite(meal.id)}
              >
                <Heart size={24} fill={isFavorite ? "#ef4444" : "none"} />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 mb-6">
              {meal.dietType.map(type => (
                <span 
                  key={type} 
                  className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
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
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Clock size={20} className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">准备时间</p>
                  <p className="font-medium">{meal.preparationTime} 分钟</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <User size={20} className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">份量</p>
                  <p className="font-medium">1 人份</p>
                </div>
              </div>
            </div>
            
            <NutritionInfo 
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
            />
            
            <div className="flex space-x-3 mt-6">
              <button className="flex-1 flex justify-center items-center py-2 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-lg font-medium hover:shadow-md transition-all duration-200">
                <Save size={18} className="mr-2" />
                保存食谱
              </button>
              <button className="flex-1 flex justify-center items-center py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200">
                <Calendar size={18} className="mr-2" />
                添加到计划
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">材料清单</h2>
          <ul className="space-y-3">
            {meal.ingredients.map((ingredient, index) => (
              <li 
                key={index} 
                className="flex items-center py-2 border-b border-gray-100"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">烹饪步骤</h2>
          <ol className="space-y-4">
            {meal.instructions.map((instruction, index) => (
              <li key={index} className="flex">
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-medium mr-3 flex-shrink-0">
                  {index + 1}
                </div>
                <div className="pb-4 border-b border-gray-100">{instruction}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      
      <div className="bg-green-50 rounded-lg p-6 mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-3">烹饪小贴士</h2>
        <p className="text-gray-700">
          这道菜可以提前准备，冷藏保存最多2天。如果您正在严格控制热量，可以减少油脂用量或选择低热量的替代品。如需增加饱腹感，可以添加更多绿叶蔬菜。
        </p>
      </div>
    </div>
  );
};

export default MealDetail;