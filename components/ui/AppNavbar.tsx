"use client";
import React, { useState } from "react";
import { Sparkles, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const mobileNavVariant = {
  hidden: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.7,
      ease: "easeOut",
      type: "spring",
      bounce: 0.3,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      type: "spring",
      bounce: 0.3,
    },
  },
};

export default function Header() {
  const pathName = usePathname();
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <header className="fixed left-0 top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl relative mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">
              CourseForge AI
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/dashboard"
              className={`text-gray-600 transition-all duration-300 hover:text-indigo-700 ${
                pathName === "/dashboard"
                  ? " border-b-2 border-solid border-indigo-600 text-indigo-600 font-medium  "
                  : ""
              } `}
            >
              Dashboard
            </Link>
            <Link
              href="/course-library"
              className={`text-gray-600 transition-all duration-300   hover:text-indigo-700 ${
                pathName === "/course-library"
                  ? " border-b-2 border-solid border-indigo-600 text-indigo-600 font-medium  "
                  : ""
              } `}
            >
              Course Library
            </Link>
            <Link
              href="/generate-course"
              className={`text-gray-600 transition-all duration-300   hover:text-indigo-700 ${
                pathName === "/generate-course"
                  ? " border-b-2 border-solid border-indigo-600 text-indigo-600 font-medium  "
                  : ""
              } `}
            >
              Generate Course
            </Link>
            <Link
              href="/ai-tutor"
              className={`text-gray-600 transition-all duration-300   hover:text-indigo-700 ${
                pathName === "/ai-tutor"
                  ? " border-b-2 border-solid border-indigo-600 text-indigo-600 font-medium  "
                  : ""
              } `}
            >
              AI Tutor
            </Link>
            <Link
              href="/quiz"
              className={`text-gray-600 transition-all duration-300   hover:text-indigo-700 ${
                pathName === "/quiz"
                  ? " border-b-2 border-solid border-indigo-600 text-indigo-600 font-medium  "
                  : ""
              } `}
            >
              Quiz
            </Link>
          </nav>

          <button
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="md:hidden"
          >
            {showMobileNav ? (
              <X className="h-6 w-6 text-gray-600 transition-all duration-300  " />
            ) : (
              <Menu className="h-6 w-6 text-gray-600 transition-all duration-300  " />
            )}
          </button>
        </div>

        <AnimatePresence>
          {showMobileNav && (
            <motion.div
              variants={mobileNavVariant}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg"
            >
              <div className="flex flex-col space-y-4 p-4">
                <Link
                  href="/dashboard"
                  onClick={() => setShowMobileNav(!showMobileNav)}
                  className={`text-gray-600 hover:text-indigo-700 px-4 py-2 hover:bg-gray-50 rounded-lg ${
                    pathName === "/dashboard"
                      ? " border-b-2 border-solid border-indigo-600 text-indigo-600 font-medium  "
                      : ""
                  } `}
                >
                  Dashboard
                </Link>
                <Link
                  href="/course-library"
                  onClick={() => setShowMobileNav(!showMobileNav)}
                  className={`text-gray-600 hover:text-indigo-700 px-4 py-2 hover:bg-gray-50 rounded-lg ${
                    pathName === "/course-library"
                      ? " border-b-2 border-solid border-indigo-600 text-indigo-600 font-medium  "
                      : ""
                  } `}
                >
                  Course Library
                </Link>
                <Link
                  href="/generate-course"
                  onClick={() => setShowMobileNav(!showMobileNav)}
                  className={`text-gray-600 hover:text-indigo-700 px-4 py-2 hover:bg-gray-50 rounded-lg ${
                    pathName === "/generate-course"
                      ? " border-b-2 border-solid border-indigo-600 text-indigo-600 font-medium  "
                      : ""
                  } `}
                >
                  Generate Course
                </Link>
                <Link
                  href="/ai-tutor"
                  onClick={() => setShowMobileNav(!showMobileNav)}
                  className={`text-gray-600 hover:text-indigo-700 px-4 py-2 hover:bg-gray-50 rounded-lg ${
                    pathName === "/ai-tutor"
                      ? " border-b-2 border-solid border-indigo-600 text-indigo-600 font-medium  "
                      : ""
                  } `}
                >
                  AI Tutor
                </Link>
                <Link
                  href="/quiz"
                  onClick={() => setShowMobileNav(!showMobileNav)}
                  className={`text-gray-600 hover:text-indigo-700 px-4 py-2 hover:bg-gray-50 rounded-lg ${
                    pathName === "/quiz"
                      ? " border-b-2 border-solid border-indigo-600 text-indigo-600 font-medium  "
                      : ""
                  } `}
                >
                  Quiz
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
