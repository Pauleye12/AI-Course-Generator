export interface coursesType {
  title: string;
  id: number;
  category: string;
  level: string;
  rating: number;
  duration: string;
  progress: number;
  timeLeft: string;
  active: boolean;
  topics: number;
  contentFormat: string;
  image: string;
  modules: moduleType[];
  questions: questions[];
}

export interface categoryType {
  id: number;
  name: string;
}

export interface questions {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface moduleType {
  id: number;
  title: string;
  duration: string;
  topics: string[];
}

export interface metrics {
  icon: string;
  label: string;
  value: string;
  trend: string;
  color: string;
}

export interface ResultsModalProps {
  score: number;
  totalQuestions: number;
  timeSpent: string;
  onClose: () => void;
  onRetry: () => void;
}

export interface prompts {
  id: string;
  date: Date;
  promptMessage: string;
  courseFormat: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  startTime: Date;
  endTime?: Date;
  title: string; // Generated from the first few messages
}
