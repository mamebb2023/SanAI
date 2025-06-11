"use client";

import React from "react";
import Logo from "../shared/Logo";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiFlowerLotus } from "react-icons/pi";
import { motion } from "framer-motion";

const Footer = () => {
  const socials = [
    // {
    //   name: "GitHub",
    //   link: "https://github.com/mamebb2023/sanai",
    // },
    {
      name: "X",
      link: "https://x.com/Doctor_SanAi",
    },
  ];

  const quickLinks = [
    { label: "About", href: "/#about" },
    { label: "Features", href: "/#features" },
    { label: "Meet Doctor", href: "/consultation" },
    { label: "Privacy & Terms", href: "/legal" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="relative overflow-hidden mt-10 border-t border-white/10 p-7 md:p-12 lg:p-20">
      {/* Background elements */}
      <div className="absolute right-0 h-full flex items-center">
        <PiFlowerLotus className="text-[500px] text-white/10" />
      </div>
      <div className="absolute w-full left-1/2 -translate-x-1/2 -bottom-1/2 -translate-y-5 lg:-translate-y-1/4 h-60 bg-gradient-to-r from-blue-500 via-blue-500 to-cyan-500 blur-3xl rounded-[50%]" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true }}
        className="relative flex flex-col md:flex-row gap-7 ml-0 md:ml-10 lg:ml-20"
      >
        {/* Brand Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 max-w-sm flex-grow"
        >
          <div className="flex gap-2 items-center">
            <Logo containerClass="size-12 text-3xl" />
            <span className="text-2xl font-medium">SanAI</span>
          </div>
          <p className="text-sm text-gray-400">
            Your intelligent medical companion. SanAI combines cutting-edge AI
            with compassionate healthcare guidance to support your wellness
            journey.
          </p>
          <motion.div variants={containerVariants} className="flex gap-3 mt-2">
            {socials.map((link, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link
                  href={link.link}
                  target="_blank"
                  className="relative size-10 flex-center text-xl border-t border-l border-white/30 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                >
                  <div className="absolute top-0 left-0 blur-md size-5 bg-cyan-300 rounded-full" />
                  <div className="absolute right-0 bottom-0 blur-md size-5 bg-blue-500 rounded-full" />
                  {getSocialIcon(link.name)}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 flex-grow mb-6"
        >
          <motion.h3
            variants={itemVariants}
            className="text-lg font-medium relative w-max"
          >
            <span className="gradient-underline">Quick Links</span>
          </motion.h3>
          <motion.div
            variants={containerVariants}
            className="flex flex-col gap-2 ml-2"
          >
            {quickLinks.map((link, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-all duration-300 hover:pl-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Newsletter (Optional) */}
        <motion.div
          variants={itemVariants}
          className="hidden lg:flex flex-col gap-3 max-w-xs flex-grow"
        >
          <motion.h3
            variants={itemVariants}
            className="text-lg font-medium relative w-max"
          >
            <span className="gradient-underline">Stay Updated</span>
          </motion.h3>
          <motion.p variants={itemVariants} className="text-sm text-gray-400">
            Subscribe to our newsletter for health tips and updates.
          </motion.p>
          <motion.form variants={itemVariants} className="flex gap-2 mt-2">
            <input
              type="email"
              placeholder="Your email"
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full cursor-not-allowed"
              disabled={true}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity cursor-not-allowed"
              disabled={true}
            >
              Subscribe
            </button>
          </motion.form>
          <p className="text-gray-500 text-sm">comming soon...</p>
        </motion.div>
      </motion.div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-center w-full"
      >
        © {new Date().getFullYear()} SanAI. All rights reserved.
      </motion.div>
    </div>
  );
};

function getSocialIcon(name: string) {
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
