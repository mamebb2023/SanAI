"use client";

import React from "react";
import Tag from "../shared/Tag";
import { motion, useInView } from "framer-motion";
import { ScrollParallax } from "react-just-parallax";

const Features = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: "some", // Trigger when all content is in view
  });

  return (
    <div
      id="features"
      ref={containerRef}
      className="relative min-h-screen flex items-center gap-4 flex-col"
    >
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
      <Tag decore>Features</Tag>

      <div className="flex flex-col gap-5">
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: isInView ? 0 : "100%" }}
            transition={{ duration: 1 }}
            className="text-7xl text-center"
          >
            Lorem ipsum dolor sit
          </motion.p>
        </div>
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "100%" }}
            animate={{ y: isInView ? 0 : "100%" }}
            transition={{ duration: 1 }}
            className="text-7xl text-center"
          >
            amet consect
          </motion.p>
        </div>
      </div>

      <div className="text-gray-500">
        {"Lorem ipsum dolor sit amet, consectetur elit. Accusamus quis sequiesse aspernatur. <br />Corrupti id voluptatibus deleniti quam non neque."
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
                    delay: 0.5 + index * 0.2 + wordIndex * 0.1,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Features;
