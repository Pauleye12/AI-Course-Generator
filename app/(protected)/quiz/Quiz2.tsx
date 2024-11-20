import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Timer,
} from "lucide-react";
import { getCourses, getQuestionsByCourseID } from "@/lib/services";
import { coursesType, questions } from "@/lib/types";
import QuizSelector from "./QuizSelector";

import ResultsModal from "./Resultmodal";

// Types

// interface Course {
//   id: string;
//   title: string;
//   description: string;
//   duration: string;
//   questionCount: number;
// }

// Mock courses data
// const courses: Course[] = [
//   {
//     id: "ml-basics",
//     title: "Machine Learning Fundamentals",
//     description: "Test your knowledge of basic ML concepts and algorithms",
//     duration: "15 mins",
//     questionCount: 10,
//   },
//   {
//     id: "web-dev",
//     title: "Web Development",
//     description: "Challenge yourself with web development concepts",
//     duration: "20 mins",
//     questionCount: 15,
//   },
//   {
//     id: "ui-design",
//     title: "UI/UX Design",
//     description: "Evaluate your understanding of design principles",
//     duration: "10 mins",
//     questionCount: 8,
//   },
// ];

// Mock questions generator based on course

export default function QuizInterface() {
  // State management
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<questions[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [courses, setCourses] = useState<coursesType[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleAnswerSelect(-1); // Auto-submit when time runs out
    }
    return () => clearInterval(timer);
  }, [timeLeft, quizStarted]);

  useEffect(() => {
    const fetchData = async () => {
      const NewCourses = await getCourses();

      setCourses(NewCourses);
    };
    fetchData();
  }, []);

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
  };

  const startQuiz = async () => {
    if (!selectedCourseId) return;
    const courseQuestions = await getQuestionsByCourseID(selectedCourseId);
    setQuestions(courseQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setQuizStarted(true);
    setStartTime(new Date());
  };

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
    } else {
      setShowResults(true);
    }
  };

  const calculateTimeSpent = (): string => {
    if (!startTime) return "0 mins";
    const endTime = new Date();
    const diffInMinutes = Math.round(
      (endTime.getTime() - startTime.getTime()) / 60000
    );
    return `${diffInMinutes} mins`;
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setShowResults(false);
    setSelectedCourseId(null);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setTimeLeft(30);
    setStartTime(null);
  };

  if (!quizStarted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <QuizSelector
          courses={courses}
          onSelectCourse={handleCourseSelect}
          onStartQuiz={startQuiz}
          selectedCourseId={selectedCourseId}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Module Quiz</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Timer className="h-5 w-5" />
            <span>{timeLeft}s</span>
          </div>
          <div className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg">
            Score: {score}/{questions.length}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {currentQuestion + 1}. {questions[currentQuestion].question}
          </h3>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  selectedAnswer === null
                    ? "hover:bg-indigo-50 border-2 border-gray-200"
                    : selectedAnswer === index
                    ? index === questions[currentQuestion].correctAnswer
                      ? "bg-green-50 border-2 border-green-500"
                      : "bg-red-50 border-2 border-red-500"
                    : index === questions[currentQuestion].correctAnswer
                    ? "bg-green-50 border-2 border-green-500"
                    : "border-2 border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {selectedAnswer !== null && (
                    <>
                      {index === questions[currentQuestion].correctAnswer ? (
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

        {selectedAnswer !== null && (
          <button
            onClick={nextQuestion}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center space-x-2"
          >
            <span>
              {currentQuestion < questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </span>
            <ArrowRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {showResults && (
        <ResultsModal
          score={score}
          totalQuestions={questions.length}
          timeSpent={calculateTimeSpent()}
          onClose={resetQuiz}
          onRetry={() => {
            setShowResults(false);
            startQuiz();
          }}
        />
      )}
    </div>
  );
}
