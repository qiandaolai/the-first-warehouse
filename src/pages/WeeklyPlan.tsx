import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, PlusCircle, AlertCircle, Trash2 } from 'lucide-react';
import { useMeals } from '../hooks/useMeals';
import { meals } from '../data/meals';

const WeeklyPlan: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile, removeFromWeeklyPlan } = useMeals();
  
  const [activeDay, setActiveDay] = useState<keyof typeof userProfile.weeklyPlan>('monday');
  
  const days = [
    { key: 'monday' as const, label: '星期一' },
    { key: 'tuesday' as const, label: '星期二' },
    { key: 'wednesday' as const, label: '星期三' },
    { key: 'thursday' as const, label: '星期四' },
    { key: 'friday' as const, label: '星期五' },
    { key: 'saturday' as const, label: '星期六' },
    { key: 'sunday' as const, label: '星期日' }
  ];
  
  const dayMeals = userProfile.weeklyPlan[activeDay]
    .map(id => meals.find(meal => meal.id === id))
    .filter(Boolean);
  
  const totalCalories = dayMeals.reduce((sum, meal) => 
    sum + (meal?.calories || 0), 0
  );
  
  const totalProtein = dayMeals.reduce((sum, meal) => 
    sum + (meal?.protein || 0), 0
  );
  
  const totalCarbs = dayMeals.reduce((sum, meal) => 
    sum + (meal?.carbs || 0), 0
  );
  
  const totalFat = dayMeals.reduce((sum, meal) => 
    sum + (meal?.fat || 0), 0
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">我的每周餐食计划</h1>
        <div className="flex items-center bg-green-50 text-green-700 rounded-lg p-2">
          <CalendarDays size={20} className="mr-2" />
          <span className="font-medium">2025年11月1日 - 2025年11月7日</span>
        </div>
      </div>
      
      {/* Day selector tabs */}
      <div className="flex overflow-x-auto scrollbar-hide mb-8">
        {days.map(day => (
          <button
            key={day.key}
            className={`flex-shrink-0 px-4 py-2 rounded-lg mr-2 transition-all duration-200 ${
              activeDay === day.key
                ? 'bg-gradient-to-r from-green-400 to-blue-400 text-white font-medium'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveDay(day.key)}
          >
            {day.label}
          </button>
        ))}
      </div>
      
      {/* Daily nutrition summary */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {days.find(day => day.key === activeDay)?.label} 营养总结
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-600 text-sm">总热量</p>
            <p className="text-2xl font-bold text-gray-800">{totalCalories} <span className="text-sm font-normal">卡路里</span></p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-green-600 text-sm">蛋白质</p>
            <p className="text-2xl font-bold text-gray-800">{totalProtein} <span className="text-sm font-normal">克</span></p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-yellow-600 text-sm">碳水化合物</p>
            <p className="text-2xl font-bold text-gray-800">{totalCarbs} <span className="text-sm font-normal">克</span></p>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-red-600 text-sm">脂肪</p>
            <p className="text-2xl font-bold text-gray-800">{totalFat} <span className="text-sm font-normal">克</span></p>
          </div>
        </div>
        
        {userProfile.calorieGoal > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">每日卡路里目标</span>
              <span className="text-sm font-medium">{totalCalories} / {userProfile.calorieGoal} 卡路里</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  totalCalories > userProfile.calorieGoal ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(100, (totalCalories / userProfile.calorieGoal) * 100)}%` }}
              ></div>
            </div>
            
            {totalCalories > userProfile.calorieGoal && (
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <AlertCircle size={16} className="mr-1" />
                超出目标 {totalCalories - userProfile.calorieGoal} 卡路里
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Day's meal list */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {days.find(day => day.key === activeDay)?.label}的餐食
          </h2>
          <button
            className="flex items-center text-green-500 hover:text-green-700 transition-colors"
            onClick={() => navigate('/')}
          >
            <PlusCircle size={18} className="mr-1" />
            添加餐食
          </button>
        </div>
        
        {dayMeals.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PlusCircle size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">这一天还没有安排餐食</h3>
            <p className="text-gray-600 mb-6">
              从我们的餐食库中添加一些健康餐食，开始您的一天。
            </p>
            <button
              className="bg-gradient-to-r from-green-400 to-blue-400 text-white font-medium py-2 px-6 rounded-full hover:shadow-lg transition-all duration-300"
              onClick={() => navigate('/')}
            >
              浏览餐食
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {dayMeals.map(meal => meal && (
              <div 
                key={meal.id} 
                className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row hover:shadow-md transition-shadow"
              >
                <img 
                  src={meal.image} 
                  alt={meal.name} 
                  className="w-full sm:w-32 h-24 object-cover rounded-lg sm:mr-4 mb-4 sm:mb-0 cursor-pointer"
                  onClick={() => navigate(`/meal/${meal.id}`)}
                />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 
                      className="font-semibold text-gray-800 mb-1 cursor-pointer hover:text-green-500 transition-colors"
                      onClick={() => navigate(`/meal/${meal.id}`)}
                    >
                      {meal.name}
                    </h3>
                    <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      {meal.calories} 卡路里
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center text-sm text-gray-600 mb-2">
                    <span className="mr-4">蛋白质: {meal.protein}g</span>
                    <span className="mr-4">碳水: {meal.carbs}g</span>
                    <span>脂肪: {meal.fat}g</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {meal.dietType.slice(0, 2).map(type => (
                      <span 
                        key={type} 
                        className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-xs"
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
                
                <button
                  className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => removeFromWeeklyPlan(meal.id, activeDay)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyPlan;