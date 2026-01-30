import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Problem from "@/models/Problem";
import QuizClient from "./quiz-client";

export default async function BatchQuizPage({ params }) {
  const { topicId, difficulty, batchNumber } = await params;

  await connectDB();

  const problem = await Problem.findOne({
    topicId,
    difficulty,
    isActive: true,
  }).lean();

  if (!problem) notFound();

  const batch = problem.batches.find(
    (b) => b.batchNumber === parseInt(batchNumber)
  );

  if (!batch) notFound();

  // Combine all questions and serialize them properly
  const allQuestions = [
    ...(batch.understanding || []).map(q => ({
      id: q.id,  // ✅ Question ID
      question: q.question || "",
      options: q.options || [],
      code:q.code || "",
      correct: q.correct || 0,
      explanation: q.explanation || "",
      type: 'understanding'
    })),
    ...(batch.approach || []).map(q => ({
      id: q.id,  // ✅ Question ID
      question: q.question || "",
      options: q.options || [],
      code:q.code || "",
      correct: q.correct || 0,
      explanation: q.explanation || "",
      type: 'approach'
    })),
  ];

  // Serialize complexity object
  const complexityData = {
    time: batch.complexity?.time || "",
    space: batch.complexity?.space || "",
  };

  return (
    <QuizClient
      // ❌ REMOVE: id={id}  <-- This line should be deleted
      topicId={topicId}
      difficulty={difficulty}
      batchNumber={parseInt(batchNumber)}
      questions={allQuestions}
      complexity={complexityData}
    />
  );
}