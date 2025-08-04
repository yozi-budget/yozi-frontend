import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

interface BarChartData {
  month: string;
  amount: number;
  days: number;
  isCurrent: boolean;
}

interface Props {
  data: BarChartData[];
}

const CustomBarChart: React.FC<Props> = ({ data }) => (
  <ResponsiveContainer width="100%" height={220}>
    <BarChart
      data={data}
      margin={{ top: 50, right: 0, left: 0, bottom: 0 }}
    >
      <XAxis
        dataKey="month"
        axisLine={{ stroke: "#aaa" }}
        tickLine={false}
        tick={{ fontSize: 13 }}
      />
      <YAxis hide domain={[0, 1000000]} />
      <Tooltip formatter={(value: number) => `${value.toLocaleString()} 원`} />
      <Bar dataKey="amount" barSize={40} radius={[10, 10, 0, 0]}>
        <LabelList
          content={({ x, y, width, index }) => {
            if (typeof index !== "number") return null;
            const entry = data[index];
            if (!entry?.isCurrent) return null;

            const avg = Math.round(entry.amount / entry.days).toLocaleString();
            const labelText = `일 평균 ${avg}원`;

            const cx = Number(x ?? 0) + Number(width ?? 0) / 2;
            const cy = Number(y ?? 0) - 20;

            const paddingX = 10;
            const paddingY = 5;
            const fontSize = 12;

            const textWidth = labelText.length * fontSize * 0.6;
            const rectWidth = textWidth + paddingX * 2;
            const rectHeight = fontSize + paddingY * 2;

            return (
              <g>
                <rect
                  x={cx - rectWidth / 2}
                  y={cy - rectHeight + 10}
                  width={rectWidth}
                  height={rectHeight}
                  rx={12}
                  fill="#e8f0ff"
                />
                <text
                  x={cx}
                  y={cy}
                  fill="#6c8eff"
                  fontSize={fontSize}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {labelText}
                </text>
              </g>
            );
          }}
        />
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={entry.isCurrent ? "#6c8eff" : "#d9d9d9"}
          />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default CustomBarChart;
