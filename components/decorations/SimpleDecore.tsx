import React from "react";
import { motion } from "framer-motion";

const SimpleDecore = ({ isInView = false }: { isInView?: boolean }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 1 }}
        className="absolute top-1/3 left-10 size-80 rounded-full bg-gradient-to-br from-emerald-500/30 to-lime-500/30 md:blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 1 }}
        className="absolute bottom-1/ right-10 size-80 rounded-full bg-gradient-to-br from-lime-500/30 to-emerald-500/30 md:blur-3xl"
      />
    </>
  );
};

export default SimpleDecore;
