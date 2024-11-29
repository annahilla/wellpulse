import { ReactElement } from "react";
import Button from "./Button";

interface CardProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Card = ({ title, text, icon }: CardProps) => {
  return (
    <div className="px-7 py-10 shadow-lg rounded-lg">
      <div className="flex justify-center my-6 text-9xl text-green">{icon}</div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="my-8">{text}</p>
      <Button buttonSize="sm" type="secondary" textSize="text-md">
        See more
      </Button>
    </div>
  );
};

export default Card;
