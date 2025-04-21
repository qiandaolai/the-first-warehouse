import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { UserProfile } from '../types';

interface WeeklyCalendarProps {
  weeklyPlan: UserProfile['weeklyPlan'];
  onDaySelect: (day: keyof UserProfile['weeklyPlan']) => void;
  selectedDay: keyof UserProfile['weeklyPlan'];
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  weeklyPlan,
  onDaySelect,
  selectedDay
}) => {
  const days = [
    { key: 'monday' as const, label: '一', fullLabel: '星期一' },
    { key: 'tuesday' as const, label: '二', fullLabel: '星期二' },
    { key: 'wednesday' as const, label: '三', fullLabel: '星期三' },
    { key: 'thursday' as const, label: '四', fullLabel: '星期四' },
    { key: 'friday' as const, label: '五', fullLabel: '星期五' },
    { key: 'saturday' as const, label: '六', fullLabel: '星期六' },
    { key: 'sunday' as const, label: '日', fullLabel: '星期日' }
  ];

  // Mock dates for the current week
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay(); // 0 is Sunday, 1 is Monday, etc.
  
  // Adjust to make Monday the first day of the week
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const mondayDate = new Date(currentDate);
  mondayDate.setDate(currentDate.getDate() + mondayOffset);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <Calendar size={18} className="mr-2" />
          本周计划
        </h3>
        <div className="flex space-x-2">
          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronLeft size={18} className="text-gray-500" />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <ChevronRight size={18} className="text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          const date = new Date(mondayDate);
          date.setDate(mondayDate.getDate() + index);
          
          const formattedDate = date.getDate();
          const hasPlannedMeals = weeklyPlan[day.key].length > 0;
          
          return (
            <button
              key={day.key}
              className={`flex flex-col items-center py-2 rounded-lg transition-all duration-200 ${
                selectedDay === day.key
                  ? 'bg-gradient-to-r from-green-400 to-blue-400 text-white'
                  : hasPlannedMeals
                  ? 'bg-green-50 text-green-700 hover:bg-green-100'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              onClick={() => onDaySelect(day.key)}
            >
              <span className="text-xs font-medium mb-1">{day.label}</span>
              <span className={`text-lg ${selectedDay === day.key ? 'font-bold' : ''}`}>
                {formattedDate}
              </span>
              {hasPlannedMeals && (
                <div className={`w-1.5 h-1.5 rounded-full mt-1 ${
                  selectedDay === day.key ? 'bg-white' : 'bg-green-500'
                }`}></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyCalendar;