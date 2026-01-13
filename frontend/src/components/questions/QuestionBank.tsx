'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, X, Calendar, Clock, ExternalLink } from 'lucide-react';
import { Question, QuestionTag } from '@/types';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import QuestionList from './QuestionList';

interface QuestionBankProps {
  questions: Question[];
}

const ALL_TAGS: QuestionTag[] = [
  'Array', 'String', 'LinkedList', 'Tree', 'Graph', 'DynamicProgramming',
  'Greedy', 'Backtracking', 'BinarySearch', 'TwoPointers', 'SlidingWindow',
  'Stack', 'Queue', 'Heap', 'Sorting', 'Math', 'BitManipulation'
];

const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'] as const;

export default function QuestionBank({ questions }: QuestionBankProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'difficulty' | 'title'>('date');
  const [showFilters, setShowFilters] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedDifficulty([]);
    setSearchQuery('');
  };

  const filteredQuestions = useMemo(() => {
    let filtered = questions;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(query) ||
        q.tags.some(tag => tag.toLowerCase().includes(query)) ||
        q.platform?.toLowerCase().includes(query) ||
        q.approach?.toLowerCase().includes(query) ||
        q.notes?.toLowerCase().includes(query)
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(q => 
        selectedTags.some(tag => q.tags.includes(tag))
      );
    }

    // Difficulty filter
    if (selectedDifficulty.length > 0) {
      filtered = filtered.filter(q => 
        selectedDifficulty.includes(q.difficulty)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [questions, searchQuery, selectedTags, selectedDifficulty, sortBy]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTagColor = (tag: string) => {
    const colors = [
      'bg-blue-500/10 text-blue-400 border-blue-500/20',
      'bg-purple-500/10 text-purple-400 border-purple-500/20',
      'bg-pink-500/10 text-pink-400 border-pink-500/20',
      'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    ];
    const index = tag.length % colors.length;
    return colors[index];
  };

  const activeFiltersCount = selectedTags.length + selectedDifficulty.length + (searchQuery.trim() ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Question Bank</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredQuestions.length} of {questions.length} questions
            {activeFiltersCount > 0 && ` (${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} applied)`}
          </p>
        </div>
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant={showFilters ? 'primary' : 'secondary'}
          className="flex items-center space-x-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-primary-foreground/20 text-primary-foreground px-2 py-0.5 rounded-full text-xs">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-lg border p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search questions, tags, platforms, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="space-y-4 pt-4 border-t border-border">
            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Sort By</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'date', label: 'Recent First' },
                  { value: 'difficulty', label: 'Difficulty' },
                  { value: 'title', label: 'Title A-Z' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value as any)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
                      sortBy === option.value
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-muted-foreground border-border hover:bg-accent'
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {DIFFICULTY_LEVELS.map(difficulty => (
                  <button
                    key={difficulty}
                    onClick={() => toggleDifficulty(difficulty)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
                      selectedDifficulty.includes(difficulty)
                        ? getDifficultyColor(difficulty)
                        : 'bg-background text-muted-foreground border-border hover:bg-accent'
                    )}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
                      selectedTags.includes(tag)
                        ? getTagColor(tag)
                        : 'bg-background text-muted-foreground border-border hover:bg-accent'
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex justify-end pt-2">
                <Button onClick={clearFilters} variant="secondary" className="text-sm">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{questions.length}</div>
            <div className="text-sm text-muted-foreground">Total Questions</div>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {questions.filter(q => q.difficulty === 'Easy').length}
            </div>
            <div className="text-sm text-muted-foreground">Easy</div>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {questions.filter(q => q.difficulty === 'Medium').length}
            </div>
            <div className="text-sm text-muted-foreground">Medium</div>
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">
              {questions.filter(q => q.difficulty === 'Hard').length}
            </div>
            <div className="text-sm text-muted-foreground">Hard</div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <QuestionList 
        questions={filteredQuestions} 
        title={`${filteredQuestions.length} Question${filteredQuestions.length !== 1 ? 's' : ''}`}
      />
    </div>
  );
}