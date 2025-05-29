import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export type AIQLevel = 'High' | 'Medium' | 'Low';

interface AIQScoreDisplayProps {
  level: AIQLevel | null;
  className?: string;
}

const AIQScoreDisplay: React.FC<AIQScoreDisplayProps> = ({ level, className }) => {
  const levels: { value: AIQLevel; label: string }[] = [
    { value: 'High' as const, label: 'High' },
    { value: 'Medium' as const, label: 'Medium' },
    { value: 'Low' as const, label: 'Low' },
  ];

  const checkboxStyle = cn(
    "h-5 w-5 shrink-0 rounded-sm border-2 border-card-foreground/80",
    "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "data-[state=checked]:bg-transparent data-[state=checked]:text-primary data-[state=checked]:border-card-foreground/80",
    "cursor-default" // Visually indicate non-interactivity
  );

  return (
    <div className={cn("py-4 text-card-foreground", className)}>
      <div className="grid grid-cols-[max-content_1fr] items-start gap-x-2 sm:gap-x-4">
        <p className="font-semibold text-base whitespace-nowrap shrink-0 pt-0.5">AIQ Level:</p>
        
        <div className="flex flex-col">
          <div className="flex items-center space-x-3 sm:space-x-4 flex-wrap">
            {levels.map(({ value, label }) => (
              <div key={value} className="flex items-center space-x-1.5 sm:space-x-2">
                <Checkbox
                  id={`aiq-${value.toLowerCase()}`}
                  checked={level === value}
                  className={checkboxStyle}
                  aria-readonly={true} // Indicates it's not meant to be interactive by user
                  tabIndex={-1} // Remove from tab order as it's display-only
                />
                <Label
                  htmlFor={`aiq-${value.toLowerCase()}`}
                  className="text-sm font-medium cursor-default"
                >
                  {label}
                </Label>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            (Auto calculated using above inputs)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIQScoreDisplay;
