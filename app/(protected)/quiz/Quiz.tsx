import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Timer,
} from "lucide-react";
import { motion } from "framer-motion";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const demoQuestions: Question[] = [
  {
    id: 1,
    question:
      "What is the primary purpose of supervised learning in machine learning?",
    options: [
      "To learn from unlabeled data",
      "To predict outcomes based on labeled training data",
      "To cluster similar data points",
      "To reduce dimensionality of data",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Which of the following is NOT a type of machine learning?",
    options: [
      "Supervised Learning",
      "Reinforcement Learning",
      "Predictive Learning",
      "Unsupervised Learning",
    ],
    correctAnswer: 2,
  },
];

const pageVariants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      type: "spring",
      bounce: 0.3,
    },
  },
  initial: {
    opacity: 0,
    x: "100%",
  },
};

export default function QuizInterface() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === demoQuestions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < demoQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="visible"
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Module Quiz</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Timer className="h-5 w-5" />
            <span>{timeLeft}s</span>
          </div>
          <div className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg">
            Score: {score}/{demoQuestions.length}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {currentQuestion + 1}. {demoQuestions[currentQuestion].question}
          </h3>

          <div className="space-y-3">
            {demoQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                  selectedAnswer === null
                    ? "hover:bg-indigo-50 border-2 border-gray-200"
                    : selectedAnswer === index
                    ? index === demoQuestions[currentQuestion].correctAnswer
                      ? "bg-green-50 border-2 border-green-500"
                      : "bg-red-50 border-2 border-red-500"
                    : index === demoQuestions[currentQuestion].correctAnswer
                    ? "bg-green-50 border-2 border-green-500"
                    : "border-2 border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {selectedAnswer !== null && (
                    <>
                      {index ===
                      demoQuestions[currentQuestion].correctAnswer ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : selectedAnswer === index ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : null}
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {showExplanation && (
          <div className="bg-indigo-50 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-indigo-600 mt-1" />
              <div>
                <h4 className="font-semibold text-indigo-900 mb-2">
                  Explanation
                </h4>
                <p className="text-indigo-800">
                  The correct answer helps you understand the fundamental
                  concept. This explanation provides additional context and
                  helps reinforce your learning.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedAnswer !== null &&
          currentQuestion < demoQuestions.length - 1 && (
            <button
              onClick={nextQuestion}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center space-x-2"
            >
              <span>Next Question</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
      </div>
    </motion.div>
  );
}
