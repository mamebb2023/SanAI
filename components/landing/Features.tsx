"use client";

import React from "react";
import Tag from "../shared/Tag";
import { motion, useInView } from "framer-motion";
import { ScrollParallax } from "react-just-parallax";
import { MdHealthAndSafety, MdAccessTime } from "react-icons/md";
import { FaUserShield, FaHeartbeat, FaRobot } from "react-icons/fa";

const Features = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.5,
  });

  const features = {
    small: [
      {
        title: "Personalized Insights",
        description:
          "Receive AI-driven health advice tailored to your unique profile and lifestyle.",
        icon: <MdHealthAndSafety size={40} className="text-blue-400" />,
      },
      {
        title: "24/7 Accessibility",
        description:
          "Your health companion, always available — anytime, anywhere.",
        icon: <MdAccessTime size={40} className="text-blue-400" />,
      },
      {
        title: "Smart Wellness Guidance",
        description:
          "Track and improve your habits with proactive suggestions.",
        icon: <FaHeartbeat size={30} className="text-cyan-400" />,
      },
      {
        title: "Privacy-First Design",
        description:
          "Your data, your control. We ensure complete confidentiality.",
        icon: <FaUserShield size={30} className="text-cyan-400" />,
      },
      {
        title: "AI-Powered Engine",
        description: "Built on advanced models for precision health support.",
        icon: <FaRobot size={30} className="text-cyan-400" />,
        comingSoon: true,
      },
    ],
  };

  return (
    <div id="features" ref={containerRef} className="relative">
      <ScrollParallax isAbsolutelyPositioned strength={0.3}>
        <div className="absolute top-1/3 right-10 -translate-y-1/2 size-80 flex-center">
          <div className="absolute size-30 rounded-full bg-blue-500/80 blur-3xl" />

          <div
            className="absolute size-80 rounded-full"
            style={{
              background:
                "url('/circle-dots.webp') no-repeat center center/cover",
            }}
          />
        </div>
      </ScrollParallax>
      <ScrollParallax isAbsolutelyPositioned>
        <div className="absolute top-1/2 left-10 size-80 flex-center">
          <div className="absolute size-30 rounded-full bg-cyan-500/80 blur-3xl" />

          <div
            className="absolute size-80 rounded-full"
            style={{
              background:
                "url('/circle-dots.webp') no-repeat center center/contain",
            }}
          />
        </div>
      </ScrollParallax>

      <div className="relative flex items-center gap-5 flex-col">
        <Tag decore>Features</Tag>

        <div className="flex flex-col gap-2">
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: isInView ? 0 : "100%" }}
              transition={{ duration: 1 }}
              className="text-7xl text-center"
            >
              Empowering your health
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: isInView ? 0 : "100%" }}
              transition={{ duration: 1, delay: 0.2 }} // Added a slight delay
              className="text-7xl text-center"
            >
              with SanAI
            </motion.p>
          </div>
        </div>

        <div className="text-gray-500">
          {"SanAI is a cutting-edge AI solution designed to deliver personalized, reliable, and accessible health insights — anytime, anywhere.<br />Our mission is to empower individuals with tools that support smarter decisions and proactive wellness."
            .split("<br />")
            .map((line, index) => (
              <p
                key={index}
                className="overflow-hidden flex-center gap-1 text-center"
              >
                {line.split(" ").map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    className=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isInView ? 1 : 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + index * 0.2 + wordIndex * 0.05, // Adjusted delay for a smoother staggered effect
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            ))}
        </div>

        <div className="relative flex flex-col gap-3 my-5 md:my-10 w-[90%] md:w-[80%] lg:w-[70%]">
          <div className="absolute bottom-1/3 left-1/2 size-60 rounded-full bg-blue-800 blur-[150px]" />
          <div className="relative flex justify-center gap-3 flex-wrap">
            {features.small.map((feature, index) => (
              <motion.div // Apply motion to the feature card
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
                transition={{
                  duration: 0.7,
                  delay: 0.6 + index * 0.1, // Staggered delay for each card
                }}
                className="size-[250px] flex gap-2 flex-col rounded-xl bg-gradient-to-bl from-cyan-950 via-blue-950 to-transparent p-5"
              >
                <div className="flex-1 flex items-center justify-center">
                  {feature.icon}
                </div>

                <div className="space-y-2">
                  <p className="">{feature.title}</p>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Features;
