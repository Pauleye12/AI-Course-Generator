import React from "react";
import { Trophy, X, BarChart3, Clock, Award } from "lucide-react";
import { ResultsModalProps } from "@/lib/types";

export default function ResultsModal({
  score,
  totalQuestions,
  timeSpent,
  onClose,
  onRetry,
}: ResultsModalProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
            <Trophy className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Quiz Completed!</h2>
          <p className="text-gray-600 mt-1">Here&apos;s how you performed</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Award className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-600">Score</span>
            </div>
            <span className="font-semibold text-gray-900">{percentage}%</span>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-600">Correct Answers</span>
            </div>
            <span className="font-semibold text-gray-900">
              {score}/{totalQuestions}
            </span>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-indigo-600" />
              <span className="text-gray-600">Time Spent</span>
            </div>
            <span className="font-semibold text-gray-900">{timeSpent}</span>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onRetry}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border-2 border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    </div>
  );
}
