import React, { useState } from "react";
import {
  Video,
  Image,
  Headphones,
  FileText,
  //Podcast,
  Wand2,
  Sparkles,
  BookOpen,
  Target,
  Brain,
  Clock,
  Users,
} from "lucide-react";
import ReviewCourse from "./ReviewCourse";
import { motion } from "framer-motion";

const formatOptions = [
  {
    icon: Video,
    label: "Video Lessons",
    id: "video",
    description: "Engaging video content with demonstrations",
  },
  {
    icon: Image,
    label: "Visual Learning",
    id: "images",
    description: "Rich imagery and infographics",
  },
  {
    icon: Headphones,
    label: "Audio Content",
    id: "audio",
    description: "Podcasts and audio lessons",
  },
  {
    icon: FileText,
    label: "Text Materials",
    id: "text",
    description: "Comprehensive reading materials",
  },
  //{
  //  icon: Podcast,
  //  label: "Interactive Sessions",
  //  id: "podcast",
  //  description: "Live sessions and recordings",
  //},
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

export default function CourseCreator() {
  const [selectedFormats, setSelectedFormats] = useState<string[]>(["video"]);
  const [courseDescription, setCourseDescription] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [reviewCourse, setReviewCourse] = useState(false);

  const toggleFormat = (formatId: string) => {
    setSelectedFormats((prev) =>
      prev.includes(formatId)
        ? prev.filter((f) => f !== formatId)
        : [...prev, formatId]
    );
  };

  const handleSubmit = () => {
    console.log("Generating course...");
    setActiveStep(3);
    setReviewCourse(true);
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 3) {
      setActiveStep(step);
    }
  };

  return reviewCourse ? (
    <ReviewCourse setReviewCourse={setReviewCourse} />
  ) : (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create Your Dream Course
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Transform your knowledge into an engaging learning experience. Our
          AI-powered platform helps you create professional courses in minutes.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-12 relative">
        <div className="absolute left-0 top-1/2 h-1 bg-gray-200 w-full -translate-y-1/2 z-0" />
        <div
          className="absolute left-0 top-1/2 h-1 bg-indigo-600 transition-all duration-300"
          style={{ width: `${(activeStep - 1) * 50}%` }}
        />
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className="relative z-10 flex flex-col items-center"
            role="button"
            style={{ cursor: "pointer" }}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step <= activeStep
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step === 1 ? (
                <Target className="h-5 w-5" />
              ) : step === 2 ? (
                <Brain className="h-5 w-5" />
              ) : (
                <BookOpen className="h-5 w-5" />
              )}
            </div>
            <span className="mt-2 text-sm font-medium text-gray-600">
              {step === 1
                ? "Basic Info"
                : step === 2
                ? "Content Format"
                : "Review & Generate"}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Course Stats Preview */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="grid grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 opacity-75" />
              <div>
                <p className="text-sm opacity-75">Estimated Duration</p>
                <p className="font-semibold">4-6 weeks</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 opacity-75" />
              <div>
                <p className="text-sm opacity-75">Max Total Modules</p>
                <p className="font-semibold">12 Lessons</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 opacity-75" />
              <div>
                <p className="text-sm opacity-75">Target Audience</p>
                <p className="font-semibold">Beginner - Senior</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-8">
            {/* Content Format Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formatOptions.map(({ icon: Icon, label, id, description }) => (
                <button
                  key={id}
                  onClick={() => {
                    toggleFormat(id);
                    goToStep(2);
                  }}
                  className={`flex items-start space-x-4 p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                    selectedFormats.includes(id)
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 hover:border-indigo-200 text-gray-600"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      selectedFormats.includes(id)
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold mb-1">{label}</h3>
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Course Description */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Course Description
              </label>
              <div className="relative">
                <textarea
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  placeholder="Describe your course content, objectives, and target audience. Our AI will help structure it perfectly..."
                  className="w-full h-48 p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
                <div className="absolute bottom-4 right-4 flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {courseDescription.length}/1000
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] duration-300 flex items-center justify-center space-x-3"
            >
              <Wand2 className="h-6 w-6" />
              <span className="text-lg font-semibold">
                Generate Course Structure
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
