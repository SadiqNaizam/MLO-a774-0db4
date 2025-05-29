import React from 'react';
import { cn } from '@/lib/utils';
import TagControls, { TagSelection } from './TagControls';

export interface Question {
  id: string;
  number: string;
  text: string;
  hint?: string;
}

interface QuestionCardProps {
  question: Question;
  tagStatus: TagSelection;
  onTagStatusChange: (questionId: string, newStatus: TagSelection) => void;
  className?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  tagStatus,
  onTagStatusChange,
  className,
}) => {
  const { id, number, text, hint } = question;

  const handleSelectionChange = (newSelection: TagSelection) => {
    onTagStatusChange(id, newSelection);
  };

  return (
    <div
      className={cn(
        // Using specific theme spacing for checkbox columns to align with potential headers
        "grid grid-cols-[theme(spacing.12)_1fr_theme(spacing.24)_theme(spacing.28)] items-center gap-x-4 py-4 border-b border-border last:border-b-0",
        "text-card-foreground",
        className
      )}
    >
      <div className="text-2xl font-semibold text-primary self-start pt-0.5">{number}</div>
      
      <div>
        <p className="text-base font-medium">{text}</p>
        {hint && <p className="text-sm text-muted-foreground mt-1">{hint}</p>}
      </div>

      {/* TagControls returns two elements in a fragment; grid places them in the 3rd and 4th columns */}
      <TagControls
        baseId={id}
        selection={tagStatus}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  );
};

export default QuestionCard;
