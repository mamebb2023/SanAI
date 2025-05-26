"use client";

import React from "react";
import Tag from "../shared/Tag";
import { motion, useInView } from "framer-motion"; // Import useInView
import { ScrollParallax } from "react-just-parallax";
import { PiFlowerLotus } from "react-icons/pi";

const AboutUs = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true, // Animation triggers only once when it enters view
    amount: 0.4, // Percentage of the element that needs to be visible to trigger
  });

  // Variant for staggered text animation
  const textVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Variant for the main content block
  const contentBlockVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, delay: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div
      id="about"
      ref={containerRef}
      className="relative mt-20 h-screen flex-center overflow-hidden"
    >
      {/* Parallax Backgrounds */}
      <ScrollParallax isAbsolutelyPositioned strength={0.3}>
        <motion.div
          className="absolute top-1/4 left-10 size-72 flex-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="absolute size-28 rounded-full bg-purple-500/70 blur-3xl" />
          <div
            className="absolute size-72 rounded-full"
            style={{
              background:
                "url('/circle-dots.webp') no-repeat center center/cover",
            }}
          />
        </motion.div>
      </ScrollParallax>

      <ScrollParallax isAbsolutelyPositioned>
        <motion.div
          className="absolute bottom-1/4 right-10 size-72 flex-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="absolute size-28 rounded-full bg-indigo-500/70 blur-3xl" />
          <div
            className="absolute size-72 rounded-full"
            style={{
              background:
                "url('/circle-dots.webp') no-repeat center center/contain",
            }}
          />
        </motion.div>
      </ScrollParallax>

      <div className="absolute bottom-0 h-full flex items-center">
        <PiFlowerLotus className="text-[500px] text-white/10" />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center gap-5 text-center px-4 z-10">
        {" "}
        {/* Added z-10 for layering */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Tag decore>About Us</Tag>
        </motion.div>
        <div className="flex flex-col gap-2">
          <div className="overflow-hidden">
            <motion.h2
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-7xl font-bold text-white"
            >
              Meet SanAI
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-7xl font-bold text-white"
            >
              Your AI Health Companion
            </motion.h2>
          </div>
        </div>
        <div className="text-gray-400 mt-4 space-y-2 max-w-2xl">
          {[
            "SanAI is a cutting-edge AI solution that delivers personalized, reliable, and accessible health insights — anytime, anywhere.",
          ].map((line, index) => (
            <motion.p
              key={index}
              className="text-center text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.7, delay: 0.6 + index * 0.2 }}
            >
              {line}
            </motion.p>
          ))}
        </div>
        <motion.div
          className="relative mt-10 w-[90%] md:w-[80%] lg:w-[60%] rounded-xl p-6 bg-gradient-to-tr from-cyan-950 via-blue-950 to-transparent shadow-xl space-y-4 border border-blue-700/50"
          variants={contentBlockVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="text-xl text-white font-semibold">Why We Exist</p>
          <p className="text-gray-300 text-base leading-relaxed">
            Millions lack access to timely, accurate, and personalized medical
            guidance. **SanAI** bridges that gap — not by replacing doctors, but
            by being the first step in your health journey. With **empathy**,
            **data**, and **intelligence** at its core, SanAI offers insights
            tailored to you, empowering you to take control of your well-being.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
