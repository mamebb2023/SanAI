import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
}

const Button = ({ className, children, ...props }: Props) => {
  return (
    <button
      className={`${className} px-5 py-[10px] bg-gradient-to-b from-cyan-500 to-blue-500 rounded-md transition-all hover:scale-105 cursor-pointer shadow-effect`}
      style={{ boxShadow: "rgba(255, 255, 255, 0.5) 0 3px 3px 1px inset" }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
