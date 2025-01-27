import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale, ChartData } from "chart.js";
import { HabitCategories, Habit } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { getHabits } from "../../redux/habitsActions";
import { AppDispatch, RootState } from "../../redux/store";
import { useTypedSelector } from "../Calendar";
import { getLastNDays } from "../../utils/datesUtils";
import { categoryColors } from "../../utils/categoryColors";
import ChartComponent from "./Chart";
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";
import { useStartNow } from "../../hooks/useStartNow";

Chart.register(CategoryScale);

const ProgressPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.habits.loading);
  const { habits } = useTypedSelector((state) => state.habits);
  const handleStartNow = useStartNow();

  const [habitsByCategoryChartData, setHabitsByCategoryChartData] = useState<
    ChartData<"pie">
  >({
    labels: [],
    datasets: [],
  });

  const [completedHabitsChartData, setCompletedHabitsChartData] = useState<
    ChartData<"line">
  >({
    labels: [],
    datasets: [],
  });

  const [totalCompletedHabitsByCategory, setTotalCompletedHabitsByCategory] =
    useState<ChartData<"bar">>({
      labels: [],
      datasets: [],
    });

  const [habitPieCharts, setHabitPieCharts] = useState<
    { habitId: string, habitName: string; chartData: ChartData<"pie"> }[]
  >([]);

  const countHabitsByCategory = (habits: Habit[]) => {
    return habits.reduce((acc: { [key in HabitCategories]: number }, habit) => {
      acc[habit.category] = (acc[habit.category] || 0) + 1;
      return acc;
    }, {} as { [key in HabitCategories]: number });
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
    let totalEvents;

    const diffInTime = currentDate.getTime() - startDate.getTime();

    if (habit.frequency === "Daily") {
      totalEvents = Math.ceil(diffInTime / (1000 * 3600 * 24));
    } else if (habit.frequency === "Weekly") {
      totalEvents = Math.ceil(diffInTime / (1000 * 3600 * 24 * 7));
    } else {
      totalEvents = 0;
    }

    if (totalEvents < 0) totalEvents = 0;

    return totalEvents;
  };

  const calculatePieChartData = (habit: Habit) => {
    const totalEvents = totalEventsByHabit(habit);
    const completedEvents = habit.completedDays.length;
    const uncompletedEvents = totalEvents - completedEvents;

    const categoryColor = categoryColors[habit.category];
    const uncompletedColor = `rgba(${parseInt(
      categoryColor.slice(1, 3),
      16
    )}, ${parseInt(categoryColor.slice(3, 5), 16)}, ${parseInt(
      categoryColor.slice(5, 7),
      16
    )}, 0.3)`;

    return {
      labels: ["Completed Events", "Uncompleted Events"],
      datasets: [
        {
          data: [completedEvents, uncompletedEvents],
          backgroundColor: [categoryColor, uncompletedColor],
        },
      ],
    };
  };

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
          categoryDateCounts[category]?.[date]
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
        const totalCount =
          categoryDateCounts[category] === undefined
            ? 0
            : Object.values(categoryDateCounts[category]).reduce(
                (a, b) => a + b,
                0
              );

        return totalCount;
      });

      setTotalCompletedHabitsByCategory({
        labels: categories,
        datasets: [
          {
            data: completedPerCategory,
            backgroundColor: backgroundColors,
          },
        ],
      });

      const habitCharts = habits
        .filter((habit) => totalEventsByHabit(habit) > 0)
        .map((habit) => ({
          habitId: habit._id ? habit._id : crypto.randomUUID(),
          habitName: habit.name,
          chartData: calculatePieChartData(habit),
        }));
      setHabitPieCharts(habitCharts);
    }
  }, [habits]);

  if(loading) {
    return <Spinner />
  }

  return (
    <>
      {habits.length > 0 ? (
        <div className="mx-10 grid grid-cols-1 items-center gap-20 my-10 m-auto md:grid-cols-2 md:gap-10 lg:grid-cols-3">
          <ChartComponent
            chartType="pie"
            title="Habits scheduled by Category"
            subtitle="Number of habits scheduled by category"
            chartData={habitsByCategoryChartData}
          />
          <ChartComponent
            chartType="line"
            title="Completion of Habits"
            subtitle="Habits completed per category over the last 10 days"
            chartData={completedHabitsChartData}
          />
          <ChartComponent
            chartType="bar"
            title="Habits completed by Category"
            subtitle="Total of habits completed by category"
            chartData={totalCompletedHabitsByCategory}
          />
          {habitPieCharts.map(({ habitName, habitId, chartData }) => (
            <ChartComponent
              chartType="pie"
              key={habitId}
              title={habitName}
              subtitle={`Progress for ${habitName}`}
              chartData={chartData}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center min-h-56 px-4 m-auto text-center md:w-2/3 md:px-0">
          <p className="text-2xl font-bold">Ups...</p>
          <p className="text-lg">
            There are no charts available since there are no habits yet. To
            start tracking your progress create some habits first.
          </p>
          <Button
            size="sm"
            type="primary"
            textSize="text-md"
            isDisabled={false}
            handleClick={handleStartNow}
          >
            Create Habit
          </Button>
        </div>
      )}
    </>
  );
};

export default ProgressPage;
