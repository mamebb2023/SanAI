import Logo from "@/components/shared/Logo";
import { FiUser } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="relative h-screen flex">
      <div className="absolute bottom-0 left-0 size-60 bg-cyan-700 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 size-60 bg-blue-700 rounded-full blur-3xl" />

      <div className="flex-1 relative flex flex-col">
        {/* top icons */}
        <div className="h-[60px] bg-white/20 flex justify-between items-center px-4">
          <Logo />

          <div className="flex-center p-2 border rounded-xl text-xl">
            <FiUser />
          </div>
        </div>

        <div className="flex-1 flex">
          {/* side icons */}
          <div className="bg-white/20 w-[60px] h-full flex flex-col justify-between items-center py-4">
            <div className="">t</div>

            <div className="text-xl">
              <Link
                href="/"
                className="flex-center p-2 border border-transparent hover:border-white/30 rounded-xl text-xl transition-all"
              >
                <GoHomeFill />
              </Link>
            </div>
          </div>

          {/* main */}
          <div className="flex-1">m</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
