import { Brain } from "lucide-react";

export interface coursesType {
  title: string;
  id: number;
  category: string;
  level: string;
  rating: number;
  duration: string;
  progress: number;
  timeLeft: string;
  topics: number;
  contentFormat: string;
  image: string;
}

export interface metrics {
  icon: typeof Brain;
  label: string;
  value: string;
  trend: string;
  color: string;
}

export interface prompts {
  id: string;
  date: Date;
  promptMessage: string;
  courseFormat: string;
}
