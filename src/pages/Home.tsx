import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeals } from '../hooks/useMeals';
import MealBox from '../components/MealBox';
import FilterOptions from '../components/FilterOptions';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentMeal,
    isRevealed,
    userProfile,
    filterOptions,
    setFilterOptions,
    generateRandomMeal,
    toggleFavorite
  } = useMeals();
  
  const [showWeeklyPlanModal, setShowWeeklyPlanModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<keyof typeof userProfile.weeklyPlan | null>(null);

  const handleViewDetails = () => {
    if (currentMeal) {
      navigate(`/meal/${currentMeal.id}`);
    }
  };

  const handleAddToWeeklyPlan = () => {
    setShowWeeklyPlanModal(true);
  };

  const addToDay = (day: keyof typeof userProfile.weeklyPlan) => {
    if (currentMeal) {
      // This would trigger the addToWeeklyPlan function from useMeals
      // But we just simulate it for this demo by setting the selected day
      setSelectedDay(day);
      setTimeout(() => {
        setShowWeeklyPlanModal(false);
        setSelectedDay(null);
      }, 1500);
    }
  };

  const isFavorite = currentMeal 
    ? userProfile.favorites.includes(currentMeal.id) 
    : false;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="mt-16 mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          健康美味的<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">减脂餐</span>，随机呈现
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          探索营养均衡、美味可口的减脂餐食谱，助您轻松实现健康饮食目标。
        </p>
        <div className="flex justify-center mb-6">
          <FilterOptions
            dietTypes={filterOptions.dietTypes}
            mealType={filterOptions.mealType}
            calorieRange={filterOptions.calorieRange}
            onApplyFilters={(dietTypes, mealType, calorieRange) => {
              setFilterOptions({
                dietTypes,
                mealType,
                calorieRange
              });
            }}
          />
        </div>
      </section>

      {/* Meal Box Section */}
      <section className="mb-16 flex flex-col items-center">
        <MealBox
          meal={currentMeal}
          isRevealed={isRevealed}
          isFavorite={isFavorite}
          onGenerateClick={generateRandomMeal}
          onFavoriteToggle={() => currentMeal && toggleFavorite(currentMeal.id)}
          onViewDetails={handleViewDetails}
          onAddToWeeklyPlan={handleAddToWeeklyPlan}
        />
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">
          如何使用减脂餐盲盒
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-500 font-bold text-xl">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">设置您的偏好</h3>
            <p className="text-gray-600">
              选择您的饮食类型、卡路里需求和口味偏好，让我们为您推荐最适合的餐食。
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-500 font-bold text-xl">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">打开盲盒</h3>
            <p className="text-gray-600">
              点击生成按钮，让我们的算法为您随机推荐符合您需求的美味减脂餐。
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-yellow-500 font-bold text-xl">3</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">烹饪享用</h3>
            <p className="text-gray-600">
              按照详细的烹饪指南准备您的减脂餐，享受健康美味的饮食体验。
            </p>
          </div>
        </div>
      </section>

      {/* Weekly Plan Modal */}
      {showWeeklyPlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 animate-fade-in-up">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              添加到每周计划
            </h3>
            <p className="text-gray-600 mb-6">
              选择要添加此餐到一周中的哪一天：
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(userProfile.weeklyPlan).map((day) => (
                <button
                  key={day}
                  className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    selectedDay === day
                      ? 'bg-green-100 border-green-400 text-green-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => addToDay(day as keyof typeof userProfile.weeklyPlan)}
                >
                  {day === 'monday' && '星期一'}
                  {day === 'tuesday' && '星期二'}
                  {day === 'wednesday' && '星期三'}
                  {day === 'thursday' && '星期四'}
                  {day === 'friday' && '星期五'}
                  {day === 'saturday' && '星期六'}
                  {day === 'sunday' && '星期日'}
                  {selectedDay === day && ' ✓'}
                </button>
              ))}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 text-gray-700 hover:text-gray-900 mr-2"
                onClick={() => setShowWeeklyPlanModal(false)}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;