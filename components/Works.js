"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Press_Start_2P, VT323 } from "next/font/google";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

const steps = [
  {
    number: "01",
    title: "Create Account",
    description: "Log in and save your journey so your progress, unlocked missions, and future rewards stay attached to your profile.",
  },
  {
    number: "02",
    title: "Pick A Topic",
    description: "Choose a DSA world like arrays, sorting, or trees and enter a guided sequence instead of random disconnected questions.",
  },
  {
    number: "03",
    title: "Clear Missions",
    description: "Solve batch-based quiz missions, review explanations, and keep moving through increasingly harder checkpoints.",
  },
  {
    number: "04",
    title: "Level Up",
    description: "Track completion, unlock harder content, and build the habit of coming back for short, useful practice sessions.",
  },
];

const Works = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".work-card", {
        y: 48,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });

      gsap.fromTo(
        ".work-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top 65%",
            end: "bottom 75%",
            scrub: 0.5,
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className={`${pixelBody.className} relative overflow-hidden bg-black px-4 py-16 text-white sm:px-6 lg:px-10`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee_1px,transparent_1px)] bg-[size:52px_52px]" />
        <div className="absolute left-8 top-14 h-14 w-14 bg-fuchsia-500/30 sm:h-20 sm:w-20" />
        <div className="absolute right-8 top-24 h-12 w-12 bg-cyan-500/30 sm:h-16 sm:w-16" />
        <div className="absolute bottom-12 left-1/4 h-12 w-12 bg-green-500/25 sm:h-16 sm:w-16" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="relative inline-flex items-center justify-center">
            <span className={`${pixelHeader.className} absolute inset-0 blur-xl text-cyan-200 opacity-80`}>
              HOW IT WORKS
            </span>
            <h2 className={`${pixelHeader.className} relative text-lg text-cyan-300 sm:text-2xl`}>
              HOW IT WORKS
            </h2>
          </div>
          <p className="mt-4 text-xl text-green-300 sm:text-2xl">
            Your journey to DSA mastery in four clear retro checkpoints
          </p>
        </div>

        <div className="relative">
          <div className="work-progress absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 bg-green-400/70 md:block" />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <article
                key={step.number}
                className="work-card relative border-4 border-green-400 bg-[#081820] p-6 text-center shadow-[8px_8px_0_0_#4ade80]"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center border-4 border-green-400 bg-black text-green-300 shadow-[4px_4px_0_0_#000]">
                  <span className={`${pixelHeader.className} text-xs sm:text-sm`}>{step.number}</span>
                </div>

                <h3 className={`${pixelHeader.className} mb-4 text-xs text-green-300 sm:text-sm`}>
                  {step.title}
                </h3>
                <p className="text-xl leading-relaxed text-green-100 sm:text-2xl">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
