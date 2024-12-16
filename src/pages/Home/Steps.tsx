import { useNavigate } from "react-router";
import Button from "../../components/ui/Button";

const Steps = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center my-20 mx-auto text-center lg:w-1/2">
      <h2 className="text-3xl font-bold mb-10 md:text-4xl">How It Works</h2>
      <ol className="list-decimal text-left text-lg space-y-5 m-auto mb-10 lg:w-2/3">
        <li>Sign up for free and create your personalized profile.</li>
        <li>Explore healthy locations and set goals on the calendar.</li>
        <li>
          Track your progress and adjust your habits with insights from our
          charts.
        </li>
      </ol>
      <Button
      isDisabled={false}
        handleClick={() => navigate("/signup")}
        type="primary"
        size="lg"
        textSize="text-lg"
      >
        Start Now
      </Button>
    </section>
  );
};

export default Steps;
