import { moduleType } from "@/lib/types";
import React, { useState } from "react";
import { BookOpen } from "lucide-react";

const ModuleDetails = ({
  module,
  selectedModule,
  setSelectedModule,
  contentFormat,
}: {
  module: moduleType | null;
  selectedModule: number;
  setSelectedModule: (moduleId: number | null) => void;
  contentFormat: string;
}) => {
  const [activeModule, setActiveModule] = useState(module);
  return (
    <div className="flex mt-10 bg-slate-100 px-16 py-10 rounded-2xl gap-10 flex-col w-full">
      <h2 className="text-indigo-600 text-xl font-semibold">
        Module:{" "}
        <span className=" text-[#4b5563] font-semibold">
          {activeModule?.title}
        </span>
      </h2>
      <div className="flex flex-col gap-10">
        {activeModule?.topics.map((topic, index) => (
          <div className=" flex flex-col gap-5 " key={index}>
            <h3 className="text-indigo-600 font-medium text-lg flex items-center gap-2 ">
              {" "}
              <BookOpen className="w-7 h-7 text-indigo-600 " /> {topic}
            </h3>
            {contentFormat === "text" ? (
              <p>Text content goes here.</p>
            ) : contentFormat === "audio" ? (
              <audio controls>
                <source src="audio-file.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : contentFormat === "video" ? (
              <video controls>
                <source src="video-file.mp4" type="video/mp4" />
                Your browser does not support the video element.
              </video>
            ) : contentFormat === "images" ? (
              <img src="image-file.jpg" alt="Descriptive text" />
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex justify-end w-full ">
        <button
          onClick={() => setSelectedModule(null)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:scale-110 transition-all duration-500 "
        >
          Mark As Completed
        </button>
      </div>
    </div>
  );
};

export default ModuleDetails;
