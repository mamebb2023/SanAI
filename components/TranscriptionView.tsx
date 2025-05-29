import useCombinedTranscriptions from "@/hooks/useCombinedTranscriptions";
import * as React from "react";

export default function TranscriptionView() {
  const combinedTranscriptions = useCombinedTranscriptions();
  const containerRef = React.useRef<HTMLDivElement>(null);

  // scroll to bottom when new transcription is added
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [combinedTranscriptions]);

  console.log(combinedTranscriptions);

  if (combinedTranscriptions.length <= 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Talk to Dr. San to view the live chat.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={containerRef} className="flex flex-col gap-2">
        {combinedTranscriptions.map((segment) => (
          <div
            id={segment.id}
            key={segment.id}
            className={
              segment.role === "assistant"
                ? "p-2 self-start fit-content"
                : "bg-cyan-900 rounded-md p-2 self-end fit-content"
            }
          >
            {segment.text}
          </div>
        ))}
      </div>
    </div>
  );
}
