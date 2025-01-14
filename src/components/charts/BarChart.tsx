import { ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";

interface BarChartProps {
    chartData: ChartData<'bar'>;
    title: string;
    subtitle: string;
  }

function BarChart({ chartData, title, subtitle } : BarChartProps) {
  return (
    <div className="chart-container">
      <h2 className="text-center font-bold">{title}</h2>
      <Bar
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
                max: 10,
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
export default BarChart;