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
              legend: {
                display: false,
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                  precision: 0,
                },
              },
            },
            responsive: true,
            maintainAspectRatio:true,
            aspectRatio: 1/1
          }} 
      />
    </div>
  );
}
export default BarChart;