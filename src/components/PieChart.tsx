import { ChartData } from "chart.js";
import { Pie } from "react-chartjs-2";

interface PieChartProps {
    chartData: ChartData<'pie'>; 
  }

function PieChart({ chartData } : PieChartProps) {
  return (
    <div className="chart-container">
      <h2 className="text-center font-bold">Habits by Category</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Number of habits scheduled by category"
            }
          }
        }}
      />
    </div>
  );
}
export default PieChart;