import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface CategoryData {
  name: string;
  amount: number;
  color: string;
}

interface Props {
  data: CategoryData[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const sorted = [...payload].sort((a, b) => b.value - a.value);

    return (
      <div style={{ background: "white", border: "1px solid #ccc", padding: "10px" }}>
        {sorted.map((item) => (
          <div key={item.name} style={{ marginBottom: "5px" }}>
            <span style={{ color: item.color }}>●</span> {item.name} :{" "}
            <strong>{item.value.toLocaleString()}원</strong>
          </div>
        ))}
      </div>
    );
  }
  return null;
};


const CustomLegend = ({ data }: { data: CategoryData[] }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", marginLeft: "40px" }}>
      {data.map((entry, index) => (
        <div key={`item-${index}`} style={{ marginBottom: "8px", fontSize: "14px" }}>
          <span style={{ color: entry.color }}>●</span> {entry.name} &nbsp;
          <strong>{entry.amount.toLocaleString()}원</strong>
        </div>
      ))}
    </div>
  );
};

const CustomCategoryPieChart: React.FC<Props> = ({ data }) => {
  // 금액 기준으로 정렬
  const sortedData = [...data].sort((a, b) => b.amount - a.amount);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <ResponsiveContainer width={500} height={360}>
        <PieChart>
          <Pie
            data={sortedData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={2}
            dataKey="amount"
            label={({ percent }) =>
              percent !== undefined ? `${(percent * 100).toFixed(0)}%` : ""
            }
          >
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <CustomLegend data={sortedData} />
    </div>
  );
};

export default CustomCategoryPieChart;
