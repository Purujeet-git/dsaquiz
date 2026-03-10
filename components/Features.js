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

const featureCards = [
  {
    title: "Guided Topic Flow",
    icon: "01",
    accent: "border-green-400 shadow-[8px_8px_0_0_#4ade80]",
    body: "Learners do not get dumped into random questions. They move through topics, difficulty levels, and batches in a clear order.",
  },
  {
    title: "Quiz-First Practice",
    icon: "02",
    accent: "border-cyan-400 shadow-[8px_8px_0_0_#22d3ee]",
    body: "Each batch turns DSA revision into a short mission. It is lighter than a full coding editor, so users can build recall and speed first.",
  },
  {
    title: "Progress That Persists",
    icon: "03",
    accent: "border-pink-400 shadow-[8px_8px_0_0_#f472b6]",
    body: "Completed batches, unlocked levels, and future profile progression make the platform feel like a long-term journey instead of a one-time quiz.",
  },
  {
    title: "Built For Consistency",
    icon: "04",
    accent: "border-yellow-400 shadow-[8px_8px_0_0_#facc15]",
    body: "The product structure encourages small daily sessions, which is exactly how most students actually improve in DSA.",
  },
];

const valuePoints = [
  "Reduces overwhelm by breaking DSA into smaller missions.",
  "Helps users revise faster before interviews and contests.",
  "Makes theory, pattern recognition, and progression feel rewarding.",
];

const upcomingCards = [
  {
    title: "Leaderboard",
    label: "Incoming Update",
    color: "border-fuchsia-400 bg-fuchsia-950/40 text-fuchsia-300",
    description: "Players will be ranked by completed missions, accuracy, and pace so practice gets a healthy competitive edge.",
  },
  {
    title: "Streak System",
    label: "Incoming Update",
    color: "border-orange-400 bg-orange-950/40 text-orange-300",
    description: "Daily streaks will reward consistency and help users build the habit of solving a little DSA every day.",
  },
];

export default function Features() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".feature-reveal", {
        y: 48,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });

      gsap.from(".upcoming-reveal", {
        y: 56,
        opacity: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".upcoming-zone",
          start: "top 80%",
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className={`${pixelBody.className} relative overflow-hidden bg-black px-4 py-16 text-white sm:px-6 lg:px-10`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4ade80_1px,transparent_1px),linear-gradient(to_bottom,#4ade80_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0f766e55_0%,transparent_35%),radial-gradient(circle_at_bottom_right,#ec489955_0%,transparent_30%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="feature-reveal mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="relative mb-5 inline-flex items-center">
              <span className={`${pixelHeader.className} absolute inset-0 blur-xl text-green-500 opacity-90`}>
                FEATURES
              </span>
              <h2 className={`${pixelHeader.className} relative text-lg text-green-300 sm:text-2xl`}>
                FEATURES
              </h2>
            </div>

            <p className="mb-4 text-3xl leading-tight text-zinc-100 sm:text-4xl">
              A retro DSA learning world that explains itself quickly and gives users a reason to keep coming back.
            </p>
            <p className="max-w-2xl text-xl leading-relaxed text-zinc-400 sm:text-2xl">
              The product is useful because it turns scattered DSA preparation into a guided mission system with visible progress, smaller wins, and lower mental friction.
            </p>
          </div>

          <div className="feature-reveal grid w-full max-w-xl grid-cols-3 gap-3 self-stretch text-center sm:gap-4">
            <div className="border-4 border-green-400 bg-[#081820] px-3 py-4 shadow-[6px_6px_0_0_#4ade80]">
              <p className={`${pixelHeader.className} text-sm text-green-300 sm:text-lg`}>STEP</p>
              <p className="mt-2 text-2xl text-green-400 sm:text-4xl">01</p>
              <p className="mt-2 text-sm text-green-200">Learn</p>
            </div>
            <div className="border-4 border-cyan-400 bg-[#081820] px-3 py-4 shadow-[6px_6px_0_0_#22d3ee]">
              <p className={`${pixelHeader.className} text-sm text-cyan-300 sm:text-lg`}>STEP</p>
              <p className="mt-2 text-2xl text-cyan-300 sm:text-4xl">02</p>
              <p className="mt-2 text-sm text-cyan-100">Practice</p>
            </div>
            <div className="border-4 border-pink-400 bg-[#081820] px-3 py-4 shadow-[6px_6px_0_0_#f472b6]">
              <p className={`${pixelHeader.className} text-sm text-pink-300 sm:text-lg`}>STEP</p>
              <p className="mt-2 text-2xl text-pink-300 sm:text-4xl">03</p>
              <p className="mt-2 text-sm text-pink-100">Level Up</p>
            </div>
          </div>
        </div>

        <div className="mb-12 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="feature-reveal border-4 border-zinc-700 bg-zinc-950/90 p-6 shadow-[10px_10px_0_0_#111827] sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-3 w-3 bg-green-400" />
              <div className="h-3 w-3 bg-cyan-400" />
              <div className="h-3 w-3 bg-pink-400" />
              <span className={`${pixelHeader.className} text-[10px] text-zinc-400 sm:text-xs`}>SYSTEM PURPOSE</span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {featureCards.map((card) => (
                <article
                  key={card.title}
                  className={`feature-reveal border-4 bg-black p-5 ${card.accent}`}
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className={`${pixelHeader.className} text-xs text-zinc-200`}>{card.title}</span>
                    <span className={`${pixelHeader.className} text-[10px] text-zinc-500`}>{card.icon}</span>
                  </div>
                  <p className="text-xl leading-relaxed text-zinc-300 sm:text-2xl">{card.body}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="feature-reveal border-4 border-yellow-400 bg-[#1b1304] p-6 text-yellow-100 shadow-[10px_10px_0_0_#ca8a04] sm:p-8">
            <p className={`${pixelHeader.className} mb-5 text-xs text-yellow-300 sm:text-sm`}>WHY USERS WILL CARE</p>
            <div className="space-y-4">
              {valuePoints.map((point, index) => (
                <div key={point} className="flex items-start gap-4 border-b-2 border-yellow-700/40 pb-4 last:border-b-0 last:pb-0">
                  <span className={`${pixelHeader.className} pt-1 text-[10px] text-yellow-400`}>
                    0{index + 1}
                  </span>
                  <p className="text-xl leading-relaxed text-yellow-50 sm:text-2xl">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border-4 border-dashed border-yellow-500/70 p-4">
              <p className={`${pixelHeader.className} mb-2 text-[10px] text-yellow-300`}>PLAYER TAKEAWAY</p>
              <p className="text-xl leading-relaxed sm:text-2xl">
                This site gives beginners structure and gives serious learners a faster revision loop.
              </p>
            </div>
          </aside>
        </div>

        <div className="upcoming-zone rounded-none border-4 border-zinc-700 bg-zinc-950/90 p-6 shadow-[10px_10px_0_0_#1f2937] sm:p-8">
          <div className="upcoming-reveal mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={`${pixelHeader.className} mb-3 text-xs text-cyan-300 sm:text-sm`}>UPCOMING FEATURES</p>
              <h3 className={`${pixelHeader.className} text-base text-white sm:text-xl`}>
                NEXT PATCH PREVIEW
              </h3>
            </div>
            <p className="max-w-2xl text-xl leading-relaxed text-zinc-400 sm:text-2xl">
              These systems are planned to increase competition, retention, and daily usage without breaking the current retro vibe.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {upcomingCards.map((card) => (
              <article
                key={card.title}
                className={`upcoming-reveal border-4 p-6 shadow-[8px_8px_0_0_#000] ${card.color}`}
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h4 className={`${pixelHeader.className} text-sm sm:text-base`}>{card.title}</h4>
                  <span className={`${pixelHeader.className} text-[9px] text-white/80 sm:text-[10px]`}>
                    {card.label}
                  </span>
                </div>
                <p className="text-xl leading-relaxed sm:text-2xl">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
