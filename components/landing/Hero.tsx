"use client";

import React from "react";
import { motion } from "framer-motion";
import Tag from "../shared/Tag";
import Link from "next/link";
import Button from "../shared/Button";
import { MouseParallax, ScrollParallax } from "react-just-parallax";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex-center pt-10 md:pt-40 px-5 md:px-20 lg:px-32">
      {/* Background Effects */}
      <div className="absolute inset-0 size-full flex-center overflow-hidden">
        <ScrollParallax isAbsolutelyPositioned strength={0.4}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1,
              type: "spring",
              bounce: 0.5,
              delay: 0.4,
            }}
            className="absolute flex-center top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl size-[500px] bg-gradient-to-br from-blue-500 to-cyan-500 rounded-b-full"
          />
        </ScrollParallax>

        <MouseParallax isAbsolutelyPositioned>
          <div className="absolute top-1/3 left-10 -translate-y-1/2 size-80 flex-center">
            <div className="absolute size-30 rounded-full bg-blue-500/80 blur-3xl" />
            <div
              className="absolute size-80 rounded-full"
              style={{
                background:
                  "url('/circle-dots.webp') no-repeat center center/cover",
              }}
            />
          </div>
        </MouseParallax>

        <MouseParallax isAbsolutelyPositioned strength={-0.1}>
          <div className="absolute top-1/2 right-10 size-80 flex-center">
            <div className="absolute size-30 rounded-full bg-cyan-500/80 blur-3xl" />
            <div
              className="absolute size-80 rounded-full"
              style={{
                background:
                  "url('/circle-dots.webp') no-repeat center center/contain",
              }}
            />
          </div>
        </MouseParallax>
      </div>

      {/* Main Content */}
      <div className="relative flex-1 flex-center flex-col gap-5">
        <Tag>Your AI Health Ally</Tag>

        <div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-7xl text-center"
            >
              Personalized care,
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-7xl text-center"
            >
              powered by AI
            </motion.p>
          </div>
        </div>

        <div className="text-gray-500">
          {`SanAI delivers instant, reliable, and tailored health insights — helping you take charge of your wellness journey. <br />Built to guide, not replace. Designed for everyone, everywhere.`
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
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 1 + index * 0.2 + wordIndex * 0.1,
                    }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </p>
            ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <Link href="/meet-doctor">
              <Button>Meet Doctor</Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <Link href="/#features">
              <Button variant="outline">Explore Features</Button>
            </Link>
          </motion.div>
        </div>

        {/* Hero Image */}
        <div className="relative h-[500px] w-full my-5 md:my-7 lg:my-14">
          <div className="absolute inset-0 flex-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="absolute size-full"
              style={{
                background: "url('/world.png') no-repeat center center/contain",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
