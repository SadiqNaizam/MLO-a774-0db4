import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

export type TagSelection = 'relevant' | 'non-relevant' | null;

interface TagControlsProps {
  selection: TagSelection;
  onSelectionChange: (newSelection: TagSelection) => void;
  baseId: string;
}

const TagControls: React.FC<TagControlsProps> = ({
  selection,
  onSelectionChange,
  baseId,
}) => {

  const handleRelevantChange = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      onSelectionChange('relevant');
    } else {
      // Only change to null if 'relevant' was the one being unchecked
      if (selection === 'relevant') {
        onSelectionChange(null);
      }
    }
  };

  const handleNonRelevantChange = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      onSelectionChange('non-relevant');
    } else {
      // Only change to null if 'non-relevant' was the one being unchecked
      if (selection === 'non-relevant') {
        onSelectionChange(null);
      }
    }
  };

  // Styling consistent with image: white-ish square border, primary color checkmark, transparent background on check.
  const checkboxStyle = cn(
    "h-6 w-6 shrink-0 rounded-sm border-2 border-card-foreground/80",
    "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "data-[state=checked]:bg-transparent data-[state=checked]:text-primary data-[state=checked]:border-card-foreground/80"
  );

  return (
    <>
      {/* These divs are grid items in QuestionCard, ensuring alignment under column headers */}
      <div className="flex justify-center"> 
        <Checkbox
          id={`${baseId}-relevant`}
          checked={selection === 'relevant'}
          onCheckedChange={handleRelevantChange}
          className={checkboxStyle}
          aria-label="Relevant"
        />
      </div>
      <div className="flex justify-center">
        <Checkbox
          id={`${baseId}-non-relevant`}
          checked={selection === 'non-relevant'}
          onCheckedChange={handleNonRelevantChange}
          className={checkboxStyle}
          aria-label="Non-Relevant"
        />
      </div>
    </>
  );
};

export default TagControls;
