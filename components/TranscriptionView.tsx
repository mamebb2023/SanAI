import useCombinedTranscriptions from "@/hooks/useCombinedTranscriptions";
import * as React from "react";
import { FaInfoCircle, FaRegUser } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "./shared/Logo";

export default function TranscriptionView() {
  const combinedTranscriptions = useCombinedTranscriptions();
  const containerRef = React.useRef<HTMLDivElement>(null);

  if (combinedTranscriptions.length <= 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-center flex-col gap-2 h-full text-emerald-700/80"
      >
        <FaInfoCircle />
        <p className="max-w-[150px] text-center">
          Talk to Dr. San to view the live chat.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div ref={containerRef} className="flex flex-col-reverse gap-2">
        {combinedTranscriptions.map((segment) => (
          <div
            id={segment.id}
            key={segment.id}
            className={`w-full flex gap-2 items-end ${
              segment.role === "assistant" ? "justify-start" : "justify-end"
            }`}
          >
            {segment.role === "assistant" && (
              <Logo containerClass="flex-shrink-0" />
            )}
            <div
              className={
                segment.role === "assistant"
                  ? "p-2 self-start fit-content border rounded-e-2xl rounded-t-2xl border-emerald-500 bg-white/10"
                  : "border rounded-s-2xl rounded-t-2xl border-emerald-500 text-emerald-950 bg-emerald-500/20 rounded-md p-2 self-end fit-content"
              }
            >
              {segment.text}
            </div>
            {segment.role !== "assistant" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-900 text-emerald-900 text-lg flex-center">
                <FaRegUser />
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
