"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { VT323, Press_Start_2P } from "next/font/google";
import gsap from "gsap";

const pixelBody = VT323({ weight: "400", subsets: ["latin"], variable: "--font-pixel-body" });
const pixelHeader = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function QuizClient({ topicId, difficulty, batchNumber, questions, complexity }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const gridRef = useRef(null);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  useEffect(() => {
    gsap.to(gridRef.current, {
      backgroundPositionY: "100px",
      duration: 1.5,
      repeat: -1,
      ease: "none",
    });
  }, []);

  const handleAnswerSelect = (optionIndex) => {
    if (showFeedback) return;
    setSelectedAnswer(optionIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correct;
    setShowFeedback(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswers((prev) => [
      ...prev,
      {
        id: currentQuestion.id,
        question: currentQuestion.question,
        selected: selectedAnswer,
        isCorrect,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleCompleteBatch = async () => {
    setIsSubmitting(true);

    try {
      await fetch("/api/progress/complete-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId, difficulty, batchNumber, score, total: questions.length, answers }),
      });
      router.push("/topics");
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className={`${pixelBody.className} min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 sm:p-6 text-white overflow-hidden relative`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ff00ff11_0%,transparent_70%)]" />

        <div className="max-w-2xl w-full bg-black border-4 border-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.3)] p-4 sm:p-6 md:p-8 text-center relative z-10 backdrop-blur-md flex flex-col max-h-[92vh]">
          <div className={`${pixelHeader.className} text-sm sm:text-lg md:text-xl mb-4 ${passed ? "text-green-400 text-neon-green" : "text-red-500"}`}>
            {passed ? "MISSION SUCCESS" : "MISSION FAILED"}
          </div>

          <div className="border-y-2 border-zinc-800 py-4 mb-4">
            <div className="text-3xl sm:text-4xl md:text-5xl text-[#00ffff] mb-1">{score}/{questions.length}</div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest opacity-60">Sync Accuracy: {percentage}%</p>
          </div>

          <div className="flex-1 overflow-y-auto mb-6 text-left space-y-3 pr-1 sm:pr-2">
            <p className={`${pixelHeader.className} text-[9px] sm:text-[10px] text-zinc-500 mb-2 uppercase`}>
              {"// Mission Debrief"}
            </p>
            {questions.map((q, index) => {
              const userAnswer = answers.find((a) => a.id === q.id);
              const isCorrect = userAnswer?.isCorrect || false;

              return (
                <div key={q.id || index} className="border border-zinc-800 p-3 bg-zinc-900/50">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[9px] sm:text-[10px] opacity-50 font-mono">#{String(index + 1).padStart(2, "0")}</span>
                    <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 border ${isCorrect ? "border-green-500 text-green-500" : "border-red-500 text-red-500"}`}>
                      {isCorrect ? "CLEARED" : "ERROR"}
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl mt-2 leading-relaxed">{q.question}</p>
                  {!isCorrect && (
                    <p className="text-[10px] sm:text-xs mt-2 text-[#ff00ff] italic break-words">
                      Expected Trace: {q.options[q.correct]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleCompleteBatch}
            disabled={isSubmitting}
            className={`${pixelHeader.className} w-full p-3 sm:p-4 bg-[#ff00ff] text-white text-[9px] sm:text-[10px] border-4 border-black shadow-[4px_4px_0_0_#000] hover:bg-[#ff55ff] active:translate-y-1 transition-all uppercase shrink-0`}
          >
            {isSubmitting ? "Uploading..." : "Save Mission Data"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${pixelBody.className} min-h-screen relative bg-[#0a0a0a] text-white p-3 sm:p-4 md:p-6 overflow-hidden`}>
      <div className="absolute inset-0 z-0 [perspective:1200px] pointer-events-none">
        <div
          ref={gridRef}
          className="absolute inset-0 origin-top [transform:rotateX(60deg)] opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #ff00ff 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 pb-28 sm:pb-32">
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="flex justify-between gap-4 text-[9px] sm:text-[10px] uppercase font-bold mb-2 text-[#00ffff]">
            <span>System Syncing</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 sm:h-4 bg-black border-2 border-zinc-700 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff] shadow-[0_0_10px_#00ffff]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid gap-5 items-start">
          {currentQuestion.code && (
            <div className="border-4 border-zinc-700 bg-black shadow-[0_0_20px_rgba(0,0,0,1)] relative group">
              <div className="bg-zinc-900 px-3 sm:px-4 py-2 border-b-4 border-zinc-700 flex justify-between items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-[#ff5f56] rounded-full" />
                  <div className="w-2.5 h-2.5 bg-[#ffbd2e] rounded-full" />
                  <div className="w-2.5 h-2.5 bg-[#27c93f] rounded-full" />
                </div>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-zinc-500">source_code.py</span>
              </div>
              <div className="p-4 sm:p-6 relative overflow-x-auto">
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px]" />
                <pre className="text-sm sm:text-base md:text-lg text-green-400 font-mono whitespace-pre leading-relaxed min-w-max">
                  <code>{currentQuestion.code}</code>
                </pre>
              </div>
            </div>
          )}

          <div className="bg-black/80 border-4 border-[#00ffff] p-4 sm:p-6 md:p-8 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-5 sm:mb-6">
              <span className="bg-[#00ffff] text-black px-3 py-1 text-[9px] sm:text-[10px] font-bold uppercase">
                Level {currentIndex + 1}
              </span>
              <span className="text-pink-500 font-bold tracking-tighter text-sm sm:text-base md:text-lg">
                HP: {score}/{questions.length}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 md:mb-10 leading-relaxed font-bold border-l-4 border-pink-500 pl-3 sm:pl-4 break-words">
              {currentQuestion.question}
            </h2>

            {(complexity?.time || complexity?.space) && (
              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                <div className="border-2 border-zinc-800 bg-black/40 p-3">
                  <p className={`${pixelHeader.className} text-[8px] sm:text-[9px] text-zinc-500 mb-2`}>TIME</p>
                  <p className="text-base sm:text-lg text-cyan-300 break-words">{complexity.time || "-"}</p>
                </div>
                <div className="border-2 border-zinc-800 bg-black/40 p-3">
                  <p className={`${pixelHeader.className} text-[8px] sm:text-[9px] text-zinc-500 mb-2`}>SPACE</p>
                  <p className="text-base sm:text-lg text-cyan-300 break-words">{complexity.space || "-"}</p>
                </div>
              </div>
            )}

            <div className="space-y-3 sm:space-y-4">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === currentQuestion.correct;
                const showCorrect = showFeedback && isCorrect;
                const showWrong = showFeedback && isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    disabled={showFeedback}
                    className={`w-full p-3 sm:p-4 border-2 text-left transition-all flex items-start sm:items-center gap-3 sm:gap-4 text-base sm:text-lg leading-relaxed
                    ${showCorrect ? "bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_10px_#22c55e]" :
                      showWrong ? "bg-red-500/20 border-red-500 text-red-400" :
                      isSelected ? "border-[#ff00ff] text-[#ff00ff] bg-pink-500/10 sm:translate-x-2 shadow-[0_0_10px_#ff00ff]" :
                      "border-zinc-800 bg-black/40 hover:border-[#00ffff] hover:text-[#00ffff]"}`}
                  >
                    <span className="opacity-50 font-mono shrink-0">0{idx + 1}</span>
                    <span className="flex-1 break-words">{option}</span>
                  </button>
                );
              })}
            </div>

            {!showFeedback && (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className={`${pixelHeader.className} mt-6 sm:mt-8 w-full py-3 sm:py-4 bg-white text-black text-[9px] sm:text-[10px] border-4 border-white shadow-[4px_4px_0_0_#ff00ff] hover:bg-zinc-200 disabled:opacity-30 active:translate-y-1 transition-all`}
              >
                EXECUTE COMMAND
              </button>
            )}
          </div>
        </div>
      </div>

      {showFeedback && (
        <div className="fixed inset-x-0 bottom-0 p-3 sm:p-4 md:p-6 z-50">
          <div className="max-w-4xl mx-auto border-4 border-[#ff00ff] bg-black p-4 sm:p-5 md:p-6 shadow-[0_0_20px_rgba(255,0,255,0.3)] backdrop-blur-md">
            <h3 className={`${pixelHeader.className} text-[9px] sm:text-[10px] mb-3 ${selectedAnswer === currentQuestion.correct ? "text-green-400" : "text-red-500"}`}>
              {selectedAnswer === currentQuestion.correct ? "> ANALYSIS COMPLETE: ACCURATE" : "> ERROR: LOGIC FAULT DETECTED"}
            </h3>
            <p className="text-lg sm:text-xl text-zinc-200 italic mb-4 break-words">
              &quot;{currentQuestion.explanation}&quot;
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className={`${pixelHeader.className} text-[9px] sm:text-[10px] text-[#00ffff] animate-pulse uppercase`}
              >
                Next Sector
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-50" />
    </div>
  );
}
