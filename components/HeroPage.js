"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import { Press_Start_2P, VT323 } from "next/font/google";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

const floatingSprites = [
  { src: "/tree2.png", alt: "pixel tree", className: "left-3 top-8 w-10 sm:left-8 sm:top-10 sm:w-12 lg:left-16 lg:top-14 lg:w-14" },
  { src: "/ch1.png", alt: "pixel character", className: "right-4 top-24 w-10 sm:right-12 sm:top-28 sm:w-12 lg:right-24 lg:top-40 lg:w-14" },
  { src: "/obj.png", alt: "pixel object", className: "right-3 top-8 w-10 sm:right-6 sm:top-10 sm:w-12 lg:right-10 lg:top-14 lg:w-14" },
  { src: "/per.png", alt: "pixel player", className: "left-3 top-28 w-10 sm:left-6 sm:top-36 sm:w-12 lg:left-12 lg:top-44 lg:w-14" },
  { src: "/book.png", alt: "pixel book", className: "bottom-32 left-6 w-10 sm:bottom-24 sm:left-20 sm:w-12 lg:bottom-28 lg:left-72 lg:w-14" },
  { src: "/hrt.png", alt: "pixel heart", className: "bottom-14 right-4 w-10 sm:bottom-14 sm:right-8 sm:w-12 lg:bottom-10 lg:right-10 lg:w-14" },
];

const statCards = [
  { value: "200+", label: "Quizzes" },
  { value: "50+", label: "Topics" },
  { value: "24/7", label: "Practice" },
];

const HeroPage = () => {
  const container = useRef(null);
  const textRef = useRef(null);
  const text1Ref = useRef(null);
  const spriteRefs = useRef([]);
  const router = useRouter();

  useGSAP(
    () => {
      const words = ["Hello Developer", "Welcome To DSA Quiz"];
      const subline = ["Master data structures and algorithms the retro way."];
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });

      words.forEach((word) => {
        tl.to(textRef.current, {
          duration: 1.2,
          text: word,
          ease: "none",
        })
          .to({}, { duration: 0.8 })
          .to(textRef.current, {
            duration: 0.5,
            text: "",
            ease: "none",
          });
      });

      subline.forEach((word) => {
        tl.to(text1Ref.current, {
          duration: 1.6,
          text: word,
          ease: "none",
        }).to({}, { duration: 1.6 });
      });
    },
    { scope: container }
  );

  useGSAP(
    () => {
      spriteRefs.current.forEach((node, index) => {
        if (!node) return;

        gsap.to(node, {
          y: index % 2 === 0 ? -18 : 18,
          x: index % 3 === 0 ? 10 : -10,
          rotation: index % 2 === 0 ? 5 : -5,
          duration: 3 + index * 0.25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      gsap.to(".pixel-icon", {
        scale: 1.1,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.18,
          from: "random",
        },
      });

      gsap.to(".hero-reveal", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.14,
        ease: "power3.out",
        delay: 0.2,
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className={`${pixelFont.className} relative flex min-h-[calc(100vh-8rem)] items-center overflow-hidden bg-black px-4 py-12 sm:px-6 sm:py-16 lg:px-10`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0f766e33_0%,transparent_35%),radial-gradient(circle_at_bottom,#1d4ed833_0%,transparent_30%)]" />
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#4ade80_1px,transparent_1px),linear-gradient(to_bottom,#4ade80_1px,transparent_1px)] bg-[size:38px_38px] sm:bg-[size:44px_44px]" />
      </div>

      {floatingSprites.map((sprite, index) => (
        <img
          key={sprite.src}
          ref={(node) => {
            spriteRefs.current[index] = node;
          }}
          src={sprite.src}
          className={`pixel-icon absolute z-10 hidden origin-bottom sm:block ${sprite.className}`}
          alt={sprite.alt}
        />
      ))}

      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <div className="hero-reveal translate-y-6 opacity-0 mb-4 inline-flex items-center gap-3 border-4 border-green-400 bg-[#081820] px-3 py-2 text-[10px] text-green-300 shadow-[6px_6px_0_0_#4ade80] sm:px-4 sm:text-xs">
          <span className="h-2 w-2 bg-green-400" />
          INTERVIEW TRAINING ARCADE
        </div>

        <div className="hero-reveal translate-y-6 opacity-0 mb-6 min-h-[5rem] sm:min-h-[7rem] lg:min-h-[8rem]">
          <span
            ref={textRef}
            className={`${pixelFont.className} block text-2xl leading-tight text-blue-500 sm:text-4xl lg:text-5xl xl:text-6xl`}
          />
        </div>

        <div className="hero-reveal translate-y-6 opacity-0 mb-8 max-w-3xl">
          <span
            ref={text1Ref}
            className={`${pixelFont.className} block min-h-[3rem] text-sm leading-7 text-cyan-100 sm:min-h-[4rem] sm:text-base sm:leading-8 lg:text-lg`}
          />
          <p className={`${bodyFont.className} mt-5 text-2xl leading-relaxed text-zinc-300 sm:text-3xl`}>
            Learn with structured topics, responsive quiz missions, and a progress system that makes daily DSA practice feel lighter.
          </p>
        </div>

        <div className="hero-reveal translate-y-6 opacity-0 mb-8 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => router.push("/login")}
            className={`${pixelFont.className} w-full max-w-xs border-b-4 border-r-4 border-green-800 bg-green-500 px-6 py-4 text-sm text-black transition-all duration-75 hover:translate-x-0.5 hover:translate-y-1 hover:border-b-0 hover:border-r-0 hover:bg-green-400 sm:w-auto sm:text-base`}
          >
            LOGIN
          </button>

          <button
            onClick={() => router.push("/topics")}
            className={`${pixelFont.className} w-full max-w-xs border-b-4 border-r-4 border-cyan-800 bg-cyan-400 px-6 py-4 text-sm text-black transition-all duration-75 hover:translate-x-0.5 hover:translate-y-1 hover:border-b-0 hover:border-r-0 hover:bg-cyan-300 sm:w-auto sm:text-base`}
          >
            START HERE
          </button>
        </div>

        <div className="hero-reveal translate-y-6 opacity-0 grid w-full max-w-4xl grid-cols-1 gap-4 border-4 border-yellow-400 bg-[#120f02] px-4 py-5 shadow-[8px_8px_0_0_#facc15] sm:grid-cols-3 sm:px-8 sm:py-6">
          {statCards.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center gap-2 border-b-2 border-yellow-700/30 pb-3 last:border-b-0 last:pb-0 sm:border-b-0 sm:border-r-2 sm:border-yellow-700/30 sm:pb-0 last:sm:border-r-0">
              <p className="text-2xl text-green-400 sm:text-3xl">{stat.value}</p>
              <p className={`${pixelFont.className} text-[10px] text-yellow-400 sm:text-xs`}>{stat.label}</p>
            </div>
          ))}
        </div>

        <p className="hero-reveal translate-y-6 opacity-0 mt-8 text-[10px] text-white animate-bounce sm:mt-10 sm:text-xs">
          SCROLL TO CONTINUE
        </p>
      </div>
    </section>
  );
};

export default HeroPage;
