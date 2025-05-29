import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface NotesInputAreaProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string; // Placeholder for the textarea input itself
  label?: string; // Optional label override
  className?: string;
  rows?: number;
}

const NotesInputArea: React.FC<NotesInputAreaProps> = ({
  value,
  onChange,
  placeholder = "Type your comments here...",
  label = "Screener Notes / Comments:",
  className,
  rows = 5,
}) => {
  const textareaId = React.useId(); // Generate unique ID for label association

  return (
    <div className={cn("w-full space-y-2 py-4", className)}>
      <Label htmlFor={textareaId} className="font-semibold text-base text-card-foreground">
        {label}
      </Label>
      <Textarea
        id={textareaId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "w-full min-h-[80px] rounded-md border border-border bg-background p-3 text-sm", 
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "text-card-foreground placeholder:text-muted-foreground"
        )}
      />
    </div>
  );
};

export default NotesInputArea;
