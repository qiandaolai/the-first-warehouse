import React from 'react';

interface NutritionInfoProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const NutritionInfo: React.FC<NutritionInfoProps> = ({ calories, protein, carbs, fat }) => {
  // Calculate percentages for the progress bars
  const total = protein * 4 + carbs * 4 + fat * 9; // calories from each macro
  const proteinPercent = Math.round((protein * 4) / total * 100);
  const carbsPercent = Math.round((carbs * 4) / total * 100);
  const fatPercent = Math.round((fat * 9) / total * 100);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">营养信息</h3>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-600">
              蛋白质
            </span>
            <span className="text-xs font-medium text-gray-600">
              {protein}g ({proteinPercent}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-blue-500 h-1.5 rounded-full" 
              style={{ width: `${proteinPercent}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-600">
              碳水化合物
            </span>
            <span className="text-xs font-medium text-gray-600">
              {carbs}g ({carbsPercent}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-green-500 h-1.5 rounded-full" 
              style={{ width: `${carbsPercent}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-600">
              脂肪
            </span>
            <span className="text-xs font-medium text-gray-600">
              {fat}g ({fatPercent}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-yellow-500 h-1.5 rounded-full" 
              style={{ width: `${fatPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
        <span className="text-xs font-medium text-gray-600">总热量</span>
        <span className="text-sm font-bold text-gray-700">{calories} 卡路里</span>
      </div>
    </div>
  );
};

export default NutritionInfo;