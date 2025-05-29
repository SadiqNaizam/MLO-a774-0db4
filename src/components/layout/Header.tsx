import React from 'react';
import { cn } from '@/lib/utils';
// import { Settings } from 'lucide-react'; // Example: Uncomment if settings icon is needed
// import { Button } from '@/components/ui/button'; // Example: Uncomment if Button component is used for actions

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(
        'h-16 fixed top-0 left-0 w-full z-10', // Sizing & Position from layoutRequirements
        'flex items-center justify-between px-6', // Layout from layoutRequirements.header
        'bg-card text-card-foreground', // Theme colors (maps to bg-surface, text-primaryText)
        'border-b border-border', // Common practice for visual separation of fixed header
        className
      )}
    >
      <div className="flex items-baseline gap-3"> {/* Using items-baseline for better text alignment across different font sizes/weights */}
        <span className="text-xl font-bold tracking-wide text-primary">
          ASCENDION
        </span>
        <h1 className="text-lg font-semibold text-card-foreground">
          AI Quotient (AIQ) Assessment
        </h1>
      </div>
      <div className="flex items-center space-x-2">
        {/* Placeholder for future action items like settings, user profile, theme toggle, etc. */}
        {/* Example of a settings button:
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
        */}
      </div>
    </header>
  );
};

export default Header;
