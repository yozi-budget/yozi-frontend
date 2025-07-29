import React from "react";
interface CategoryData {
    name: string;
    amount: number;
    color: string;
}
interface Props {
    data: CategoryData[];
}
declare const CustomCategoryPieChart: React.FC<Props>;
export default CustomCategoryPieChart;
