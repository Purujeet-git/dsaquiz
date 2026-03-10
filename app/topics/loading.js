import { Press_Start_2P, VT323 } from "next/font/google";

const pixelHeader = Press_Start_2P({ weight: "400", subsets: ["latin"] });
const pixelBody = VT323({ weight: "400", subsets: ["latin"] });

function TopicCardSkeleton({ accentClass }) {
  return (
    <div className="h-full bg-zinc-900/70 p-6 border-4 border-zinc-700 text-white shadow-[8px_8px_0_0_#111827] animate-pulse">
      <div className="flex justify-between items-start mb-4 gap-4">
        <div className="space-y-3 flex-1">
          <div className={`h-4 w-3/4 ${accentClass}`} />
          <div className="h-3 w-1/2 bg-zinc-700" />
        </div>
        <div className="h-6 w-16 bg-zinc-800 border border-zinc-600" />
      </div>

      <div className="space-y-3 mb-8">
        <div className="h-4 w-full bg-zinc-800" />
        <div className="h-4 w-5/6 bg-zinc-800" />
      </div>

      <div className="flex items-center justify-between border-t-2 border-zinc-700 pt-4">
        <div className="h-3 w-28 bg-zinc-800" />
        <div className="h-8 w-20 bg-zinc-800 border border-zinc-600" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className={`${pixelBody.className} relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden`}>
      <div className="absolute inset-0 z-0 [perspective:500px]">
        <div
          className="absolute inset-0 origin-top [transform:rotateX(60deg)] opacity-15 animate-[grid-scroll_1.2s_linear_infinite]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #4ade80 1px, transparent 1px), linear-gradient(to bottom, #4ade80 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <header className="mb-16 border-l-8 border-green-400 pl-6">
          <h1 className={`${pixelHeader.className} text-3xl mb-4 tracking-tighter text-white`}>
            Loading Missions
          </h1>
          <p className="text-green-400 text-xl uppercase tracking-widest animate-pulse">
            {"// Establishing uplink to the topic grid"}
          </p>
        </header>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <TopicCardSkeleton accentClass="bg-green-500/80" />
          <TopicCardSkeleton accentClass="bg-cyan-500/80" />
          <TopicCardSkeleton accentClass="bg-pink-500/80" />
          <TopicCardSkeleton accentClass="bg-yellow-500/80" />
          <TopicCardSkeleton accentClass="bg-emerald-500/80" />
          <TopicCardSkeleton accentClass="bg-fuchsia-500/80" />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-50" />
    </div>
  );
}
