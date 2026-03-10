"use client";

import Link from "next/link";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Press_Start_2P, VT323 } from "next/font/google";

const pixelHeader = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const pixelBody = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/topics", label: "Topics" },
  { href: "/", label: "Upcoming Leaderboard" },
  { href: "/", label: "Upcoming Streaks" },
];

const Footer = () => {
  const container = useRef(null);

  useGSAP(() => {
    gsap.to(".press-start", {
      opacity: 0.3,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "steps(1)",
    });
  }, { scope: container });

  return (
    <footer
      ref={container}
      className={`${pixelBody.className} border-t-8 border-green-500 bg-black px-4 py-10 text-white sm:px-6 lg:px-10`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          <div className="border-4 border-green-500 bg-[#081820] p-5 shadow-[8px_8px_0_0_#4ade80]">
            <h2 className={`${pixelHeader.className} text-sm text-green-400 sm:text-base`}>DSA QUIZ</h2>
            <p className="mt-4 text-xl leading-relaxed text-green-100 sm:text-2xl">
              Retro-styled DSA practice that turns revision into short, structured missions.
            </p>
          </div>

          <div className="border-4 border-cyan-400 bg-[#06131a] p-5 shadow-[8px_8px_0_0_#22d3ee]">
            <h2 className={`${pixelHeader.className} text-sm text-cyan-300 sm:text-base`}>QUICK LINKS</h2>
            <div className="mt-4 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xl text-cyan-100 transition-colors hover:text-cyan-300 sm:text-2xl"
                >
                  {`> ${link.label}`}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-4 border-pink-400 bg-[#170913] p-5 shadow-[8px_8px_0_0_#f472b6]">
            <h2 className={`${pixelHeader.className} text-sm text-pink-300 sm:text-base`}>CONNECT</h2>
            <div className="mt-4 space-y-3 text-xl text-pink-100 sm:text-2xl">
              <p>GitHub-ready project structure</p>
              <p>Progress-driven product roadmap</p>
              <p>More social systems coming soon</p>
            </div>
          </div>
        </div>

        <hr className="my-8 border-green-900" />

        <div className="flex flex-col items-center gap-5 text-center">
          <p className="text-base text-green-500 sm:text-lg">
            {"(c) 2026 PixelDSA. Built with logic, coffee, and late-night debugging."}
          </p>
          <h3 className={`${pixelHeader.className} press-start text-sm tracking-widest text-green-400 sm:text-lg`}>
            PRESS LOGIN TO CONTINUE...
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
