interface ButtonProps {
  children: React.ReactNode;
  textSize: "text-md" | "text-lg";
  buttonSize: "sm" | "lg";
  type: "primary" | "secondary";
}

const Button = ({ children, textSize, buttonSize, type }: ButtonProps) => {
  const basicButtonStyles = "rounded-md shadow hover:animate-pulse";
  let btnSize;

  if (buttonSize === "sm") {
    btnSize = "px-4 py-2";
  } else if (buttonSize === "lg") {
    btnSize = "px-7 py-4";
  }

  if (type === "primary") {
    return (
      <button
        className={`text-white bg-green ${btnSize} ${textSize} ${basicButtonStyles} `}
      >
        {children}
      </button>
    );
  }

  if (type === "secondary") {
    return (
      <button
        className={`border border-green text-green ${btnSize} ${textSize} ${basicButtonStyles}`}
      >
        {children}
      </button>
    );
  }
};

export default Button;
