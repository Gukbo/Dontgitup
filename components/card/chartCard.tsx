"use client";

import { useMemo } from "react";
import { LanguageData } from "@/types/user";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface LanguagePieChartProps {
  chartData: LanguageData[];
  className?: string;
}

export default function ChartCard({
  chartData,
  className = "",
}: LanguagePieChartProps) {
  const totalValue = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  const customTooltipFormatter: TooltipProps<
    ValueType,
    NameType
  >["formatter"] = (value) => {
    if (value === undefined || value === null) return ["", ""];

    const numValue = Number(value);
    const percentage = ((numValue / totalValue) * 100).toFixed(1); // 소수점 첫째 자리까지!

    return [`${percentage}%`];
  };

  return (
    <div
      className={`w-full h-full bg-mainbg border-2 border-magenta p-6 rounded-3xl flex flex-col items-center justify-center shadow-lg ${className}`}
    >
      <h3 className="text-white text-lg mb-6 font-game">Language usage</h3>

      <div className="w-full h-62.5">
        <ResponsiveContainer className="bg-mainbg" width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={customTooltipFormatter}
              contentStyle={{
                backgroundColor: "#111827",
                borderColor: "#3178C6",
                borderRadius: "8px",
              }}
              itemStyle={{ color: "#FFF" }}
            />

            <Legend
              formatter={(value) => (
                <span className="text-gray-300 text-xs px-1 font-game">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
