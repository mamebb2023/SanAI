import React from "react";
import Logo from "../shared/Logo";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiFlowerLotus, PiFlowerLotusBold } from "react-icons/pi";
import { links } from "@/constants";

const Footer = () => {
  const socials = [
    {
      name: "GitHub",
      link: "https://github.com/mamebb2023/",
    },
    {
      name: "X",
      link: "https://x.com/",
    },
  ];
  return (
    <div className="relative h-[60vh] overflow-hidden mt-10 border-t border-white/10 p-7 md:p-12 lg:p-20">
      <div className="absolute right-0 h-full flex items-center">
        <PiFlowerLotus className="text-[500px] text-white/10" />
      </div>

      <div className="absolute w-full left-1/2 -translate-x-1/2 -bottom-1/2 -translate-y-1/2 h-60 bg-gradient-to-r from-blue-500 via-blue-500 to-cyan-500 blur-3xl rounded-[50%]"></div>

      <div className="relative flex flex-col md:flex-row gap-7 ml-0 md:ml-10 lg:ml-20">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <Logo containerClass="size-12 text-3xl" />
            <span className="text-2xl">SanAI</span>
          </div>
          <p className="text-sm text-gray-500 max-w-80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            blanditiis provident aut cum praesentium, accusantium quas.
          </p>
          <div className="flex gap-3">
            {socials.map((link, index) => (
              <Link
                key={index}
                href={link.link}
                className="relative size-10 flex-center text-xl border-t border-l border-white/30 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 blur-md size-5 bg-cyan-300 rounded-full"></div>
                <div className="absolute right-0 bottom-0 blur-md size-5 bg-blue-500 rounded-full"></div>
                {getSocialIcon(link.name)}
              </Link>
            ))}
          </div>
        </div>

        {/* <div className="relative flex flex-col gap-3">
          <h1 className="gradient-underline">Quick Links</h1>
          <div className="flex flex-col gap-2 ml-2">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

function getSocialIcon(name: string) {
  // get from react icons
  switch (name) {
    case "GitHub":
      return <FaGithub />;
    case "X":
      return <FaXTwitter />;
    default:
      return <span className="text-gray-500">{name}</span>;
  }
}

export default Footer;
