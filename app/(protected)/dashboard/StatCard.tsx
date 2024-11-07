import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: string;
  color: string;
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  trend,
  color,
}: StatsCardProps) {
  return (
    <div className="relative overflow-hidden bg-white rounded-xl p-6 shadow-sm group hover:shadow-md transition-all">
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className={`w-full h-full ${color}`} />
      </div>
      <div className="relative">
        <div className="flex items-center space-x-2 text-gray-600 mb-2">
          <Icon className={`h-5 w-5 ${color}`} />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className={`text-sm ${color} mt-1 font-medium`}>{trend}</div>
      </div>
    </div>
  );
}
