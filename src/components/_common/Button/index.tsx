import type { ReactNode } from "react";

export const buttonsConfig = {
  create: "w-165 h-50 bg-st-primary",
  lg: "w-200 h-80 bg-st-red",
  sm: {
    white: "w-115 h-40 bg-white",
    blue: "w-115 h-40 bg-st-primary",
    red: "w-115 h-40 bg-st-red",
    green: "w-115 h-40 bg-st-green",
  },
  sm2: "w-130 h-40 bg-st-primary",
  sm3: "w-160 h-40 bg-st-primary",
  md: "w-130 h-50 bg-st-red",
  modal: {
    white: "w-130 h-55 bg-white",
    blue: "w-130 h-55 bg-st-primary",
    red: "w-130 h-55 bg-st-red",
    green: "w-130 h-55 bg-st-green",
  },
};

interface buttonProps {
  children: ReactNode;
  buttonStyles: string;
}

const Button = ({ children, buttonStyles }: buttonProps) => {
  return (
    <button className={`${buttonStyles}  rounded-15 shadow-md`}>
      {children}
    </button>
  );
};

export default Button;
