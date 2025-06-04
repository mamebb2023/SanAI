import React from "react";
import { motion } from "framer-motion";
import { MouseParallax } from "react-just-parallax";

const HeroDecorations = () => {
  return (
    <>
      

      <MouseParallax isAbsolutelyPositioned>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="z-50 absolute top-5 left-10 -translate-y-1/2 size-80 hidden md:flex flex-center"
        >
          <div className="absolute size-30 rounded-full bg-blue-500 blur-3xl" />
          <div className="hidden md:block absolute size-80 rounded-full bg-[url('/circle-dots.webp')] bg-center bg-cover" />
        </motion.div>
      </MouseParallax>

      <MouseParallax isAbsolutelyPositioned strength={-0.1}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute top-3 right-10 size-80 hidden md:flex flex-center"
        >
          <div className="absolute size-30 rounded-full bg-cyan-500 blur-3xl" />
          <div className="absolute size-80 rounded-full bg-[url('/circle-dots.webp')] bg-center bg-contain" />
        </motion.div>
      </MouseParallax>
    </>
  );
};

export default HeroDecorations;
