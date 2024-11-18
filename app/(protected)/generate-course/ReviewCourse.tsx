import React, { useState } from "react";
import {
  GripVertical,
  Clock,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  ArrowLeft,
  Pencil,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { coursesType, prompts } from "@/lib/types";
// import { addCourse } from "@/lib/MockDB";
import { addCourse } from "@/lib/services";

// Dummy data for demonstration
// const initialPlan = {
//   title: "Advanced Machine Learning Fundamentals",
//   estimatedDuration: "6 weeks",
//   modules: [
//     {
//       id: 1,
//       title: "Introduction to Machine Learning",
//       duration: "1 week",
//       topics: [
//         "What is Machine Learning?",
//         "Types of Machine Learning",
//         "Common Applications and Use Cases",
//       ],
//     },
//     {
//       id: 2,
//       title: "Supervised Learning Algorithms",
//       duration: "2 weeks",
//       topics: [
//         "Linear Regression",
//         "Decision Trees",
//         "Support Vector Machines",
//       ],
//     },
//     {
//       id: 3,
//       title: "Model Evaluation",
//       duration: "1 week",
//       topics: [
//         "Training and Test Sets",
//         "Cross-validation",
//         "Performance Metrics",
//       ],
//     },
//   ],
// };

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
  // const [plan, setPlan] = useState(initialPlan);
  const [editingModule, setEditingModule] = useState<number | null>(null);
  const [editingTopic, setEditingTopic] = useState<number | null>(null);
  const [newTopic, setNewTopic] = useState("");
  const [deleteModule, setDeleteModule] = useState<number | null>(null);
  const router = useRouter();

  const CourseTitle = promptDetails.promptMessage
    .split(" ")
    .slice(0, 3)
    .join(" ");

  const LatestCourse = {
    title: CourseTitle,
    id: Number(promptDetails.id),
    category: "Progamming",
    level: "Intermediate",
    rating: 4.9,
    duration: "12 weeks",
    progress: 42,
    timeLeft: "4 weeks left",
    active: false,
    topics: 15,
    contentFormat: promptDetails.courseFormat,
    image: "/images/webdev.webp",
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

  const [newCourse, setNewCourse] = useState<coursesType>(LatestCourse);

  //Function to Open delete confirmation modal
  const openModal = (id: number) => {
    setDeleteModule(id);
  };

  //Function to close delete confirmation modal
  const closeModal = () => {
    setDeleteModule(null);
  };

  //Function to delete module
  const handleDelete = (id: number) => {
    const updatedModules = newCourse.modules.filter(
      (module) => module.id !== id
    );
    setNewCourse({ ...newCourse, modules: updatedModules });
    closeModal();
  };

  //Function to add topics
  const handleAddTopics = (id: number) => {
    const newTopics = [...newCourse.modules[id].topics];
    newTopics.push(newTopic);
    const newModules = [...newCourse.modules];
    newModules[id] = {
      ...newCourse.modules[id],
      topics: newTopics,
    };

    setNewCourse({ ...newCourse, modules: newModules });
    setNewTopic("");
    setEditingTopic(null);
  };

  // Function to Approve the corse outline
  const handleApprove = () => {
    addCourse(newCourse);
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
            <span>{newCourse.duration}</span>
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
            {newCourse.contentFormat}
          </span>
        </p>
        {newCourse.modules.map((module, index) => (
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
                        const newModules = [...newCourse.modules];
                        newModules[index] = {
                          ...module,
                          title: e.target.value,
                        };
                        setNewCourse({ ...newCourse, modules: newModules });
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
                    {editingModule === module.id ? (
                      <Save className="h-4 w-4" />
                    ) : (
                      <Pencil className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => openModal(module.id)}
                    className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 "
                  >
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
                {editingTopic === module.id ? (
                  <div className="max-w-[370px] w-full flex items-center gap-3 justify-start px-3 ">
                    <input
                      value={newTopic}
                      onChange={(e) => {
                        setNewTopic(e.target.value);
                      }}
                      className="outline-none w-full bg-transparent border border-solid border-indigo-600 rounded-md px-2 py-1"
                      type="text"
                    />{" "}
                    <button
                      onClick={() => handleAddTopics(index)}
                      className="text-indigo-600 font-semibold"
                    >
                      Add
                    </button>
                    <button
                      onClick={() =>
                        setEditingTopic(
                          editingTopic === module.id ? null : module.id
                        )
                      }
                    >
                      <X className="text-red-600 h-6 w-6 " />
                    </button>
                  </div>
                ) : (
                  <li
                    onClick={() =>
                      setEditingTopic(
                        editingTopic === module.id ? null : module.id
                      )
                    }
                  >
                    <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 text-sm mt-2">
                      <Plus className="h-4 w-4" />
                      <span>Add Topic</span>
                    </button>
                  </li>
                )}
              </ul>
            </div>

            {module.id === deleteModule && (
              <div className="absolute top-0 left-0 z-50 w-full h-full bg-[#0000004f]  flex justify-center items-center rounded-md ">
                <div className="flex flex-col bg-white rounded-md gap-7 py-5 px-4 items-center max-w-[600px] w-full">
                  <h1 className="text-center font-medium text-xl ">
                    Are you sure you want to delete this module?
                  </h1>
                  <div className="flex gap-8 justify-between items-center">
                    <button
                      onClick={() => closeModal()}
                      className="bg-gray-50 hover:bg-gray-200 border border-solid border-gray-300 text-black px-8 py-2 rounded-md font-medium "
                    >
                      No
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white px-8 py-2 rounded-md font-medium "
                      onClick={() => handleDelete(module.id)}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            )}
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
