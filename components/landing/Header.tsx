"use client";

import React, { useEffect, useState } from "react";
import Logo from "../shared/Logo";
import Link from "next/link";
import { links } from "@/constants";
import Button from "../shared/Button";

const Header = () => {
  const [y, setY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 z-50 px-20 w-full flex items-center border-b border-gray-500/30 transition-all duration-500 ${
        y > 100 ? "h-12 backdrop-blur-sm" : "h-[70px]"
      }`}
    >
      <div className="flex-between flex-1">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-bold">SanAI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="on-hover-underline tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/meet-doctor">
          <Button>Get Started</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
