import { createContext, useContext, useState, ReactNode } from "react";

interface Answer {
  phase: string;
  question: number;
  answer: string;
  correctAnswer?: string;
}

interface ReportContextType {
  answers: Answer[];
  addAnswer: (answer: Answer) => void;
  clearAnswers: () => void;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export function ReportProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const addAnswer = (answer: Answer) => {
    setAnswers(prev => [...prev, answer]);
  };

  const clearAnswers = () => {
    setAnswers([]);
  };

  return (
    <ReportContext.Provider value={{ answers, addAnswer, clearAnswers }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReport() {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReport must be used within ReportProvider");
  }
  return context;
}
