import { ReactElement } from "react";
import Button from "./Button";
import { useNavigate } from "react-router";

interface CardProps {
  title: string;
  text: string;
  icon: ReactElement;
  page: string;
}

const Card = ({ title, text, icon, page }: CardProps) => {
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    navigate(page);
  };

  return (
    <div className="px-7 py-10 shadow-lg rounded-lg">
      <div className="flex justify-center my-6 text-9xl text-green">{icon}</div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="my-8">{text}</p>
      <Button
        handleClick={() => handleNavigate(page)}
        buttonSize="sm"
        type="secondary"
        textSize="text-md"
      >
        See more
      </Button>
    </div>
  );
};

export default Card;
