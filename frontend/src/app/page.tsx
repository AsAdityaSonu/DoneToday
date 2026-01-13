'use client';

import { useState } from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import QuestionBank from '@/components/questions/QuestionBank';
import Sidebar from '@/components/layout/Sidebar';
import { Menu } from 'lucide-react';
import { Question } from '@/types';

// Mock data - in a real app, this would come from a global state or API
const MOCK_QUESTIONS: Question[] = [
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
  },
  {
    id: '4',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    tags: ['Stack', 'String'],
    approach: 'Use stack to match opening and closing brackets.',
    solution: 'def isValid(s):\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in mapping:\n            if not stack or stack.pop() != mapping[char]:\n                return False\n        else:\n            stack.append(char)\n    return not stack',
    completedAt: new Date('2024-01-10'),
    timeSpent: 20,
    platform: 'LeetCode'
  },
  {
    id: '5',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    tags: ['Array', 'DynamicProgramming'],
    approach: 'Kadane\'s algorithm - keep track of maximum sum ending at current position.',
    notes: 'Important DP problem, also known as Kadane\'s algorithm.',
    completedAt: new Date('2024-01-09'),
    timeSpent: 30,
    platform: 'LeetCode'
  },
  {
    id: '6',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    tags: ['LinkedList'],
    approach: 'Use two pointers to merge lists in sorted order.',
    completedAt: new Date('2024-01-08'),
    timeSpent: 25,
    platform: 'LeetCode'
  },
  {
    id: '7',
    title: 'Binary Search',
    difficulty: 'Easy',
    tags: ['BinarySearch', 'Array'],
    approach: 'Classic binary search implementation.',
    solution: 'def search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1',
    completedAt: new Date('2024-01-07'),
    timeSpent: 15,
    platform: 'LeetCode'
  },
  {
    id: '8',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    tags: ['DynamicProgramming', 'Math'],
    approach: 'Fibonacci sequence - each step is sum of previous two steps.',
    notes: 'Classic DP problem, can be optimized to O(1) space.',
    completedAt: new Date('2024-01-05'),
    timeSpent: 20,
    platform: 'LeetCode'
  }
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);

  const handleAddQuestion = (questionData: Omit<Question, 'id' | 'completedAt'>) => {
    const newQuestion: Question = {
      ...questionData,
      id: Date.now().toString(),
      completedAt: new Date(),
    };
    
    setQuestions(prev => [newQuestion, ...prev]);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard questions={questions} onAddQuestion={handleAddQuestion} />;
      case 'question-bank':
        return <QuestionBank questions={questions} />;
      default:
        return <Dashboard questions={questions} onAddQuestion={handleAddQuestion} />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Fixed */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile menu button */}
        <div className="lg:hidden p-4 border-b border-border/50 bg-card/50 backdrop-blur-sm flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}