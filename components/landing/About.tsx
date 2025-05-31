"use client";

import React from "react";
import Tag from "../shared/Tag";
import { motion, useInView } from "framer-motion";
import { ScrollParallax } from "react-just-parallax";
import { PiFlowerLotus } from "react-icons/pi";
import { FaLeaf, FaHeartbeat, FaBrain } from "react-icons/fa";
import SimpleDecore from "../decorations/SimpleDecore";

const AboutUs = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.4,
  });

  const coreValues = [
    {
      icon: <FaLeaf className="text-emerald-400" size={24} />,
      title: "Holistic Approach",
      description: "Treating mind and body as interconnected systems",
      color: "#00ff6e",
    },
    {
      icon: <FaHeartbeat className="text-rose-400" size={24} />,
      title: "Preventive Care",
      description: "Focusing on wellness before illness occurs",
      color: "#ff4632",
    },
    {
      icon: <FaBrain className="text-indigo-400" size={24} />,
      title: "Continuous Learning",
      description: "Evolving with the latest medical research",
      color: "#b049ff",
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full flex-center py-20 px-8"
    >
      <SimpleDecore isInView={isInView} />

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0 } : {}}
          transition={{ duration: 1.5 }}
          className="absolute -bottom-20 -left-20"
        >
          <PiFlowerLotus className="text-[600px] text-white/10" />
        </motion.div>

        <ScrollParallax isAbsolutelyPositioned strength={0.1}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 0.3, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"
          />
        </ScrollParallax>

        <ScrollParallax isAbsolutelyPositioned strength={0.1}>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 0.3, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 blur-3xl"
          />
        </ScrollParallax>
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <Tag decore>Our Mission</Tag>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200 leading-tight"
          >
            Revolutionizing healthcare <br />
            with compassionate AI
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-lg text-cyan-100 leading-relaxed">
              SanAI represents a new era in digital health - where artificial
              intelligence meets human-centered design to create personalized
              health experiences.
            </p>

            <p className="text-lg text-cyan-100 leading-relaxed">
              Born from the realization that millions lack access to timely
              medical guidance, we've built an AI companion that's available
              24/7 to provide reliable, empathetic health insights tailored to
              your unique needs.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="mx-auto p-4 rounded-xl border border-white/10 hover:border-cyan-400/30 transition-colors backdrop-blur-sm"
                  style={{
                    border: `1px solid ${value.color}50`,
                    background: `linear-gradient(to bottom right, ${value.color}05, ${value.color}30, ${value.color}05`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-white/5">
                      {value.icon}
                    </div>
                    <h3 className="font-medium text-white">{value.title}</h3>
                  </div>
                  <p className="text-sm text-cyan-100/80">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column - Visual element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative h-full min-h-[400px] rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm"
          >
            <div className="absolute inset-0 border-2 border-cyan-500/80 blur-md" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64">
                <motion.div
                  animate={{
                    rotate: 360,
                    transition: {
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  className="absolute inset-0 rounded-full border-t-2 border-b-2 border-cyan-400/30 shadow-sm shadow-white"
                />
                <motion.div
                  animate={{
                    rotate: -360,
                    transition: {
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  className="absolute inset-4 rounded-full border-l-2 border-r-2 border-blue-400/30"
                />
                <div className="absolute inset-8 flex items-center justify-center rounded-full bg-cyan-900/20 backdrop-blur-sm">
                  <div className="absolute size-10 bg-cyan-500 blur-xl" />
                  <PiFlowerLotus className="text-6xl text-cyan-400/80" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
