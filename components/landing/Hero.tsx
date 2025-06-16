"use client";

import React from "react";
import { motion } from "framer-motion";
import Tag from "../shared/Tag";
import Link from "next/link";
import Button from "../shared/Button";
import HeroImageDecorations from "@/components/decorations/HeroImageDecorations";
import { PiFlowerLotus } from "react-icons/pi";
import { MouseParallax } from "react-just-parallax";

const Hero = () => {
  return (
    <div className="relative flex-center pt-20 md:pt-40 px-5 md:px-20 lg:px-32 min-h-[90vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.3,
          ease: "easeOut",
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-xl size-[300px] md:size-[500px] bg-gradient-to-br from-emerald-500 to-lime-500 rounded-b-full"
      />
      {/* Main Content */}
      <div className="relative flex-1 flex-center flex-col gap-5 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* <Link
            href="https://dexscreener.com/solana/HoBiaRFDSPG55JUTSradG7nbkg6zWeSTnytKsezbpump"
            target="_blank"
            className="btn"
          > */}
          {/* <div className="flex items-center gap-2 bg-white/30 rounded-full py-2 px-3">
            <PiFlowerLotus className="text-2xl" />
            Your Personal AI Doctor
          </div> */}
          <Tag>Your Personal AI Doctor</Tag>
          {/* </Link> */}
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
              className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-emerald-600"
            >
              Personalized care,
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-600 to-black">
                Powered by{" "}
              </span>
              <span className="text-transparent bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text">
                SanAI
              </span>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-gray-800 text-center max-w-2xl text-lg"
        >
          <p>SanAI delivers instant, reliable health insights</p>
          <p>Helping you take charge of your wellness journey</p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="relative z-30 flex flex-wrap justify-center gap-4 mt-6"
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

        <MouseParallax isAbsolutelyPositioned>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="z-50 absolute top-5 left-10 -translate-y-1/2 size-80 hidden md:flex flex-center"
          >
            <div className="absolute size-30 rounded-full bg-emerald-500 blur-3xl" />
            <div className="hidden md:block absolute size-80 rounded-full bg-[url('/circle-dots.webp')] bg-center bg-cover invert" />
          </motion.div>
        </MouseParallax>

        <MouseParallax isAbsolutelyPositioned strength={-0.1}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute top-3 right-10 size-80 hidden md:flex flex-center"
          >
            <div className="absolute size-30 rounded-full bg-lime-500 blur-3xl" />
            <div className="absolute size-80 rounded-full bg-[url('/circle-dots.webp')] bg-center bg-contain invert" />
          </motion.div>
        </MouseParallax>
      </div>
    </div>
  );
};

export default Hero;
