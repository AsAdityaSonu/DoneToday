'use client';

import { useState, useCallback, memo } from 'react';
import { X, Plus, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Question, QuestionTag } from '@/types';

interface QuestionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (question: Omit<Question, 'id' | 'completedAt'>) => void;
}

const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'] as const;
const TAG_OPTIONS: QuestionTag[] = [
  'Array', 'String', 'LinkedList', 'Tree', 'Graph', 'DynamicProgramming',
  'Greedy', 'Backtracking', 'BinarySearch', 'TwoPointers', 'SlidingWindow',
  'Stack', 'Queue', 'Heap', 'Sorting', 'Math', 'BitManipulation'
];

const QuestionForm = memo(function QuestionForm({ isOpen, onClose, onSubmit }: QuestionFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    difficulty: 'Medium' as const,
    tags: [] as string[],
    approach: '',
    solution: '',
    notes: '',
    timeSpent: '',
    platform: 'LeetCode'
  });

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSubmit({
      title: formData.title,
      difficulty: formData.difficulty,
      tags: formData.tags,
      approach: formData.approach || undefined,
      solution: formData.solution || undefined,
      notes: formData.notes || undefined,
      timeSpent: formData.timeSpent ? parseInt(formData.timeSpent) : undefined,
      platform: formData.platform || undefined,
    });

    // Reset form
    setFormData({
      title: '',
      difficulty: 'Medium',
      tags: [],
      approach: '',
      solution: '',
      notes: '',
      timeSpent: '',
      platform: 'LeetCode'
    });
    onClose();
  }, [formData, onSubmit, onClose]);

  const toggleTag = useCallback((tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  }, []);

  const updateField = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Add New Question</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Question Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              placeholder="e.g., Two Sum, Binary Tree Inorder Traversal"
              required
            />
          </div>

          {/* Difficulty and Platform */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => updateField('difficulty', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              >
                {DIFFICULTY_OPTIONS.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Platform
              </label>
              <input
                type="text"
                value={formData.platform}
                onChange={(e) => updateField('platform', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                placeholder="LeetCode, HackerRank, etc."
              />
            </div>
          </div>

          {/* Time Spent */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Clock className="inline h-4 w-4 mr-1" />
              Time Spent (minutes)
            </label>
            <input
              type="number"
              value={formData.timeSpent}
              onChange={(e) => updateField('timeSpent', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              placeholder="30"
              min="1"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {TAG_OPTIONS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    formData.tags.includes(tag)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Approach */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Approach (Optional)
            </label>
            <textarea
              value={formData.approach}
              onChange={(e) => updateField('approach', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              rows={3}
              placeholder="Describe your approach to solving this problem..."
            />
          </div>

          {/* Solution */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Solution Code (Optional)
            </label>
            <textarea
              value={formData.solution}
              onChange={(e) => updateField('solution', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-mono text-sm"
              rows={4}
              placeholder="// Your solution code here..."
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              rows={2}
              placeholder="Any additional notes or learnings..."
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Question
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default QuestionForm;