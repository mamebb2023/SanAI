"use client";

import React from "react";
import { motion } from "framer-motion";
import Tag from "../shared/Tag";
import Link from "next/link";
import Button from "../shared/Button";
import HeroDecorations from "@/components/decorations/HeroDecorations";
import HeroImageDecorations from "@/components/decorations/HeroImageDecorations";
import { PiFlowerLotus } from "react-icons/pi";

const Hero = () => {
  return (
    <div className="relative flex-center pt-20 md:pt-40 px-5 md:px-20 lg:px-32">
      <HeroDecorations />

      {/* Main Content */}
      <div className="relative flex-1 flex-center flex-col gap-5 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="https://dexscreener.com/solana"
            target="_blank"
            className="btn"
          >
            <div className="flex items-center gap-2 bg-white/10 rounded-full py-2 px-3">
              <PiFlowerLotus className="text-2xl" />
              Get $San Now
            </div>
          </Link>
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

        <div
          className="hidden md:block z-20 absolute bottom-0 w-screen h-[80vh] lg:h-[110vh]"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, transparent 40%, #00032b 60%)",
          }}
        />

        <div
          className="md:hidden z-20 absolute bottom-0 w-screen h-screen"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, transparent 70%, #00032b 85%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="relative w-full max-w-5xl aspect-video my-10 md:my-16 p-8"
        >
          <HeroImageDecorations />
          <div className="relative size-full border-x border-t border-white/50 bg-white/10 backdrop-blur-sm inset-0 bg-[url('/dashboard.png')] bg-cover bg-no-repeat object-center object-contain rounded-xl md:rounded-2xl">
            <div className="absolute -inset-2 border-8 blur-sm"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
