import React from "react";
import { motion } from "framer-motion";
import { MouseParallax } from "react-just-parallax";

const HeroDecorations = () => {
  return (
    <>
      <div className="absolute inset-0 size-full flex-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.3,
            ease: "easeOut",
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-xl h-[500px] w-[500px] bg-gradient-to-br from-blue-500 to-cyan-500 rounded-b-full"
        />

        <MouseParallax isAbsolutelyPositioned>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-1/4 left-10 -translate-y-1/2 size-80 flex-center"
          >
            <div className="absolute size-30 rounded-full bg-blue-500 blur-3xl" />
            <div className="absolute size-80 rounded-full bg-[url('/circle-dots.webp')] bg-center bg-cover" />
          </motion.div>
        </MouseParallax>

        <MouseParallax isAbsolutelyPositioned strength={-0.1}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute top-10 right-10 size-80 flex-center"
          >
            <div className="absolute size-30 rounded-full bg-cyan-500 blur-3xl" />
            <div className="absolute size-80 rounded-full bg-[url('/circle-dots.webp')] bg-center bg-contain" />
          </motion.div>
        </MouseParallax>
      </div>
    </>
  );
};

export default HeroDecorations;
