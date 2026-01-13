'use client';

import { useState, useMemo, useCallback } from 'react';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import StatsCards from './StatsCards';
import StreakCalendar from '@/components/calendar/StreakCalendar';
import QuestionForm from '@/components/questions/QuestionForm';
import QuestionList from '@/components/questions/QuestionList';
import { Question, StreakStats } from '@/types';
import { formatDate } from '@/lib/utils';

// Mock data
const INITIAL_QUESTIONS: Question[] = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['Array', 'TwoPointers'],
    approach: 'Use a hash map to store complements and find the pair in one pass.',
    solution: 'def twoSum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i',
    notes: 'Classic problem, good for understanding hash maps.',
    completedAt: new Date('2024-01-13'),
    timeSpent: 25,
    platform: 'LeetCode'
  },
  {
    id: '2',
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'Medium',
    tags: ['Tree', 'Stack'],
    approach: 'Use iterative approach with stack to simulate recursion.',
    completedAt: new Date('2024-01-12'),
    timeSpent: 35,
    platform: 'LeetCode'
  },
  {
    id: '3',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    tags: ['String', 'DynamicProgramming'],
    approach: 'Expand around centers approach for O(n²) solution.',
    completedAt: new Date('2024-01-11'),
    timeSpent: 45,
    platform: 'LeetCode'
  }
];

const INITIAL_STREAK_DATA: Record<string, number> = {
  '2024-01-13': 3,
  '2024-01-12': 2,
  '2024-01-11': 4,
  '2024-01-10': 1,
  '2024-01-09': 2,
  '2024-01-08': 3,
  '2024-01-07': 1,
  '2024-01-05': 2,
  '2024-01-04': 1,
  '2024-01-03': 3,
};

export default function Dashboard() {
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [streakData, setStreakData] = useState<Record<string, number>>(INITIAL_STREAK_DATA);

  const handleAddQuestion = useCallback((questionData: Omit<Question, 'id' | 'completedAt'>) => {
    const newQuestion: Question = {
      ...questionData,
      id: Date.now().toString(),
      completedAt: new Date(),
    };
    
    setQuestions(prev => [newQuestion, ...prev]);
    
    // Update streak data
    const today = formatDate(new Date());
    setStreakData(prev => ({
      ...prev,
      [today]: (prev[today] || 0) + 1
    }));
  }, []);

  // Calculate stats with useMemo for performance
  const stats = useMemo((): StreakStats => {
    const dates = Object.keys(streakData).sort().reverse();
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    // Calculate current streak
    const todayStr = formatDate(new Date());
    if (streakData[todayStr] > 0) {
      currentStreak = 1;
      for (let i = 1; i < dates.length; i++) {
        const date = new Date(dates[i]);
        const prevDate = new Date(dates[i - 1]);
        const dayDiff = Math.floor((prevDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        
        if (dayDiff === 1 && streakData[dates[i]] > 0) {
          currentStreak++;
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
    
    const totalQuestions = Object.values(streakData).reduce((sum, count) => sum + (count || 0), 0);
    const totalDays = Object.keys(streakData).filter(date => (streakData[date] || 0) > 0).length;
    const averagePerDay = totalDays > 0 ? totalQuestions / totalDays : 0;
    
    return {
      currentStreak,
      longestStreak,
      totalQuestions,
      totalDays,
      averagePerDay,
    };
  }, [streakData]);

  const todayQuestions = useMemo(() => 
    questions.filter(q => formatDate(q.completedAt) === formatDate(new Date())),
    [questions]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">DSA Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your coding progress and maintain your streak</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Question</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="xl:col-span-2">
          <StreakCalendar streakData={streakData} />
        </div>
        
        {/* Today's Progress */}
        <div>
          <QuestionList 
            questions={todayQuestions} 
            title={`Today's Progress (${todayQuestions.length})`}
          />
        </div>
      </div>

      {/* Recent Questions */}
      <QuestionList 
        questions={questions.slice(0, 10)} 
        title="Recent Questions"
      />

      {/* Question Form Modal */}
      <QuestionForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddQuestion}
      />
    </div>
  );
}