import React, { useState, useEffect, useCallback } from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import QuestionCard, { Question } from '../components/Assessment/QuestionCard';
import { TagSelection } from '../components/Assessment/TagControls';
import AIQScoreDisplay, { AIQLevel } from '../components/Assessment/AIQScoreDisplay';
import NotesInputArea from '../components/Assessment/NotesInputArea';
// cn utility is not strictly needed here as classNames are static, but can be added if preferred for consistency.
// import { cn } from '../lib/utils';

// Define the structure for each question
// Re-exporting Question interface here for clarity, though it's imported from QuestionCard
export type { Question };

const DUMMY_QUESTIONS: Question[] = [
  {
    id: 'q1',
    number: '01',
    text: "Tell me about a time when you adopted a new technology or tool on your own. What motivated you, and what was the result?",
    hint: "(Looks for curiosity and initiative)",
  },
  {
    id: 'q2',
    number: '02',
    text: "How do you stay up to date with new trends or tools in your field? Have you come across anything AI-related?",
    hint: "(Assesses awareness and interest)",
  },
  {
    id: 'q3',
    number: '03',
    text: "Have you experimented with any AI tools, even casually? (e.g., ChatGPT, image generators, automation bots)",
    hint: "(Gauges willingness to experiment)",
  },
  {
    id: 'q4',
    number: '04',
    text: "Can you think of a repetitive or time-consuming task in your role that could benefit from automation or AI?",
    hint: "(Tests ability to identify practical AI opportunities)",
  },
  {
    id: 'q5',
    number: '05',
    text: "Tell me about a time you had to change your way of working because of a new process or tool. How did you respond?",
    hint: "(Evaluates adaptability)",
  },
  {
    id: 'q6',
    number: '06',
    text: "Can you open an AI tool of your choice and show me how you would use it to solve something or get a result? Pls walk me through the process, step by step",
    // No explicit hint in OCR for Q6, adding a generic one or could be omitted.
    hint: "(Assesses practical application and problem-solving skills)", 
  },
];

// Initial tag statuses based on the provided image for demonstration purposes.
const INITIAL_TAG_STATUSES: Record<string, TagSelection> = {
  'q1': 'relevant' as const,
  'q2': 'non-relevant' as const,
  'q3': 'relevant' as const,
  'q4': 'non-relevant' as const,
  'q5': 'relevant' as const,
  'q6': 'non-relevant' as const,
};

const EvaluationPage: React.FC = () => {
  const [tagStatuses, setTagStatuses] = useState<Record<string, TagSelection>>(INITIAL_TAG_STATUSES);
  const [aiqLevel, setAiqLevel] = useState<AIQLevel | null>(null);
  const [screenerNotes, setScreenerNotes] = useState<string>('');

  const handleTagStatusChange = useCallback((questionId: string, newStatus: TagSelection) => {
    setTagStatuses(prevStatuses => ({
      ...prevStatuses,
      [questionId]: newStatus,
    }));
  }, []);

  useEffect(() => {
    const relevantCount = Object.values(tagStatuses).filter(status => status === 'relevant').length;
    
    // AIQ Level Calculation Logic (example):
    // 0-1 relevant questions: Low
    // 2-3 relevant questions: Medium
    // 4+ relevant questions: High
    if (relevantCount <= 1) {
      setAiqLevel('Low');
    } else if (relevantCount >= 2 && relevantCount <= 3) { // Explicitly 2-3 for Medium
      setAiqLevel('Medium');
    } else if (relevantCount >= 4) { // Explicitly 4+ for High
      setAiqLevel('High');
    } else { // Default or if logic needs refinement for edge cases (e.g. 0 relevant)
      setAiqLevel('Low'); 
    }
  }, [tagStatuses]);

  return (
    <MainAppLayout>
      {/* Main content card for the assessment, matches layoutRequirements.mainContent.container */}
      <div className="p-6 bg-card text-card-foreground rounded-md shadow-md w-full">
        <h2 className="text-center text-lg font-medium text-muted-foreground mb-6">
          SCREENING AI-FRIENDLY TALENT
        </h2>

        {/* Question List Header aligned with QuestionCard grid */}
        <div 
          className="grid grid-cols-[theme(spacing.12)_1fr_theme(spacing.24)_theme(spacing.28)] items-center gap-x-4 pb-3 border-b border-border text-sm font-semibold text-card-foreground mb-1"
        >
          <div /> {/* Placeholder for Question Number column */}
          <div>{/* Placeholder for Question Text column (or can add a title like 'Question Details') */}</div>
          <div className="text-center">Relevant</div>
          <div className="text-center">Non-Relevant</div>
        </div>
        
        {/* Questions List */}
        <div> {/* Wrapper for questions to ensure correct border handling by QuestionCard's last:border-b-0 */}
          {DUMMY_QUESTIONS.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              tagStatus={tagStatuses[question.id] || null}
              onTagStatusChange={handleTagStatusChange}
            />
          ))}
        </div>

        <AIQScoreDisplay 
          level={aiqLevel} 
          className="pt-6 mt-4 border-t border-border" 
        />

        <NotesInputArea 
          value={screenerNotes} 
          onChange={setScreenerNotes} 
          className="pt-6 mt-4 border-t border-border" 
          placeholder="Enter screener notes, observations, and qualitative feedback here..."
        />
      </div>
    </MainAppLayout>
  );
};

export default EvaluationPage;
