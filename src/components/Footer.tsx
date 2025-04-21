import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xs">减脂</span>
              </div>
              <span className="text-gray-800 font-bold text-lg">减脂餐盲盒</span>
            </div>
            <p className="text-gray-600 text-sm mt-2">
              健康饮食，轻松减脂
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">关于我们</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors">我们的故事</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors">营养专家</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors">联系我们</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">资源</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors">饮食指南</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors">博客</a></li>
                <li><a href="#" className="text-gray-600 hover:text-green-500 transition-colors">营养计算器</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} 减脂餐盲盒. 保留所有权利.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-gray-500 text-sm flex items-center">
              用 <Heart size={12} className="mx-1 text-red-500" /> 制作
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;