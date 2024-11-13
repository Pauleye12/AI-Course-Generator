import React, { useState } from "react";
import {
  GripVertical,
  Clock,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { prompts } from "@/lib/types";

// Dummy data for demonstration
const initialPlan = {
  title: "Advanced Machine Learning Fundamentals",
  estimatedDuration: "6 weeks",
  modules: [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      duration: "1 week",
      topics: [
        "What is Machine Learning?",
        "Types of Machine Learning",
        "Common Applications and Use Cases",
      ],
    },
    {
      id: 2,
      title: "Supervised Learning Algorithms",
      duration: "2 weeks",
      topics: [
        "Linear Regression",
        "Decision Trees",
        "Support Vector Machines",
      ],
    },
    {
      id: 3,
      title: "Model Evaluation",
      duration: "1 week",
      topics: [
        "Training and Test Sets",
        "Cross-validation",
        "Performance Metrics",
      ],
    },
  ],
};

const reviewVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeIn",
      type: "spring",
      bounce: 0.3,
    },
  },
  initial: {
    opacity: 0,
    y: "100%",
  },
};

export default function LearningPlanReview({
  setReviewCourse,
  promptDetails,
}: {
  setReviewCourse: (value: boolean) => void;
  promptDetails: prompts;
}) {
  const [plan, setPlan] = useState(initialPlan);
  const [editingModule, setEditingModule] = useState<number | null>(null);
  const router = useRouter();
  const handleApprove = () => {
    router.push("/course-library");
  };
  console.log(promptDetails);

  return (
    <motion.div
      variants={reviewVariants}
      initial="initial"
      animate="visible"
      className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8"
    >
      <p
        className=" flex items-center w-fit gap-2 mb-4 text-gray-600 hover:text-indigo-600 cursor-pointer transition-all duration-300"
        onClick={() => setReviewCourse(false)}
      >
        {" "}
        <ArrowLeft /> Go back
      </p>
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Learning Plan Review
          </h2>
          <p className="text-gray-600 mt-1">
            Review and adjust your course structure
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="h-5 w-5" />
            <span>{plan.estimatedDuration}</span>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all duration-300 ">
            <RefreshCw className="h-4 w-4" />
            <span>Regenerate</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <p className="-mb-3 flex items-center gap-2 text-center ">
          Course format:{" "}
          <span className=" capitalize px-3 text-center font-medium py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-all duration-300 ">
            {promptDetails.courseFormat}
          </span>
        </p>
        {plan.modules.map((module, index) => (
          <div
            key={module.id}
            className="relative bg-gray-50 rounded-xl p-6 border-2 border-gray-100 hover:border-indigo-100 transition-all duration-300"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 cursor-move opacity-30 hover:opacity-100">
              <GripVertical className="h-5 w-5 text-gray-400" />
            </div>

            <div className="ml-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {editingModule === module.id ? (
                    <input
                      type="text"
                      value={module.title}
                      onChange={(e) => {
                        const newModules = [...plan.modules];
                        newModules[index] = {
                          ...module,
                          title: e.target.value,
                        };
                        setPlan({ ...plan, modules: newModules });
                      }}
                      className="text-lg font-semibold w-full border-2 border-indigo-200 rounded px-2 py-1"
                      autoFocus
                    />
                  ) : (
                    <h3 className="text-lg font-semibold">{module.title}</h3>
                  )}
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    <Clock className="h-4 w-4" />
                    <span>{module.duration}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setEditingModule(
                        editingModule === module.id ? null : module.id
                      )
                    }
                    className="p-2 text-gray-500 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300 "
                  >
                    <Save className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 ">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <ul className="space-y-2">
                {module.topics.map((topic, topicIndex) => (
                  <li key={topicIndex} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                    <span className="text-gray-700">{topic}</span>
                  </li>
                ))}
                <li>
                  <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 text-sm mt-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Topic</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ))}

        <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-indigo-200 hover:text-indigo-600 flex items-center justify-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add New Module</span>
        </button>

        <div className="flex justify-end space-x-4 mt-8">
          <button className="px-6 py-2 border-2 border-gray-200 text-gray-600 rounded-lg hover:border-gray-300">
            Request Changes
          </button>
          <button
            onClick={handleApprove}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:scale-110 transition-all duration-500 "
          >
            Approve & Generate
          </button>
        </div>
      </div>
    </motion.div>
  );
}
