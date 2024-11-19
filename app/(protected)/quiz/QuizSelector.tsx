import React from "react";
import { Book, Brain, Clock } from "lucide-react";
import { coursesType } from "@/lib/types";

// interface Course {
//   id: string;
//   title: string;
//   description: string;
//   duration: string;
//   questionCount: number;
// }

interface QuizSelectorProps {
  courses: coursesType[];
  onSelectCourse: (courseId: number) => void;
  onStartQuiz: () => void;
  selectedCourseId: number | null;
}

export default function QuizSelector({
  courses,
  onSelectCourse,
  onStartQuiz,
  selectedCourseId,
}: QuizSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Choose a Course</h2>
        <p className="text-gray-600 mt-2">
          Select the course you want to be quizzed on
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => onSelectCourse(course.id)}
            className={`p-6 rounded-xl text-left transition-all ${
              selectedCourseId === course.id
                ? "bg-indigo-50 border-2 border-indigo-500"
                : "bg-white border-2 border-gray-100 hover:border-indigo-200"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.category}</p>
              </div>
              <Book
                className={`h-5 w-5 ${
                  selectedCourseId === course.id
                    ? "text-indigo-500"
                    : "text-gray-400"
                }`}
              />
            </div>
            <div className="mt-4 flex items-center space-x-4 text-sm">
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                {course.duration}
              </div>
              <div className="flex items-center text-gray-600">
                <Brain className="h-4 w-4 mr-1" />
                {course.questions.length} questions
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onStartQuiz}
          disabled={!selectedCourseId}
          className={`px-8 py-3 rounded-lg font-medium transition-all ${
            selectedCourseId
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
