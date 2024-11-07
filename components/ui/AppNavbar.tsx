"use client";
import React from "react";
import { Sparkles, Menu } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="text-gray-600 hover:text-gray-900"
            >
              Dashboard
            </Link>
            <Link
              href="/course-library"
              className="text-gray-600 hover:text-gray-900"
            >
              Course Library
            </Link>
            <Link
              href="/generate-course"
              className="text-gray-600 hover:text-gray-900"
            >
              Generate Course
            </Link>
            <Link
              href="/ai-tutor"
              className="text-gray-600 hover:text-gray-900"
            >
              AI Tutor
            </Link>
            <Link href="/quiz" className="text-gray-600 hover:text-gray-900">
              Quiz
            </Link>
          </nav>

          <button className="md:hidden">
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
