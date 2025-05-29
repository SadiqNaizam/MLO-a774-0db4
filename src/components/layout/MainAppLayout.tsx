import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header'; // Relative import for the Header component

interface MainAppLayoutProps {
  children: React.ReactNode; // Content to be rendered within the main layout
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-start items-center min-h-screen',
        'bg-background text-foreground', // Base application background and text color
        className
      )}
    >
      <Header />
      <main
        className={cn(
          // Sizing and positioning for the main content area
          'flex-1 w-full max-w-2xl mx-auto px-6 mt-16', // mt-16 to offset fixed h-16 header
          // Vertical padding for content within the main area
          'py-6 md:py-8',
          // Layout for direct children of the main content area
          'flex flex-col gap-6' 
        )}
      >
        {children}
      </main>
      {/* Footer is specified as hidden in layoutRequirements.overall.sizing.footer */}
    </div>
  );
};

export default MainAppLayout;
