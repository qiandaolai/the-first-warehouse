import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useMeals } from '../hooks/useMeals';
import { meals } from '../data/meals';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, toggleFavorite } = useMeals();
  
  const favoriteMeals = meals.filter(meal => 
    userProfile.favorites.includes(meal.id)
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">我的收藏</h1>
      
      {favoriteMeals.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Heart size={48} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">还没有收藏任何餐食</h2>
          <p className="text-gray-600 mb-6">
            在浏览餐食时点击心形图标，将它们添加到您的收藏夹中。
          </p>
          <button
            className="bg-gradient-to-r from-green-400 to-blue-400 text-white font-medium py-2 px-6 rounded-full hover:shadow-lg transition-all duration-300"
            onClick={() => navigate('/')}
          >
            探索餐食
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteMeals.map(meal => (
            <div 
              key={meal.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img 
                  src={meal.image} 
                  alt={meal.name} 
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => navigate(`/meal/${meal.id}`)}
                />
                <button
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md text-red-500"
                  onClick={() => toggleFavorite(meal.id)}
                >
                  <Heart size={20} fill="#ef4444" />
                </button>
                <div className="absolute bottom-3 left-3 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {meal.calories} 卡路里
                </div>
              </div>
              
              <div className="p-4">
                <h3 
                  className="font-bold text-gray-800 mb-2 cursor-pointer hover:text-green-500 transition-colors"
                  onClick={() => navigate(`/meal/${meal.id}`)}
                >
                  {meal.name}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {meal.dietType.slice(0, 2).map(type => (
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
                  {meal.dietType.length > 2 && (
                    <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-md text-xs">
                      +{meal.dietType.length - 2}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-4">蛋白质: {meal.protein}g</span>
                    <span>碳水: {meal.carbs}g</span>
                  </div>
                  <span className="text-sm text-gray-500">{meal.preparationTime} 分钟</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;