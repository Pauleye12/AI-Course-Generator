"use client";
import React, { useEffect, useState } from "react";
import { GripVertical, Clock } from "lucide-react";
import { coursesType } from "@/lib/types";
import { getCoursesById } from "@/lib/MockDB";

import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";

const Learning = () => {
  const pathName = usePathname();

  const path = pathName.split("/");

  const ID = Number(path[3]);
  const [course, setCourse] = useState<coursesType>();
  useEffect(() => {
    const courseDets = getCoursesById(ID);

    setCourse(courseDets);
  }, [ID]);

  return (
    <div className=" max-w-[1200px] h-full flex flex-col py-6 gap-4  w-full ">
      <h1 className="text-3xl capitalize font-semibold text-indigo-600 mb-2">
        {course?.title}
      </h1>
      <div className="w-full flex justify-between items-center gap-4 flex-col md:flex-row ">
        <p className="-mb-3 flex items-center gap-2 text-center ">
          Course format:{" "}
          {course ? (
            <span className="capitalize px-3 text-center font-medium py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-all duration-300 ">
              {course.contentFormat}
            </span>
          ) : (
            <span className="text-gray-500">Loading...</span>
          )}
        </p>
        <p className="-mb-3 flex items-center gap-2 text-center ">
          Course Status:{" "}
          {course?.active ? (
            <span className="capitalize px-3 text-center font-medium py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-all duration-300 ">
              Active
            </span>
          ) : (
            <span className="text-indigo-500">Inactive</span>
          )}
        </p>
      </div>

      <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {course &&
          course.modules.map((module) => (
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
                    <h3 className="text-lg font-semibold">{module.title}</h3>

                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4" />
                      <span>{module.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2"></div>
                </div>

                <ul className="space-y-2">
                  {module.topics.map((topic, topicIndex) => (
                    <li
                      key={topicIndex}
                      className="flex items-center space-x-2"
                    >
                      <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                      <span className="text-gray-700">{topic}</span>
                    </li>
                  ))}
                  <li></li>
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Learning;
