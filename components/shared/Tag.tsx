"use client";

import Image from "next/image";
import React from "react";
import { PiFlowerLotusBold } from "react-icons/pi";
import { motion } from "framer-motion";

const Tag = ({
  children,
  decore = false,
}: {
  decore?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      className="flex-center"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative flex-center gap-2 my-5">
        {/* Decorative blurred gradient bubble (optional) */}
        {/* 
        {decore && (
          <div className="absolute blur-2xl right-10 -translate-y-5 size-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500" />
        )} 
        */}

        {/* Left line decoration */}
        {decore && (
          <Image
            src="/line-decore.png"
            width={755}
            height={188}
            className="w-[100px] opacity-60"
            alt="line-decore"
          />
        )}

        {/* Core tag content */}
        <div
          className={`relative flex-center px-4 py-2 bg-blue-400/30 rounded-xl border-x border-t overflow-hidden ${
            decore ? "border-white/50" : "border-white/30"
          }`}
        >
          {/* Inner glow */}
          <div
            className={`absolute top-0 -translate-y-3/4 size-[50px] bg-white rounded-full  ${
              decore ? "blur-[20px] -translate-x-1/2" : "blur-[35px]"
            }`}
          />

          {/* Tag icon + content */}
          <div className="relative flex-center gap-3">
            <PiFlowerLotusBold className="text-xl text-blue-100" />
            {children}
          </div>
        </div>

        {/* Right line decoration (mirrored) */}
        {decore && (
          <Image
            src="/line-decore.png"
            width={755}
            height={188}
            className="w-[100px] rotate-180 opacity-60"
            alt="line-decore"
          />
        )}
      </div>
    </motion.div>
  );
};

export default Tag;
