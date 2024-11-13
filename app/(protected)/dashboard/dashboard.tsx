import React, { useEffect, useState } from "react";
import { Trophy, Brain, Calendar, Flame, Award } from "lucide-react";
import StatsCard from "./StatCard";
import CourseCard from "./CourseCard";
import { motion } from "framer-motion";
import { getCourses, getDashboardMetrics } from "@/lib/MockDB";
import { coursesType, metrics } from "@/lib/types";

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
  exit: {
    opacity: 0,
    x: "-100%",
    transition: {
      duration: 0.7,
      ease: "easeOut",
      type: "spring",
      bounce: 0.3,
    },
  },
};

export default function LearningDashboard() {
  useEffect(() => {
    const NewCourses = getCourses();
    const NewMetrics = getDashboardMetrics();
    setCourses(NewCourses);
    setMetrics(NewMetrics);
  }, []);
  const [courses, setCourses] = useState<coursesType[]>([]);
  const [metrics, setMetrics] = useState<metrics[]>([]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="visible"
      exit="exit"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Alex! 👋</h1>
        <p className="text-indigo-100">
          You&apos;re making great progress. Keep up the momentum!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Active Courses</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 hover:scale-110 ease-in transition-all duration-[350ms] font-medium">
              View All Courses
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Learning Streak */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Learning Streak
                </h2>
                <p className="text-sm text-gray-600">You&apos;re on fire! 🔥</p>
              </div>
              <Calendar className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="grid grid-cols-7 gap-2">
              {[...Array(35)].map((_, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-lg ${
                    Math.random() > 0.5
                      ? "bg-indigo-600"
                      : Math.random() > 0.7
                      ? "bg-indigo-200"
                      : "bg-gray-100"
                  } transition-colors hover:opacity-80`}
                />
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Achievements
              </h2>
              <Award className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: Flame,
                  label: "7 Day Streak Master",
                  color: "text-orange-500",
                },
                {
                  icon: Brain,
                  label: "Knowledge Explorer",
                  color: "text-purple-500",
                },
                {
                  icon: Trophy,
                  label: "Quiz Champion",
                  color: "text-yellow-500",
                },
              ].map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center hover:bg-gray-200 transition-all duration-300 space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`p-2 rounded-full bg-white ${achievement.color}`}
                  >
                    <achievement.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {achievement.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
