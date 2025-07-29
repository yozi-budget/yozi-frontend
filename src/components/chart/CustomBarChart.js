import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Cell, } from 'recharts';
const exampleData = [
    { month: '4월', amount: 987650, days: 30, isCurrent: false },
    { month: '5월', amount: 977350, days: 31, isCurrent: false },
    { month: '6월', amount: 777350, days: 30, isCurrent: true },
];
const CustomBarChart = () => (_jsx(ResponsiveContainer, { width: "100%", height: 220, children: _jsxs(BarChart, { data: exampleData, margin: { top: 50, right: 0, left: 0, bottom: 0 }, children: [_jsx(XAxis, { dataKey: "month", axisLine: { stroke: '#aaa' }, tickLine: false, tick: { fontSize: 13 } }), _jsx(YAxis, { hide: true, domain: [0, 1000000] }), _jsx(Tooltip, { formatter: (value) => `${value.toLocaleString()} 원` }), _jsxs(Bar, { dataKey: "amount", barSize: 40, radius: [10, 10, 0, 0], children: [_jsx(LabelList, { content: ({ x, y, width, index }) => {
                            if (typeof index !== 'number')
                                return null;
                            const entry = exampleData[index];
                            if (!entry?.isCurrent)
                                return null;
                            const avg = Math.round(entry.amount / entry.days).toLocaleString();
                            const labelText = `일 평균 ${avg}원`;
                            const cx = Number(x ?? 0) + Number(width ?? 0) / 2;
                            const cy = Number(y ?? 0) - 20;
                            const paddingX = 10;
                            const paddingY = 5;
                            const fontSize = 12;
                            // 대략적인 텍스트 너비 계산 (문자수 * 폰트 크기 * 0.6)
                            const textWidth = labelText.length * fontSize * 0.6;
                            const rectWidth = textWidth + paddingX * 2;
                            const rectHeight = fontSize + paddingY * 2;
                            return (_jsxs("g", { children: [_jsx("rect", { x: cx - rectWidth / 2, y: cy - rectHeight + 10, width: rectWidth, height: rectHeight, rx: 12, fill: "#e8f0ff" }), _jsx("text", { x: cx, y: cy, fill: "#6c8eff", fontSize: fontSize, textAnchor: "middle", dominantBaseline: "middle", children: labelText })] }));
                        } }), exampleData.map((entry, index) => (_jsx(Cell, { fill: entry.isCurrent ? '#6c8eff' : '#d9d9d9' }, `cell-${index}`)))] })] }) }));
export default CustomBarChart;
