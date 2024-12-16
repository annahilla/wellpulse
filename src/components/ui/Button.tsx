interface ButtonProps {
  children: React.ReactNode;
  textSize: "text-md" | "text-lg";
  size: "sm" | "lg";
  type: "primary" | "secondary" | "alert";
  handleClick?: () => void;
  isDisabled: boolean, 
}

const Button = ({
  children,
  textSize,
  size,
  type,
  isDisabled,
  handleClick,
}: ButtonProps) => {
  const basicButtonStyles = "rounded-md shadow outline-0";
  const pulseAnimation = !isDisabled ? "hover:animate-pulse" : "";
  let btnSize;

  if (size === "sm") {
    btnSize = "px-4 py-2";
  } else if (size === "lg") {
    btnSize = "px-7 py-4";
  }

  if (type === "primary") {
    return (
      <button
      type={handleClick ? "button" : "submit"}
      onClick={handleClick}
      disabled={isDisabled}
        className={`text-white bg-green ${btnSize} ${textSize} ${basicButtonStyles} ${pulseAnimation} `}
      >
        {children}
      </button>
    );
  }

  if (type === "secondary") {
    return (
      <button
      type={handleClick ? "button" : "submit"}
        onClick={handleClick}
        disabled={isDisabled}
        className={`border border-green text-green ${btnSize} ${textSize} ${basicButtonStyles}`}
      >
        {children}
      </button>
    );
  }

  if (type === "alert") {
    return (
      <button
      type="button"
        onClick={handleClick}
        disabled={isDisabled}
        className={`text-white bg-red-700 ${btnSize} ${textSize} ${basicButtonStyles} `}
      >
        {children}
      </button>
    );
  }
};

export default Button;
