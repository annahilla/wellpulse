import { ChartData } from "chart.js";
import { Pie } from "react-chartjs-2";

interface PieChartProps {
    chartData: ChartData<'pie'>; 
    title: string;
    subtitle: string;
  }

function PieChart({ chartData, title, subtitle } : PieChartProps) {
  return (
    <div className="chart-container">
      <h2 className="text-center font-bold">{title}</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: subtitle
            }
          }
        }}
      />
    </div>
  );
}
export default PieChart;