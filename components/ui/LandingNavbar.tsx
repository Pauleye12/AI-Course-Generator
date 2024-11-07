"use client";
import React, { useState } from "react";
import { Sparkles, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathName = usePathname();
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <header className="fixed left-0 top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">
              CourseForge AI
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className={`text-gray-600 hover:text-indigo-700 ${
                pathName === "#features"
                  ? " border-b-2 border-solid border-indigo-600 text-indigo-600 font-medium  "
                  : ""
              }  `}
            >
              Features
            </a>
            <a
              href="#templates"
              className={`text-gray-600 hover:text-indigo-700 ${
                pathName === "#templates"
                  ? " border-b-2 border-solid border-indigo-600 text-indigo-600 font-medium  "
                  : ""
              }  `}
            >
              Templates
            </a>
            <a
              href="#pricing"
              className={`text-gray-600 hover:text-indigo-700 ${
                pathName === "#pricing"
                  ? " border-b-2 border-solid border-indigo-600 text-indigo-600 font-medium  "
                  : ""
              }  `}
            >
              Pricing
            </a>
            <Link
              href="/dashboard"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>
          </nav>

          <button
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="md:hidden"
          >
            {showMobileNav ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {showMobileNav && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-100 shadow-lg">
            <div className="flex flex-col space-y-4 p-4">
              <a
                href="#features"
                className={`text-gray-600 hover:text-indigo-700 px-4 py-2 hover:bg-gray-50 rounded-lg ${
                  pathName === "#features"
                    ? " border-b-2 border-solid border-indigo-600 text-indigo-600 font-medium  "
                    : ""
                }  `}
                onClick={() => setShowMobileNav(!showMobileNav)}
              >
                Features
              </a>
              <a
                href="#templates"
                className={`text-gray-600 hover:text-indigo-700 px-4 py-2 hover:bg-gray-50 rounded-lg ${
                  pathName === "#templates"
                    ? " border-b-2 border-solid border-indigo-600 text-indigo-600 font-medium  "
                    : ""
                }  `}
                onClick={() => setShowMobileNav(!showMobileNav)}
              >
                Templates
              </a>
              <a
                href="#pricing"
                className={`text-gray-600 hover:text-indigo-700 px-4 py-2 hover:bg-gray-50 rounded-lg ${
                  pathName === "#pricing"
                    ? " border-b-2 border-solid border-indigo-600 text-indigo-600 font-medium  "
                    : ""
                }  `}
                onClick={() => setShowMobileNav(!showMobileNav)}
              >
                Pricing
              </a>
              <Link
                href="/dashboard"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition w-full"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
