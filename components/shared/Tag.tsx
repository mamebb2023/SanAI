import Image from "next/image";
import React from "react";
import { PiFlowerLotusBold } from "react-icons/pi";

const Tag = ({
  children,
  decore = false,
}: {
  decore?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex-center">
      <div className="relative flex-center gap-2 my-5">
        {/* {decore && (
          <div className="absolute blur-2xl right-10 -translate-y-5 size-20 rounded-full bg-white bg -gradient-to-br from-cyan-500 to-blue-500" />
        )} */}

        {decore && (
          <Image
            src="/line-decore.png"
            width={755}
            height={188}
            className="w-[100px] opacity-60"
            alt="line-decore"
          />
        )}

        <div
          className={`relative flex-center px-4 py-2 bg-blue-500/20 rounded-xl border-x border-t overflow-hidden ${
            decore ? "border-white/50" : "border-white/30"
          }`}
        >
          <div
            className={`absolute top-0 -translate-y-3/4 size-[50px] bg-white rounded-full  ${
              decore ? "blur-[20px] -translate-x-1/2" : "blur-[35px]"
            }`}
          />

          <div className="relative flex-center gap-3">
            <PiFlowerLotusBold className="text-xl" />
            {children}
          </div>
        </div>

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
    </div>
  );
};

export default Tag;
