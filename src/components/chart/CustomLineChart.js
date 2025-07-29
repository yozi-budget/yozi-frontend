import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
const CustomTick = ({ x, y, payload, firstDate, lastDate }) => {
    const { value } = payload;
    if (value === firstDate || value === lastDate) {
        return (_jsx("text", { x: x, y: y + 10, textAnchor: "middle", fill: "#666", fontSize: 12, children: value }));
    }
    return null;
};
const CustomLineChart = ({ data }) => {
    if (!data || data.length === 0)
        return null;
    const firstDate = data[0].date;
    const lastDate = data[data.length - 1].date;
    // 내부에서 Tick 렌더링 함수 생성 (first/last 전달)
    const renderCustomTick = (props) => (_jsx(CustomTick, { ...props, firstDate: firstDate, lastDate: lastDate }));
    return (_jsx(ResponsiveContainer, { width: "100%", height: 200, children: _jsxs(LineChart, { data: data, children: [_jsx(XAxis, { dataKey: "date", axisLine: { stroke: '#aaa' }, tickLine: false, tick: renderCustomTick, interval: "preserveStartEnd" // ✅ 양끝 tick 보장
                    , padding: { left: 10, right: 10 } }), _jsx(YAxis, { hide: true }), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "amount", stroke: "#228be6", strokeWidth: 2, dot: false, activeDot: false })] }) }));
};
export default CustomLineChart;
