'use client';

import { useState, memo } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Target, 
  BookOpen, 
  Settings, 
  TrendingUp,
  X,
  Code2
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: 'Dashboard', icon: BarChart3, active: true, enabled: true, href: '#' },
  { name: 'Today\'s Progress', icon: Target, active: false, enabled: false, href: '#' },
  { name: 'Calendar View', icon: Calendar, active: false, enabled: false, href: '#' },
  { name: 'Question Bank', icon: BookOpen, active: false, enabled: false, href: '#' },
  { name: 'Analytics', icon: TrendingUp, active: false, enabled: false, href: '#' },
  { name: 'Settings', icon: Settings, active: false, enabled: false, href: '#' },
];

const Sidebar = memo(function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-72 bg-card/95 backdrop-blur-xl border-r border-border/50 transform transition-all duration-300 ease-out z-50 shadow-2xl overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:shadow-none lg:bg-card lg:backdrop-blur-none lg:flex-shrink-0
      `}>
        {/* Header */}
        <div className="p-6 border-b border-border/50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">DoneToday</h2>
                <p className="text-xs text-muted-foreground">Track & Improve</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="p-4 flex-1">
          <div className="mb-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Navigation
            </p>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className={`
                      group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200
                      ${item.active && item.enabled
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                        : item.enabled
                        ? 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground cursor-pointer'
                        : 'text-muted-foreground/40 cursor-not-allowed'
                      }
                    `}
                    onClick={item.enabled ? undefined : (e) => e.preventDefault()}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`
                        p-1.5 rounded-lg transition-colors
                        ${item.active && item.enabled
                          ? 'bg-primary-foreground/20' 
                          : 'group-hover:bg-accent/30'
                        }
                      `}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                    {!item.enabled && (
                      <span className="text-[10px] bg-muted-foreground/10 text-muted-foreground/60 px-2 py-0.5 rounded-full font-medium">
                        Soon
                      </span>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Quick Stats */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
              Quick Stats
            </p>
            <div className="space-y-3">
              <div className="bg-accent/20 rounded-xl p-3 border border-border/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Current Streak</span>
                  <span className="text-sm font-bold text-foreground">7 days</span>
                </div>
                <div className="mt-2 bg-primary/20 rounded-full h-1.5">
                  <div className="bg-primary rounded-full h-1.5 w-3/4"></div>
                </div>
              </div>
              
              <div className="bg-accent/20 rounded-xl p-3 border border-border/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">This Week</span>
                  <span className="text-sm font-bold text-foreground">12 solved</span>
                </div>
                <div className="mt-2 bg-green-500/20 rounded-full h-1.5">
                  <div className="bg-green-500 rounded-full h-1.5 w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Sidebar;