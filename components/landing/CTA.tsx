"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Button from "../shared/Button";
import { PiFlowerLotus } from "react-icons/pi";

const CTA = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="relative h-[110vh] w-full flex-center">
      {/* Animated background elements */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 0.1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute size-[120vh] bg-white blur-3xl rounded-full"
      />

      {/* Main spinning circles */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
          type: "spring",
          damping: 10,
          stiffness: 100,
        }}
        className="absolute size-[100vh] flex-center"
      >
        <motion.div
          animate={{
            rotate: 360,
            transition: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          className="absolute size-full rounded-full border-4 border-blue-500/60"
        />
        <motion.div
          animate={{
            rotate: -360,
            transition: {
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          className="absolute size-[80%] rounded-full border-2 border-cyan-500/60"
        />
        <div className="absolute size-[60%] rounded-full bg-gradient-to-br from-blue-900/60 to-cyan-900/60 backdrop-blur-sm" />
      </motion.div>

      {/* Decorative floating elements */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 0.3, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-1/4 left-1/4 size-40 rounded-full bg-blue-500 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 0.3, y: 0 } : {}}
        transition={{ delay: 0.7, duration: 1 }}
        className="absolute bottom-1/4 right-1/4 size-40 rounded-full bg-cyan-500 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 flex-center flex-col gap-6 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <PiFlowerLotus className="mx-auto text-6xl text-cyan-400/80" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-300"
        >
          Ready to Transform Your Health?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-cyan-100/80 max-w-2xl"
        >
          Join SanAI today and take the first step towards a healthier, more
          informed you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8"
        >
          <Link href="/consultation?utm_source=cta">
            <Button>Get Started</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CTA;
