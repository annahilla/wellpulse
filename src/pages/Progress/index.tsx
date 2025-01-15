import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale, ChartData } from "chart.js";
import PieChart from "../../components/charts/PieChart";
import { Categories, Habit } from "../../types/types";
import { useDispatch } from "react-redux";
import { getHabits } from "../../redux/habitsActions";
import { AppDispatch } from "../../redux/store";
import { useTypedSelector } from "../Calendar";
import { getLastNDays } from "../../utils/getLastNDays";
import LineChart from "../../components/charts/LineChart";
import BarChart from "../../components/charts/BarChart";

Chart.register(CategoryScale);

const categoryColors: { [key: string]: string } = {
  [Categories.Sports]: "#a3e635",
  [Categories.Nutrition]: "#2E7D32",
  [Categories.MentalHealth]: "#e96f41",
  [Categories.Learning]: "#FFC107",
  [Categories.Art]: "#65a30d",
};

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

    habits.forEach((habit) => {
      habit.completedDays.forEach((date) => {
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

  const totalEventsByHabit = (habit: Habit) => {
    const startDate = new Date(habit.date);
    const currentDate = new Date();

    const diffInTime = currentDate.getTime() - startDate.getTime();
    const totalEvents = Math.floor(diffInTime / (1000 * 3600 * 24));
    console.log(habit.name, totalEvents);
    return totalEvents;
  }

 useEffect(()=> {
  habits.map(habit => {
    return totalEventsByHabit(habit);
  })
 }, [habits])

  const [habitsByCategoryChartData, setHabitsByCategoryChartData] =
    useState<ChartData<'pie'>>({
      labels: [],
      datasets: [],
    });

  const [completedHabitsChartData, setCompletedHabitsChartData] = useState<ChartData<'line'>>(
    {
      labels: [],
      datasets: [],
    }
  );

  const [totalCompletedHabitsByCategory, setTotalCompletedHabitsByCategory] = useState<ChartData<'bar'>>(
    {
      labels: [],
      datasets: [],
    }
  )

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

      setHabitsByCategoryChartData({
        labels: categories,
        datasets: [
          {
            data: habitCounts,
            backgroundColor: backgroundColors,
          },
        ],
      });

      const last10Days = getLastNDays(10);

      const habitsLast10Days = categories.map((category) => {
        const categoryData = last10Days.map((date) =>
          categoryDateCounts[category] && categoryDateCounts[category][date]
            ? categoryDateCounts[category][date]
            : 0
        );

        return {
          label: category,
          data: categoryData,
          backgroundColor: categoryColors[category],
          borderColor: categoryColors[category],
          fill: false,
          tension: 0.1,
        };
      });

      setCompletedHabitsChartData({
        labels: last10Days,
        datasets: habitsLast10Days,
      });

      const completedPerCategory = categories.map((category) => {
        const totalCount = categoryDateCounts[category] === undefined ? 0 : Object.values(categoryDateCounts[category]).reduce((a, b) => a + b, 0);

        return totalCount;
      });

      setTotalCompletedHabitsByCategory({
        labels: categories,
        datasets: [{
          data: completedPerCategory,
          backgroundColor: backgroundColors
        }]
      });
    }
  }, [habits]);

  return (
    <div className="grid grid-cols-1 items-center gap-20 my-10 w-2/3 m-auto md:grid-cols-2 md:gap-10">
      <PieChart
        title="Habits scheduled by Category"
        subtitle="Number of habits scheduled by category"
        chartData={habitsByCategoryChartData}
      />
      <LineChart
        title="Completion of Habits"
        subtitle="Habits completed per category over the last 10 days"
        chartData={completedHabitsChartData}
      />
      <BarChart 
        title="Habits completed by Category"
        subtitle="Total of habits completed by category"
        chartData={totalCompletedHabitsByCategory}
      />
    </div>
  );
};

export default ProgressPage;
