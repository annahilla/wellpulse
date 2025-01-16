import { CiCalendar, CiLocationOn } from "react-icons/ci";
import Card from "../../components/ui/Card";
import { PiChartPieSliceThin } from "react-icons/pi";
import { categoryColors } from "../../utils/categoryColors";
import { Categories } from "../../types/types";

const Cards = () => {
  return (
    <section className="mt-32">
      <h2 className="text-3xl font-bold text-center md:text-4xl">Features</h2>
      <div className="my-10 grid grid-cols-1 gap-10 mx-auto text-center md:grid-cols-3 xl:w-4/5">
        <Card
          page="/calendar"
          icon={<CiCalendar color={categoryColors[Categories.Learning]} />}
          title="Calendar Integration"
          text="Plan and manage your habits with an intuitive calendar that syncs
              seamlessly with your routine."
        />
        <Card
          page="/map"
          icon={<CiLocationOn color={categoryColors[Categories.Sports]} />}
          title="Interactive Map"
          text="Explore nearby healthy locations and customize your search with
              filters to find exactly what you need."
        />
        <Card
          page="/progress"
          icon={<PiChartPieSliceThin color={categoryColors[Categories.MentalHealth]} />}
          title="Progress Charts"
          text="Visualize your progress and stay motivated with clear and dynamic
              insights into your achievements."
        />
      </div>
    </section>
  );
};

export default Cards;
