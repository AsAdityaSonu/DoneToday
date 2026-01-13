'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarDay {
  date: number;
  questionsCompleted: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

interface StreakCalendarProps {
  streakData: Record<string, number>;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function StreakCalendar({ streakData }: StreakCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const getIntensityClass = (questionsCompleted: number) => {
    if (questionsCompleted === 0) return 'bg-muted';
    if (questionsCompleted <= 2) return 'bg-green-900';
    if (questionsCompleted <= 4) return 'bg-green-700';
    if (questionsCompleted <= 6) return 'bg-green-500';
    return 'bg-green-400';
  };
  
  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const today = new Date();
    const days: CalendarDay[] = [];
    
    // Previous month's trailing days
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
    
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const date = daysInPrevMonth - i;
      const dateString = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      days.push({
        date,
        questionsCompleted: streakData[dateString] || 0,
        isCurrentMonth: false,
        isToday: false,
      });
    }
    
    // Current month days
    for (let date = 1; date <= daysInMonth; date++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      const isToday = today.getFullYear() === year && 
                     today.getMonth() === month && 
                     today.getDate() === date;
      
      days.push({
        date,
        questionsCompleted: streakData[dateString] || 0,
        isCurrentMonth: true,
        isToday,
      });
    }
    
    // Next month's leading days
    const totalCells = 42;
    const remainingCells = totalCells - days.length;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    
    for (let date = 1; date <= remainingCells; date++) {
      const dateString = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      days.push({
        date,
        questionsCompleted: streakData[dateString] || 0,
        isCurrentMonth: false,
        isToday: false,
      });
    }
    
    return days;
  }, [year, month, streakData]);
  
  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          {MONTH_NAMES[month]} {year}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-2">
        {WEEK_DAYS.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={cn(
              "aspect-square rounded-lg border-2 border-transparent flex items-center justify-center text-sm font-medium transition-all hover:border-primary cursor-pointer",
              day.isCurrentMonth ? "text-foreground" : "text-muted-foreground",
              day.isToday && "border-primary ring-2 ring-primary ring-opacity-50",
              getIntensityClass(day.questionsCompleted)
            )}
            title={`${day.date}: ${day.questionsCompleted} questions completed`}
          >
            {day.date}
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-6 text-sm text-muted-foreground">
        <span>Less</span>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-sm bg-muted"></div>
          <div className="w-3 h-3 rounded-sm bg-green-900"></div>
          <div className="w-3 h-3 rounded-sm bg-green-700"></div>
          <div className="w-3 h-3 rounded-sm bg-green-500"></div>
          <div className="w-3 h-3 rounded-sm bg-green-400"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
}