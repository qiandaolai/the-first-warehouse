import React, { useState } from 'react';
import { Save, User, Target, AlertTriangle } from 'lucide-react';
import { useMeals } from '../hooks/useMeals';
import { DietType } from '../types';

const Profile: React.FC = () => {
  const { userProfile, updateDietPreferences, updateCalorieGoal } = useMeals();
  
  const [dietPreferences, setDietPreferences] = useState<DietType[]>(userProfile.dietPreferences);
  const [calorieGoal, setCalorieGoal] = useState(userProfile.calorieGoal);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  
  const dietTypeOptions: { value: DietType; label: string }[] = [
    { value: 'keto', label: '生酮饮食' },
    { value: 'vegan', label: '纯素食' },
    { value: 'vegetarian', label: '素食' },
    { value: 'paleo', label: '古饮食' },
    { value: 'lowCarb', label: '低碳水' },
    { value: 'glutenFree', label: '无麸质' },
    { value: 'dairyFree', label: '无乳制品' }
  ];
  
  const toggleDietType = (type: DietType) => {
    if (dietPreferences.includes(type)) {
      setDietPreferences(dietPreferences.filter(t => t !== type));
    } else {
      setDietPreferences([...dietPreferences, type]);
    }
  };
  
  const handleCalorieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setCalorieGoal(value);
    }
  };
  
  const handleSave = () => {
    updateDietPreferences(dietPreferences);
    updateCalorieGoal(calorieGoal);
    
    setShowSaveSuccess(true);
    setTimeout(() => {
      setShowSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen mt-16">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">个人资料</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-400 to-blue-400 p-6">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <User size={20} className="mr-2" />
                饮食偏好
              </h2>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  选择您的饮食类型（可多选）
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {dietTypeOptions.map(option => (
                    <button
                      key={option.value}
                      className={`px-4 py-3 rounded-lg text-sm transition-all duration-200 border ${
                        dietPreferences.includes(option.value)
                          ? 'bg-green-100 border-green-300 text-green-700'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => toggleDietType(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="calorieGoal" className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Target size={16} className="mr-1" />
                  每日卡路里目标
                </label>
                <div className="flex items-center">
                  <input
                    id="calorieGoal"
                    type="number"
                    value={calorieGoal}
                    onChange={handleCalorieChange}
                    className="border border-gray-300 rounded-lg py-2 px-4 w-28 mr-2"
                    min="800"
                    max="4000"
                  />
                  <span className="text-gray-600">卡路里</span>
                </div>
                
                {calorieGoal < 1200 && (
                  <div className="mt-2 flex items-start text-amber-600 text-sm">
                    <AlertTriangle size={16} className="mr-1 mt-0.5 flex-shrink-0" />
                    <span>设置过低的卡路里摄入可能不健康。建议成年人每日摄入至少1200卡路里。</span>
                  </div>
                )}
              </div>
              
              <button
                className="bg-gradient-to-r from-green-400 to-blue-400 text-white font-medium py-2 px-6 rounded-lg hover:shadow-md transition-all duration-300 flex items-center justify-center"
                onClick={handleSave}
              >
                <Save size={18} className="mr-2" />
                保存设置
              </button>
              
              {showSaveSuccess && (
                <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md text-sm text-center animate-fade-in">
                  设置已保存！
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">通知设置</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">每日健康提醒</span>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input 
                    type="checkbox" 
                    name="toggle" 
                    id="toggle-daily" 
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label 
                    htmlFor="toggle-daily" 
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">每周餐食计划提醒</span>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input 
                    type="checkbox" 
                    name="toggle" 
                    id="toggle-weekly" 
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    defaultChecked
                  />
                  <label 
                    htmlFor="toggle-weekly" 
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">账户信息</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  用户名
                </label>
                <div className="text-gray-600">健康食客</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  邮箱
                </label>
                <div className="text-gray-600">health@example.com</div>
              </div>
              
              <button className="w-full mt-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                修改账户信息
              </button>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-3">减脂小贴士</h3>
            <p className="text-gray-700 text-sm mb-4">
              除了控制饮食，适当的运动和充足的睡眠也是健康减脂的关键。建议每周进行150分钟中等强度的有氧运动。
            </p>
            <a 
              href="#" 
              className="text-blue-500 text-sm hover:text-blue-700 transition-colors"
            >
              查看更多健康小贴士 →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;