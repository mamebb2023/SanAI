"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PiFlowerLotus } from "react-icons/pi";
import { MdHealthAndSafety, MdAccessTime } from "react-icons/md";
import { FaUserShield, FaRobot, FaHeartbeat } from "react-icons/fa";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import Tag from "../shared/Tag";
import SimpleDecore from "../decorations/SimpleDecore";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.4,
  });

  const features = [
    {
      title: "SanAI Health Insights",
      description:
        "Get personalized health recommendations powered by SanAI's advanced algorithms.",
      icon: <MdHealthAndSafety className="text-blue-400" size={30} />,
      color: "#0044ff",
    },
    {
      title: "24/7 SanAI Access",
      description:
        "Your SanAI companion is always available whenever you need health guidance.",
      icon: <MdAccessTime className="text-cyan-400" size={30} />,
      color: "#00c8ff",
    },
    {
      title: "Smart Wellness",
      description:
        "SanAI proactively suggests habits to improve your wellbeing.",
      icon: <FaHeartbeat className="text-emerald-400" size={26} />,
      color: "#00ffb7",
    },
    {
      title: "Privacy Protection",
      description:
        "SanAI keeps your health data completely confidential and secure.",
      icon: <FaUserShield className="text-violet-400" size={26} />,
      color: "#5d00ff",
    },
    {
      title: "AI-Powered Engine",
      description: "SanAI's advanced models provide precise health support.",
      icon: <FaRobot className="text-[#ffb700]" size={26} />,
      color: "#ffb700",
    },
  ];

  return (
    <div
      ref={containerRef}
      id="features"
      className="relative flex-center flex-col pt-14"
    >
      <SimpleDecore isInView={isInView} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Tag decore>Why Choose SanAI</Tag>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center max-w-4xl mx-auto mt-6"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200 leading-tight">
          Your AI Health Companion
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.8 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:text-xl text-cyan-100 mt-6"
        >
          SanAI combines cutting-edge technology with personalized care
        </motion.p>
      </motion.div>

      <div className="relative flex justify-center gap-3 flex-wrap max-w-5xl mx-auto mt-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ y: 10, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 + 0.2 * index }}
            className="p-4 w-[40%] md:w-80 rounded-xl border flex flex-wrap gap-3 backdrop-blur-sm"
            style={{
              borderColor: `${feature.color}50`,
              background: `${feature.color}10`,
            }}
          >
            <div className="flex flex-1 gap-2 items-center">
              <div
                className="size-12 border rounded-xl flex-center flex-shrink-0"
                style={{ borderColor: `${feature.color}40` }}
              >
                {feature.icon}
              </div>
              {feature.title}
            </div>

            <span className="text-xs text-gray-400">{feature.description}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
