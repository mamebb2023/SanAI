import useCombinedTranscriptions from "@/hooks/useCombinedTranscriptions";
import * as React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function TranscriptionView() {
  const combinedTranscriptions = useCombinedTranscriptions();
  const containerRef = React.useRef<HTMLDivElement>(null);

  if (combinedTranscriptions.length <= 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-center flex-col gap-2 h-full text-gray-500"
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
      <div ref={containerRef} className="flex items-end flex-col-reverse gap-2">
        {combinedTranscriptions.map((segment) => (
          <div
            id={segment.id}
            key={segment.id}
            className={
              segment.role === "assistant"
                ? "p-2 self-start fit-content border rounded-e-2xl rounded-t-2xl border-white bg-white/20"
                : "border rounded-s-2xl rounded-t-2xl border-cyan-500 bg-cyan-900 rounded-md p-2 self-end fit-content"
            }
          >
            {segment.text}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
