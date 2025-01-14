import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "../../components/charts/PieChart";
import { Categories, Habit } from "../../types/types";
import { useDispatch } from "react-redux";
import { getHabits } from "../../redux/habitsActions";
import { AppDispatch } from "../../redux/store";
import { useTypedSelector } from "../Calendar";
import { getLastNDays } from "../../utils/getLastNDays";
import LineChart from "../../components/charts/LineChart";

Chart.register(CategoryScale);

const categoryColors: { [key: string]: string } = {
    [Categories.Sports]: "rgba(59, 130, 246, 0.6)", 
    [Categories.Nutrition]: "rgba(16, 185, 129, 0.6)",
    [Categories.MentalHealth]: "rgba(139, 92, 246, 0.6)",
    [Categories.Learning]: "rgba(253, 230, 138, 0.6)",
    [Categories.Art]: "rgba(234, 179, 8, 0.6)"
}

const ProgressPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { habits } = useTypedSelector((state) => state.habits);

    const countHabitsByCategory = (habits: Habit[]) => {
      return habits.reduce((acc: { [key in Categories]: number }, habit) => {
        acc[habit.category] = (acc[habit.category] || 0) + 1;
        return acc;
      }, {} as { [key in Categories]: number }); 
    };

    const getCompletedHabitsPerCategoryAndDate = (habits: Habit[]) => {
      const categoryDateCount: { [key: string]: { [key: string]: number } } = {};
  
      habits.forEach(habit => {
        habit.completedDays.forEach(date => {
          if (!categoryDateCount[habit.category]) {
            categoryDateCount[habit.category] = {};
          }
          
          if (!categoryDateCount[habit.category][date]) {
            categoryDateCount[habit.category][date] = 1;
          } else {
            categoryDateCount[habit.category][date]++;
          }
        });
      });
  
      return categoryDateCount;
    };
  

  const [habitsByCategoryChartData, setHabitsByCategoryChartData] = useState<any>({
    labels: [],
    datasets: []
  });

  const [completedHabitsChartData, setCompletedHabitsChartData] = useState<any>({
    labels: [], 
    datasets: [],
  });

  useEffect(() => {
      dispatch(getHabits());
    }, [dispatch]);

    useEffect(() => {
        if (habits.length > 0) {
          const habitsByCategory = countHabitsByCategory(habits);
          const categories = Object.keys(habitsByCategory);
          const habitCounts = Object.values(habitsByCategory);
          const categoryDateCounts = getCompletedHabitsPerCategoryAndDate(habits);

          const backgroundColors = categories.map(
            (category) => categoryColors[category] || "rgba(0,0,0,0.6)"
          );
          
          const last10Days = getLastNDays(10); 
          
          const datasets = categories.map((category) => {
            const categoryData = last10Days.map(date => categoryDateCounts[category] && categoryDateCounts[category][date] ? categoryDateCounts[category][date] : 0);
            
            return {
              label: category,
              data: categoryData,
              backgroundColor: categoryColors[category],
              borderColor: categoryColors[category],
              fill: false,
              tension: 0.1,
            };
          });

          setHabitsByCategoryChartData({
            labels: categories,
            datasets: [
              {
                data: habitCounts,
                backgroundColor: backgroundColors
              }
            ]
          });

          setCompletedHabitsChartData({
            labels: last10Days,
            datasets: datasets,
          })
        }
      }, [habits]);

  return (
    <div className="grid grid-cols-2 items-center gap-10 my-10 w-2/3 m-auto">
        <PieChart title="Habits by Category" subtitle="Number of habits scheduled by category" chartData={habitsByCategoryChartData} />
        <LineChart title="Completion of Habits By Category" subtitle="Habits completed per category over the last 10 days" chartData={completedHabitsChartData} />
    </div>
  );
};

export default ProgressPage;
