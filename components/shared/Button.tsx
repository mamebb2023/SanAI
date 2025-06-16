import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "default" | "outline";
  children?: React.ReactNode;
}

const Button = ({
  className,
  children,
  variant = "default",
  ...props
}: Props) => {
  const containerClass =
    variant === "outline"
      ? "py-[10px] border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500/10"
      : "py-[12px] text-white bg-gradient-to-br from-emerald-500 to-lime-500 hover:shadow-sm shadow-white/40";
  return (
    <button
      className={`${className} ${containerClass} px-5 rounded-xl transition-all cursor-pointer active:scale-95 hover:scale-105`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
