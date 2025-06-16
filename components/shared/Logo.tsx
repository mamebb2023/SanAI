import React from "react";
import { PiFlowerLotusBold } from "react-icons/pi";

const Logo = ({ containerClass }: { containerClass?: string }) => {
  return (
    <div
      className={`size-10 text-2xl rounded-xl flex-center bg-gradient-to-b from-emerald-500 to-lime-500 text-white ${containerClass}`}
      style={{ boxShadow: "rgba(255, 255, 255, 0.7) -1px -1px 5px inset" }}
    >
      <PiFlowerLotusBold />
    </div>
  );
};

export default Logo;
