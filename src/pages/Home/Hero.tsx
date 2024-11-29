import Button from "../../components/ui/Button";

const Hero = () => {
  return (
    <section className="my-4 flex flex-col items-center justify-center gap-10 m-auto text-center sm:my-16 md:w-2/3">
      <h1 className="text-3xl font-bold md:text-5xl lg:leading-relaxed">
        Empower Your Habits, <br />
        Transform Your Well-being
      </h1>
      <p className="text-lg text-darkGrey md:text-2xl lg:leading-relaxed">
        Discover healthy locations, organize your schedule with an intuitive
        calendar, and track your progress with dynamic charts. WellPulse is your
        ultimate tool for achieving balance and energy in your daily life.
      </p>
      <Button type="primary" buttonSize="lg" textSize="text-lg">
        Start Now
      </Button>
    </section>
  );
};

export default Hero;
