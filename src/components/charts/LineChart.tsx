import { ChartData } from "chart.js";
import { Line } from "react-chartjs-2";

interface LineChartProps {
  chartData: ChartData<"line">;
  title: string;
  subtitle: string;
}

function LineChart({ chartData, title, subtitle }: LineChartProps) {
  return (
    <div className="chart-container">
      <h2 className="text-center font-bold">{title}</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: subtitle,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              min: 0,
              max: 4,
              ticks: {
                stepSize: 1,
                precision: 0,
              },
            },
          },
        }}
      />
    </div>
  );
}
export default LineChart;
