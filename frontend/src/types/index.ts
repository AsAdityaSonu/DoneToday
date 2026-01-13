export interface Question {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  approach?: string;
  solution?: string;
  notes?: string;
  completedAt: Date;
  timeSpent?: number; // in minutes
  platform?: string; // LeetCode, HackerRank, etc.
}

export interface DailyStreak {
  date: string; // YYYY-MM-DD format
  questionsCompleted: number;
  questions: Question[];
}

export interface StreakStats {
  currentStreak: number;
  longestStreak: number;
  totalQuestions: number;
  totalDays: number;
  averagePerDay: number;
}

export type QuestionTag = 
  | 'Array' 
  | 'String' 
  | 'LinkedList' 
  | 'Tree' 
  | 'Graph' 
  | 'DynamicProgramming' 
  | 'Greedy' 
  | 'Backtracking' 
  | 'BinarySearch' 
  | 'TwoPointers' 
  | 'SlidingWindow' 
  | 'Stack' 
  | 'Queue' 
  | 'Heap' 
  | 'Sorting' 
  | 'Math' 
  | 'BitManipulation';