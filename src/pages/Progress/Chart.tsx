import { ChartData } from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

type ChartType = 'bar' | 'line' | 'pie';

interface ChartProps {
  chartType: ChartType;
  chartData: ChartData<'bar'> | ChartData<'line'> | ChartData<'pie'>;
  title: string;
  subtitle: string;
}

const ChartComponent = ({ chartType, chartData, title, subtitle }: ChartProps) => {
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={chartData as ChartData<'bar'>} options={getChartOptions(subtitle)} />;
      case 'line':
        return <Line data={chartData as ChartData<'line'>} options={getChartOptions(subtitle)} />;
      case 'pie':
        return <Pie data={chartData as ChartData<'pie'>} options={getChartOptions(subtitle)} />;
      default:
        return null;
    }
  };

  const getChartOptions = (subtitle: string) => ({
    plugins: {
      title: {
        display: true,
        text: subtitle,
      },
      legend: {
        display: chartType !== 'pie',
      },
    },
    scales: chartType === 'bar' || chartType === 'line' ? {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
        ...(chartType === 'line' && { min: 0, max: 4 })
      },
    } : undefined,
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1 / 1,
  });

  return (
    <div className="chart-container">
      <h2 className="text-center font-bold">{title}</h2>
      {renderChart()}
    </div>
  );
}

export default ChartComponent;
