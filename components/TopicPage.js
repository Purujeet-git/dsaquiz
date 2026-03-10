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

const topicGroups = [
  {
    label: "Beginner",
    border: "border-lime-400",
    background: "bg-green-950",
    text: "text-green-300",
    chip: "bg-lime-400 text-black",
    topics: ["Arrays", "Linked Lists", "Stacks", "Queues"],
  },
  {
    label: "Intermediate",
    border: "border-cyan-400",
    background: "bg-cyan-950",
    text: "text-cyan-300",
    chip: "bg-cyan-400 text-black",
    topics: ["Trees", "Binary Search", "Sorting", "Hashing"],
  },
  {
    label: "Advanced",
    border: "border-fuchsia-400",
    background: "bg-fuchsia-950",
    text: "text-fuchsia-300",
    chip: "bg-fuchsia-400 text-black",
    topics: ["Graphs", "Dynamic Programming", "Backtracking", "Greedy"],
  },
];

const TopicPage = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".topic-box", {
        y: 48,
        opacity: 0,
        scale: 0.94,
        duration: 0.55,
        ease: "back.out(1.2)",
        stagger: 0.08,
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className={`${pixelBody.className} bg-black px-4 py-16 text-white sm:px-6 lg:px-10`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="relative inline-flex items-center justify-center">
            <span className={`${pixelHeader.className} absolute inset-0 blur-md text-pink-500 opacity-80`}>
              TOPICS
            </span>
            <h2 className={`${pixelHeader.className} relative text-lg text-pink-400 sm:text-2xl`}>
              TOPICS
            </h2>
          </div>
          <p className="mt-4 text-xl text-green-300 sm:text-2xl">
            Explore the worlds waiting inside the platform
          </p>
        </div>

        <div className="space-y-10">
          {topicGroups.map((group) => (
            <section key={group.label}>
              <div className="mb-5 flex items-center justify-between gap-4 border-b-2 border-zinc-800 pb-3">
                <h3 className={`${pixelHeader.className} text-xs ${group.text} sm:text-sm`}>
                  {group.label.toUpperCase()}
                </h3>
                <span className={`${pixelHeader.className} px-3 py-1 text-[10px] ${group.chip}`}>
                  {group.topics.length} ZONES
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {group.topics.map((topic) => (
                  <article
                    key={topic}
                    className={`topic-box ${group.background} ${group.border} flex min-h-[150px] flex-col items-center justify-center gap-3 border-4 px-4 py-6 text-center shadow-[8px_8px_0_0_#111827]`}
                  >
                    <p className={`${group.text} text-xl leading-tight sm:text-2xl`}>{topic}</p>
                    <p className="text-[11px] tracking-[0.2em] text-zinc-400">
                      {group.label.toUpperCase()}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {topicGroups.map((group) => (
            <div key={group.label} className="flex items-center gap-3">
              <div className={`h-4 w-4 ${group.chip.split(" ")[0]}`} />
              <p className={`${pixelHeader.className} text-[10px] ${group.text}`}>
                {group.label.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicPage;
