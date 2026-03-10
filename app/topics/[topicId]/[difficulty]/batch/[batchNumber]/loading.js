import { Press_Start_2P, VT323 } from "next/font/google";

const pixelBody = VT323({ weight: "400", subsets: ["latin"], variable: "--font-pixel-body" });
const pixelHeader = Press_Start_2P({ weight: "400", subsets: ["latin"] });

function OptionSkeleton() {
  return <div className="w-full h-[68px] border-2 border-zinc-800 bg-black/40 animate-pulse" />;
}

export default function Loading() {
  return (
    <div className={`${pixelBody.className} min-h-screen relative bg-[#0a0a0a] text-white p-6 overflow-hidden`}>
      <div className="absolute inset-0 z-0 [perspective:1200px] pointer-events-none">
        <div
          className="absolute inset-0 origin-top [transform:rotateX(60deg)] opacity-20 animate-[grid-scroll_1.5s_linear_infinite]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #ff00ff 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 animate-pulse">
        <div className="mb-10">
          <div className="flex justify-between mb-2">
            <div className="h-3 w-28 bg-cyan-500/40" />
            <div className="h-3 w-10 bg-cyan-500/40" />
          </div>
          <div className="h-4 bg-black border-2 border-zinc-700 p-0.5">
            <div className="h-full w-1/3 bg-gradient-to-r from-[#00ffff] to-[#ff00ff]" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-black/80 border-4 border-[#00ffff] p-8 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 w-20 bg-cyan-500/50" />
              <div className="h-4 w-20 bg-pink-500/50" />
            </div>

            <div className="h-24 bg-zinc-900 border-l-4 border-pink-500 pl-4 mb-10" />

            <div className="space-y-4">
              <OptionSkeleton />
              <OptionSkeleton />
              <OptionSkeleton />
              <OptionSkeleton />
            </div>

            <div className={`${pixelHeader.className} mt-8 w-full h-14 bg-white/80 shadow-[4px_4px_0_0_#ff00ff]`} />
          </div>

          <div className="border-4 border-zinc-700 bg-black shadow-[0_0_20px_rgba(0,0,0,1)]">
            <div className="bg-zinc-900 px-4 py-2 border-b-4 border-zinc-700 flex justify-between items-center">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-[#ff5f56] rounded-full" />
                <div className="w-2.5 h-2.5 bg-[#ffbd2e] rounded-full" />
                <div className="w-2.5 h-2.5 bg-[#27c93f] rounded-full" />
              </div>
              <div className="h-3 w-24 bg-zinc-700" />
            </div>
            <div className="p-6 space-y-3">
              <div className="h-4 w-11/12 bg-green-500/20" />
              <div className="h-4 w-4/5 bg-green-500/20" />
              <div className="h-4 w-3/4 bg-green-500/20" />
              <div className="h-4 w-5/6 bg-green-500/20" />
              <div className="h-4 w-2/3 bg-green-500/20" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-50" />
    </div>
  );
}
