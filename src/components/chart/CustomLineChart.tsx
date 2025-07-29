import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import React from 'react';

type DataItem = { date: string; amount: number };
type Props = {
  data: DataItem[];
};

type CustomTickProps = {
  x: number;
  y: number;
  payload: any;
  firstDate: string;
  lastDate: string;
};

const CustomTick = ({ x, y, payload, firstDate, lastDate }: CustomTickProps) => {
  const { value } = payload;
  if (value === firstDate || value === lastDate) {
    return (
      <text
        x={x}
        y={y + 10}
        textAnchor="middle"
        fill="#666"
        fontSize={12}
      >
        {value}
      </text>
    );
  }
  return null;
};

const CustomLineChart = ({ data }: Props) => {
  if (!data || data.length === 0) return null;

  const firstDate = data[0].date;
  const lastDate = data[data.length - 1].date;

  // 내부에서 Tick 렌더링 함수 생성 (first/last 전달)
  const renderCustomTick = (props: any) => (
    <CustomTick {...props} firstDate={firstDate} lastDate={lastDate} />
  );

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis
          dataKey="date"
          axisLine={{ stroke: '#aaa' }}
          tickLine={false}
          tick={renderCustomTick}
          interval="preserveStartEnd"  // ✅ 양끝 tick 보장
          padding={{ left: 10, right: 10 }} // ✅ 좌우 여백 확보
        />
        <YAxis hide />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#228be6"
          strokeWidth={2}
          dot={false}
          activeDot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
