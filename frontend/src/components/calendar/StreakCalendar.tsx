'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarDay {
  date: number;
  questionsCompleted: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isStreakDay: boolean;
  streakPosition: number; // Position in current streak (0 = not in streak)
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
  
  const getIntensityClass = (questionsCompleted: number, isStreakDay: boolean) => {
    if (questionsCompleted === 0) return 'bg-muted hover:bg-muted/80';
    
    const baseClasses = isStreakDay ? 'ring-2 ring-orange-400/50' : '';
    
    if (questionsCompleted <= 2) return `bg-green-900 hover:bg-green-800 ${baseClasses}`;
    if (questionsCompleted <= 4) return `bg-green-700 hover:bg-green-600 ${baseClasses}`;
    if (questionsCompleted <= 6) return `bg-green-500 hover:bg-green-400 ${baseClasses}`;
    return `bg-green-400 hover:bg-green-300 ${baseClasses}`;
  };

  // Calculate streak information
  const streakInfo = useMemo(() => {
    const dates = Object.keys(streakData).sort();
    const streakDays = new Set<string>();
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    // Find current streak
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Check if today has activity
    if (streakData[todayStr] > 0) {
      currentStreak = 1;
      streakDays.add(todayStr);
      
      // Go backwards to find streak
      for (let i = 1; i < 365; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - i);
        const checkDateStr = checkDate.toISOString().split('T')[0];
        
        if (streakData[checkDateStr] > 0) {
          currentStreak++;
          streakDays.add(checkDateStr);
        } else {
          break;
        }
      }
    }
    
    // Calculate longest streak
    for (const date of dates) {
      if (streakData[date] > 0) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 0;
      }
    }
    
    return { currentStreak, longestStreak, streakDays };
  }, [streakData]);
  
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
        isStreakDay: streakInfo.streakDays.has(dateString),
        streakPosition: 0,
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
        isStreakDay: streakInfo.streakDays.has(dateString),
        streakPosition: 0,
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
        isStreakDay: streakInfo.streakDays.has(dateString),
        streakPosition: 0,
      });
    }
    
    return days;
  }, [year, month, streakData, streakInfo.streakDays]);
  
  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-400" />
            {MONTH_NAMES[month]} {year}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Current streak: <span className="font-semibold text-orange-400">{streakInfo.currentStreak} days</span>
            {streakInfo.longestStreak > streakInfo.currentStreak && (
              <span className="ml-2">• Best: {streakInfo.longestStreak} days</span>
            )}
          </p>
        </div>
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
              "aspect-square rounded-lg border-2 border-transparent flex items-center justify-center text-sm font-medium transition-all hover:border-primary cursor-pointer relative",
              day.isCurrentMonth ? "text-foreground" : "text-muted-foreground",
              day.isToday && "border-primary ring-2 ring-primary ring-opacity-50",
              getIntensityClass(day.questionsCompleted, day.isStreakDay)
            )}
            title={`${day.date}: ${day.questionsCompleted} questions completed${day.isStreakDay ? ' (Streak day!)' : ''}`}
          >
            {day.date}
            {day.isStreakDay && day.questionsCompleted > 0 && (
              <Flame className="absolute top-0.5 right-0.5 h-3 w-3 text-orange-400" />
            )}
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
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
        <div className="flex items-center space-x-2">
          <Flame className="h-3 w-3 text-orange-400" />
          <span className="text-xs">Streak days</span>
        </div>
      </div>
    </div>
  );
}