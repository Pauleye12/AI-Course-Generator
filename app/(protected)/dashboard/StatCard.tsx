import React from "react";
import { LucideIcon } from "lucide-react";
import { Clock, Trophy, Brain, Zap } from "lucide-react";

interface StatsCardProps {
  icon: string;
  label: string;
  value: string;
  trend: string;
  color: string;
}

const iconMap: { [key: string]: LucideIcon } = {
  Clock: Clock,
  Trophy: Trophy,
  Brain: Brain,
  Zap: Zap,
};

export default function StatsCard({
  icon,
  label,
  value,
  trend,
  color,
}: StatsCardProps) {
  const Icon = iconMap[icon];

  if (!Icon) {
    console.error(`Icon "${icon}" not found in iconMap.`);
    return null;
  }

  console.log(typeof color);

  return (
    <div className="relative overflow-hidden hover:scale-110 duration-300 bg-white rounded-xl p-6 shadow-sm group hover:shadow-md transition-all">
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon
          data-color={color}
          className="data-[color='blue']:text-blue-600 data-[color='amber']:text-amber-600 data-[color='purple']:text-purple-600 data-[color='emerald']:text-emerald-600 w-full h-full "
        />
      </div>
      <div className="relative">
        <div className="flex items-center space-x-2 text-gray-600 mb-2">
          <Icon
            data-color={color}
            className="w-5 h-5 data-[color='blue']:text-blue-600 data-[color='amber']:text-amber-600 data-[color='purple']:text-purple-600 data-[color='emerald']:text-emerald-600"
          />
          <span className=" text-sm font-medium">{label}</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div
          data-color={color}
          className="text-sm mt-1 font-medium data-[color='blue']:text-blue-600 data-[color='amber']:text-amber-600 data-[color='purple']:text-purple-600 data-[color='emerald']:text-emerald-600 "
        >
          {trend}
        </div>
      </div>
    </div>
  );
}
