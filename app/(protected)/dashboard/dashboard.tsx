import React from "react";
import {
  Clock,
  Trophy,
  Brain,
  Calendar,
  Zap,
  Flame,
  Award,
} from "lucide-react";
import StatsCard from "./StatCard";
import CourseCard from "./CourseCard";

const courses = [
  {
    title: "Advanced Machine Learning",
    progress: 65,
    timeLeft: "2 weeks left",
    topics: 12,
    image: "/images/machineLearning.webp",
  },
  {
    title: "Web Development Bootcamp",
    progress: 42,
    timeLeft: "4 weeks left",
    topics: 15,
    image: "/images/webdev.webp",
  },
  {
    title: "UI/UX Design Principles",
    progress: 89,
    timeLeft: "3 days left",
    topics: 8,
    image: "/images/uiux.webp",
  },
];

const stats = [
  {
    icon: Clock,
    label: "Study Time",
    value: "47h 23m",
    trend: "+2.5h this week",
    color: "text-blue-600",
  },
  {
    icon: Trophy,
    label: "Courses Completed",
    value: "7",
    trend: "2 this month",
    color: "text-amber-600",
  },
  {
    icon: Zap,
    label: "Current Streak",
    value: "12 days",
    trend: "Best: 15 days",
    color: "text-purple-600",
  },
  {
    icon: Brain,
    label: "Knowledge Points",
    value: "3,847",
    trend: "+350 pts this week",
    color: "text-emerald-600",
  },
];

export default function LearningDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Alex! 👋</h1>
        <p className="text-indigo-100">
          You&apos;re making great progress. Keep up the momentum!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Active Courses</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
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
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
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
    </div>
  );
}
