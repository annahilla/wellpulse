import Cards from "./Cards";
import Hero from "./Hero";
import Steps from "./Steps";

const HomePage = () => {
  return (
    <div className="px-5 md:px-0">
      <Hero />
      <Cards />
      <Steps />
    </div>
  );
};

export default HomePage;
