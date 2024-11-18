import { Clock, Trophy, Brain, Zap } from "lucide-react";
import { coursesType, metrics } from "./types";
const mockDatabase = {
  courses: [
    {
      title: "Advanced Machine Learning",
      id: 1,
      category: "Data Science",
      level: "Advanced",
      rating: 4.8,
      duration: "8 weeks",
      progress: 65,
      timeLeft: "2 weeks left",
      active: false,
      topics: 12,
      contentFormat: "Video",
      image: "/images/machineLearning.webp",
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
    },
    {
      title: "Web Development Bootcamp",
      id: 2,
      category: "Programming",
      level: "Intermediate",
      rating: 4.9,
      duration: "12 weeks",
      progress: 42,
      timeLeft: "4 weeks left",
      active: true,
      topics: 15,
      contentFormat: "Audio",
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
    },
    {
      title: "UI-UX Design Principles",
      id: 3,
      category: "Design",
      level: "Beginner",
      rating: 4.9,
      duration: "6 weeks",
      progress: 89,
      timeLeft: "3 days left",
      active: true,
      topics: 8,
      contentFormat: "Text",
      image: "/images/uiux.webp",
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
    },
  ],
  dashboardMetrics: [
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
  ],
};

// Function to get all courses
export const getCourses = () => {
  return mockDatabase.courses;
};

//Function to get course by ID
export const getCoursesById = (id: number) => {
  const courses = mockDatabase.courses;
  const IDCourses = courses.find((C) => C.id === id);
  return IDCourses;
};

// Function to get all courses
export const getCategoryCourses = (category: string) => {
  const courses = mockDatabase.courses;
  const categoryCourses = courses.filter((C) => C.category === category);

  if (category !== "All" && categoryCourses.length !== 0) {
    console.log("yes");
    return categoryCourses;
  } else if (category === "All") {
    return courses;
  } else if (categoryCourses.length === 0) {
    console.log("mid");
    return categoryCourses;
  } else {
    console.log("no");

    return courses;
  }
};

// Function to add a course
export const addCourse = (course: coursesType) => {
  mockDatabase.courses.push(course);
};

// Function to get all dashboard metrics
export const getDashboardMetrics = () => {
  return mockDatabase.dashboardMetrics;
};

// Function to add dashboard metrics
export const addDashboardMetric = (metric: metrics) => {
  mockDatabase.dashboardMetrics.push(metric);
};
