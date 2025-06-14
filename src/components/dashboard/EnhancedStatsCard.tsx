
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedStatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  description?: string;
  gradient?: string;
}

export const EnhancedStatsCard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  description,
  gradient = 'from-blue-500 to-purple-600'
}: EnhancedStatsCardProps) => {
  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer">
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-300",
        gradient
      )} />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn(
          "h-8 w-8 rounded-lg flex items-center justify-center bg-gradient-to-br text-white shadow-sm",
          gradient
        )}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold animate-fade-in">
              {value}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          
          {change && (
            <Badge 
              variant={changeType === 'positive' ? 'default' : changeType === 'negative' ? 'destructive' : 'secondary'}
              className="animate-scale-in"
            >
              {change}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
