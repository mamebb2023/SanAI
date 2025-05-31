"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Button from "../shared/Button";
import { PiFlowerLotus } from "react-icons/pi";
import SimpleDecore from "../decorations/SimpleDecore";

const CTA = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div ref={ref} className="relative h-[110vh] w-full flex-center">
      <SimpleDecore isInView={isInView} />
      {/* Animated background elements */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 0.1 } : {}}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute size-[120vh] bg-white/80 blur-3xl rounded-full"
      />

      {/* Main spinning circles */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isInView ? 1 : 0 }}
        className="absolute size-[100vh] flex-center"
      >
        <div className="absolute size-full rounded-full border-2 border-blue-500" />
        <div className="absolute size-full rounded-full border-4 border-blue-500/80 blur-md" />
        <div className="absolute size-[80%] rounded-full border-2 border-cyan-500" />
        <div className="absolute size-[80%] rounded-full border-4 border-cyan-500/80 blur-md" />
        <div className="absolute size-[60%] rounded-full bg-gradient-to-br from-blue-900/60 to-cyan-900/80" />
      </motion.div>

      <motion.div
        animate={{
          rotate: 360,
          transition: {
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        className="absolute size-[100vh] flex-center"
      >
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
      </motion.div>

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
