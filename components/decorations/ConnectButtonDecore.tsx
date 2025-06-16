"use client";

import React from "react";
import { motion } from "framer-motion";

const ConnectButtonDecore = () => {
  return (
    <>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          duration: 1,
          type: "spring",
          delay: 0.4,
        }}
        className="absolute size-80 rounded-full border border-emerald-500"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          duration: 1,
          type: "spring",
          delay: 0.4,
        }}
        className="absolute size-80 rounded-full border-x-6 border-emerald-500 blur-sm slow-spin"
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          duration: 1,
          type: "spring",
          delay: 0.2,
        }}
        className="absolute size-60 rounded-full border border-lime-500"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          duration: 1,
          type: "spring",
          delay: 0.2,
        }}
        className="absolute size-60 rounded-full border-x-6 border-lime-500 blur-sm slow-spin"
        style={{ animationDirection: "reverse" }}
      />
    </>
  );
};

export default ConnectButtonDecore;
