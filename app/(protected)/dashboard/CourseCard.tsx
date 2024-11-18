import React from "react";
import { Clock, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  title: string;
  progress: number;
  timeLeft: string;
  image: string;
  topics: number;
  id: number;
}

export default function CourseCard({
  title,
  progress,
  timeLeft,
  image,
  topics,
  id,
}: CourseCardProps) {
  return (
    <Link href={`/course-library/${title}/${id}`}>
      <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
        <div className="h-32 overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={400}
            height={128}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{timeLeft}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen className="h-4 w-4" />
              <span>{topics} topics</span>
            </div>
          </div>
          <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-indigo-600 font-medium">
              {progress}% complete
            </span>
            <span className="text-gray-500">{100 - progress}% remaining</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
