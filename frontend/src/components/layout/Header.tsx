import { Code2, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">DSA Streak</h1>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Dashboard</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Today:</span>
              <span className="font-medium text-foreground">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}