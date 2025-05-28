"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PiFlowerLotus } from "react-icons/pi";
import { MdHealthAndSafety, MdAccessTime } from "react-icons/md";
import { FaUserShield, FaRobot, FaHeartbeat } from "react-icons/fa";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import Tag from "../shared/Tag";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.5,
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

  // useEffect(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: containerRef.current,
  //       start: "top top",
  //       end: "bottom center",
  //       pin: true,
  //     },
  //   });

  //   gsap.to(contentRef.current, {
  //     opacity: 1,
  //     duration: 0.5,
  //     scrollTrigger: {
  //       trigger: containerRef.current,
  //       start: "top top",
  //       end: "bottom top",
  //       toggleActions: "play none none reverse",
  //     },
  //   });

  //   tl.to(contentRef.current, {
  //     clipPath: "circle(100% at 50% 50%)",
  //     duration: 1.5,
  //     scrollTrigger: {
  //       trigger: containerRef.current,
  //       start: "top top",
  //       end: "bottom center",
  //       scrub: true,
  //       toggleActions: "play none none reverse",
  //     },
  //   });
  // }, []);

  return (
    <div ref={containerRef} id="features" className="relative min-h-screen">
      {/* <div className="absolute h-screen w-full flex-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <PiFlowerLotus className="text-[500px] text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
          className="absolute top-1/3 right-10 size-80 rounded-full bg-gradient-to-br from-blue-500/60 to-cyan-500/60 blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-1/2 left-10 size-80 rounded-full bg-gradient-to-br from-cyan-500/60 to-blue-500/60 blur-3xl"
        />
      </div> */}

      <motion.div
        // initial={{ opacity: 0 }}
        // animate={isInView ? { opacity: 1 } : {}}
        ref={contentRef}
        className="relative transition-all min-h-screen pt-14"
        style={
          {
            // clipPath: "circle(3% at 50% 50%)",
          }
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
          className="absolute top-1/3 left-10 size-80 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
          className="absolute bottom-1/3 right-10 size-80 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 blur-3xl"
        />
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
            <div
              key={index}
              className="p-4 w-80 rounded-xl border flex flex-wrap gap-3"
              style={{
                borderColor: `${feature.color}30`,
                background: `${feature.color}10`,
              }}
            >
              <div
                className="size-12 border rounded-xl flex-center"
                style={{ borderColor: `${feature.color}10` }}
              >
                {feature.icon}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                {feature.title}
                <span className="text-sm text-gray-400">
                  {feature.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Features;
