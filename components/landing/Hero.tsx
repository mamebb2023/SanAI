"use client";

import React from "react";
import { motion } from "framer-motion";
import Tag from "../shared/Tag";
import Link from "next/link";
import Button from "../shared/Button";
import { MouseParallax } from "react-just-parallax";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex-center pt-20 md:pt-40 px-5 md:px-20 lg:px-32 overflow-hidden">
      {/* Background Effects */}
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

        <MouseParallax isAbsolutelyPositioned strength={0.1}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-1/3 left-10 -translate-y-1/2 size-80 flex-center"
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
            className="absolute top-1/2 right-10 size-80 flex-center"
          >
            <div className="absolute size-30 rounded-full bg-cyan-500 blur-3xl" />
            <div className="absolute size-80 rounded-full bg-[url('/circle-dots.webp')] bg-center bg-contain" />
          </motion.div>
        </MouseParallax>
      </div>

      {/* Main Content */}
      <div className="relative flex-1 flex-center flex-col gap-5 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tag>Your AI Health Ally</Tag>
        </motion.div>

        <div className="text-center">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200"
            >
              Personalized care,
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-white"
            >
              Powered by{" "}
              <span className="text-transaprent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                SanAI
              </span>
            </motion.h1>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-gray-300 text-center max-w-2xl text-lg"
        >
          <p>SanAI delivers instant, reliable health insights</p>
          <p>Helping you take charge of your wellness journey</p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap justify-center gap-4 mt-6"
        >
          <Link href="/consultation?utm_source=hero">
            <Button className="px-8 py-3 text-lg">Meet Doctor</Button>
          </Link>
          <Link href="/#features">
            <Button variant="outline" className="px-8 py-3 text-lg">
              Explore Features
            </Button>
          </Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="relative w-full max-w-4xl aspect-video mt-10 md:mt-16"
        >
          <div className="absolute inset-0 bg-[url('/world.png')] bg-contain bg-center bg-no-repeat" />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
