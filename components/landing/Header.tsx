"use client";

import React, { useEffect, useState, useRef } from "react";
import Logo from "../shared/Logo";
import Link from "next/link";
import { links } from "@/constants";
import Button from "../shared/Button";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }
      if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          ref={headerRef}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.7 },
          }}
          exit={{ y: "-100%", opacity: 0 }}
          className={`fixed top-2 left-0 z-50 w-full flex-center px-3 md:px-7 lg:px-10`}
        >
          <div className="flex-between flex-1 max-w-5xl backdrop-blur-sm mx-auto bg-white/10 border border-white/20 rounded-full py-1 px-4 sm:px-8 md:px-20">
            <Link href="/" className="flex items-center gap-2">
              <Logo />
              <span className="font-bold">SanAI</span>
            </Link>

            <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="on-hover-underline tracking-wide hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link href="/consultation?utm_source=header">
              <Button className="scale-90 hover:scale-95">Try Now</Button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Header;
