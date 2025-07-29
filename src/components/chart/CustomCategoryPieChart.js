import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const sorted = [...payload].sort((a, b) => b.value - a.value);
        return (_jsx("div", { style: { background: "white", border: "1px solid #ccc", padding: "10px" }, children: sorted.map((item) => (_jsxs("div", { style: { marginBottom: "5px" }, children: [_jsx("span", { style: { color: item.color }, children: "\u25CF" }), " ", item.name, " :", " ", _jsxs("strong", { children: [item.value.toLocaleString(), "\uC6D0"] })] }, item.name))) }));
    }
    return null;
};
const CustomLegend = ({ data }) => {
    return (_jsx("div", { style: { display: "flex", flexDirection: "column", marginLeft: "40px" }, children: data.map((entry, index) => (_jsxs("div", { style: { marginBottom: "8px", fontSize: "14px" }, children: [_jsx("span", { style: { color: entry.color }, children: "\u25CF" }), " ", entry.name, " \u00A0", _jsxs("strong", { children: [entry.amount.toLocaleString(), "\uC6D0"] })] }, `item-${index}`))) }));
};
const CustomCategoryPieChart = ({ data }) => {
    // 금액 기준으로 정렬
    const sortedData = [...data].sort((a, b) => b.amount - a.amount);
    return (_jsxs("div", { style: { display: "flex", justifyContent: "center", alignItems: "center" }, children: [_jsx(ResponsiveContainer, { width: 500, height: 360, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: sortedData, cx: "50%", cy: "50%", innerRadius: 80, outerRadius: 120, paddingAngle: 2, dataKey: "amount", label: ({ percent }) => percent !== undefined ? `${(percent * 100).toFixed(0)}%` : "", children: sortedData.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, { content: _jsx(CustomTooltip, {}) })] }) }), _jsx(CustomLegend, { data: sortedData })] }));
};
export default CustomCategoryPieChart;
