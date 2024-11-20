import React, { useEffect, useState } from "react";
import {
  Search,
  // Filter,
  BookOpen,
  Clock,
  Star,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
// import { getCategoryCourses, getCourses } from "@/lib/MockDB";
import {
  getCourses,
  getAllCategory,
  getCoursesByCategory,
  getCourseByTitle,
} from "@/lib/services";
import { categoryType, coursesType } from "@/lib/types";
import Link from "next/link";

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
      ease: "easeIn",
    },
  },
};

export default function CourseLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategory] = useState<categoryType[] | []>([]);
  const [courses, setCourses] = useState<coursesType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const NewCourses = await getCourses();
      const NewCategory = await getAllCategory();

      setCourses(NewCourses);
      setCategory(NewCategory);
    };
    fetchData();
  }, []);

  // const categories = [
  //   "All",
  //   "Data Science",
  //   "Programming",
  //   "Design",
  //   "Business",
  //   "Marketing",
  // ];

  const handleCategory = async (category: string) => {
    setSelectedCategory(category);

    const categoryCourses = await getCoursesByCategory(category);
    setCourses(categoryCourses);
  };

  const handleSearch = async (searchParam = searchTerm) => {
    try {
      const searchedCourses = await getCourseByTitle(searchParam.toLowerCase());
      setCourses(searchedCourses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      key={selectedCategory}
      variants={pageVariants}
      initial="initial"
      animate="visible"
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Course Library</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearch(e.target.value);
              }}
              className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg  focus:border-indigo-600 outline-none "
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2  h-full flex justify-center items-center ">
              <Search className=" cursor-pointer hover:text-indigo-600  h-5 w-5 text-gray-400" />
            </div>
          </div>
          {/* <button className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 text-gray-600" />
            <span>Filters</span>
          </button> */}
        </div>
      </div>

      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
        {categories?.map((category) => (
          <button
            key={category.name}
            onClick={() => handleCategory(category.name)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category.name
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length !== 0 ? (
          courses?.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={400}
                  height={128}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-indigo-600">
                    {course.category}
                  </span>
                  <span className="text-sm text-gray-500">{course.level}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <Link
                  href={`/course-library/${course.title}/${course.id}`}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-2  rounded-lg hover:text-white hover:bg-indigo-700 transition-all duration-300 hover:translate-y-1 ${
                    course.active
                      ? "border border-solid border-indigo-600 text-indigo-600 "
                      : "bg-indigo-600 text-white"
                  }  `}
                >
                  <BookOpen className="h-5 w-5" />
                  <span>
                    {course.active ? "Continue Learning" : "Start Learning"}
                  </span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No Course available for this category</p>
        )}
      </div>
    </motion.div>
  );
}
