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
          className={`relative flex-center px-4 py-2 bg-emerald-400/30 backdrop-blur-sm rounded-xl border-x border-t overflow-hidden ${
            decore ? "border-white/50" : "border-white/30"
          }`}
        >
          {/* Inner glow */}
          <div
            className={`absolute top-0 -translate-y-3/4 size-[50px] bg-white rounded-full blur-[35px]`}
          />
          <div
            className={`absolute right-0 size-[50px] bg-lime-500 rounded-full blur-[35px]`}
          />
          <div
            className={`absolute left-0 size-[50px] bg-emerald-500 rounded-full blur-[35px]`}
          />

          {/* Tag icon + content */}
          <div className="relative flex-center gap-3">
            <PiFlowerLotusBold className="text-2xl text-emerald-900" />
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
