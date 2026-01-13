import { Target, TrendingUp, Calendar, Award } from 'lucide-react';
import Card, { CardContent } from '@/components/ui/Card';
import { StreakStats } from '@/types';

interface StatsCardsProps {
  stats: StreakStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Current Streak',
      value: stats.currentStreak,
      unit: 'days',
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      title: 'Total Questions',
      value: stats.totalQuestions,
      unit: 'solved',
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
    {
      title: 'Longest Streak',
      value: stats.longestStreak,
      unit: 'days',
      icon: Award,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
    {
      title: 'Daily Average',
      value: stats.averagePerDay.toFixed(1),
      unit: 'questions',
      icon: Calendar,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <div className="flex items-baseline space-x-1">
                    <p className="text-2xl font-bold text-foreground">
                      {card.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {card.unit}
                    </p>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${card.bgColor}`}>
                  <Icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}