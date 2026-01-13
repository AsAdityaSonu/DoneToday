'use client';

import { useState } from 'react';
import { Clock, ExternalLink, ChevronDown, ChevronRight, Code, FileText } from 'lucide-react';
import { Question } from '@/types';
import { cn } from '@/lib/utils';

interface QuestionListProps {
  questions: Question[];
  title?: string;
}

export default function QuestionList({ questions, title = "Recent Questions" }: QuestionListProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const toggleExpanded = (questionId: string) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/10';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'Hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  if (questions.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
        <div className="text-center py-8 text-muted-foreground">
          <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No questions completed yet.</p>
          <p className="text-sm">Start solving problems to build your streak!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{questions.length} questions completed</p>
      </div>
      
      <div className="divide-y divide-border">
        {questions.map((question) => {
          const isExpanded = expandedQuestions.has(question.id);
          
          return (
            <div key={question.id} className="p-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleExpanded(question.id)}
              >
                <div className="flex items-center space-x-3 flex-1">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{question.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getDifficultyColor(question.difficulty)
                      )}>
                        {question.difficulty}
                      </span>
                      
                      {question.platform && (
                        <span className="text-xs text-muted-foreground">
                          {question.platform}
                        </span>
                      )}
                      
                      {question.timeSpent && (
                        <span className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {question.timeSpent}m
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex flex-wrap gap-1">
                    {question.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-accent text-accent-foreground rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {question.tags.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                        +{question.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {isExpanded && (
                <div className="mt-4 ml-7 space-y-4">
                  {/* All Tags */}
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">Tags</h5>
                    <div className="flex flex-wrap gap-1">
                      {question.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-accent text-accent-foreground rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Approach */}
                  {question.approach && (
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2 flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        Approach
                      </h5>
                      <div className="bg-muted rounded-lg p-3 text-sm text-muted-foreground">
                        {question.approach}
                      </div>
                    </div>
                  )}
                  
                  {/* Solution */}
                  {question.solution && (
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2 flex items-center">
                        <Code className="h-4 w-4 mr-1" />
                        Solution
                      </h5>
                      <div className="bg-muted rounded-lg p-3 text-sm font-mono text-muted-foreground overflow-x-auto">
                        <pre>{question.solution}</pre>
                      </div>
                    </div>
                  )}
                  
                  {/* Notes */}
                  {question.notes && (
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2">Notes</h5>
                      <div className="bg-muted rounded-lg p-3 text-sm text-muted-foreground">
                        {question.notes}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs text-muted-foreground">
                    Completed on {question.completedAt.toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}