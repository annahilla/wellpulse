import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "../../components/PieChart";
import { Categories, Habit } from "../../types/types";
import { useDispatch } from "react-redux";
import { getHabits } from "../../redux/habitsActions";
import { AppDispatch } from "../../redux/store";
import { useTypedSelector } from "../Calendar";

Chart.register(CategoryScale);

const categoryColors: { [key: string]: string } = {
    [Categories.Sports]: "rgba(59, 130, 246, 0.6)", 
    [Categories.Nutrition]: "rgba(16, 185, 129, 0.6)",
    [Categories.MentalHealth]: "rgba(139, 92, 246, 0.6)",
    [Categories.Learning]: "rgba(253, 230, 138, 0.6)",
    [Categories.Art]: "rgba(234, 179, 8, 0.6)"
}

const countHabitsByCategory = (habits: Habit[]) => {
    return habits.reduce((acc: { [key in Categories]: number }, habit) => {
      acc[habit.category] = (acc[habit.category] || 0) + 1;
      return acc;
    }, {} as { [key in Categories]: number }); 
  };

const ProgressPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { habits } = useTypedSelector((state) => state.habits);

  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "Number of Habits by Category",
        data: [],
        backgroundColor: []
      }
    ]
  });

  useEffect(() => {
      dispatch(getHabits());
    }, [dispatch]);

    useEffect(() => {
        if (habits.length > 0) {
          const habitsByCategory = countHabitsByCategory(habits);
          const categories = Object.keys(habitsByCategory);
          const habitCounts = Object.values(habitsByCategory);
    
          const backgroundColors = categories.map(
            (category) => categoryColors[category] || "rgba(0,0,0,0.6)"  // Default color for unknown categories
          );
    
          setChartData({
            labels: categories,
            datasets: [
              {
                label: "Number of Habits by Category",
                data: habitCounts,
                backgroundColor: backgroundColors
              }
            ]
          });
        }
      }, [habits]);

  return (
    <div className="my-10 w-2/3 m-auto">
      <PieChart chartData={chartData} />
    </div>
  );
};

export default ProgressPage;
