import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Problem from "@/models/Problem";
import Topic from "@/models/Topic";
import BatchListClient from "./batch-list-client";

export default async function DifficultyPage({params}) {
  const { topicId,difficulty } = await params;

  await connectDB();

  const topic = await Topic.findOne({
    topicId,
    isActive:true,
  }).select("title");

  if(!topic) notFound();

  const problem = await Problem.findOne({
    topicId,
    difficulty,
    isActive:true,
  }).select("batches title description");

  if(!problem || !problem.batches || problem.batches.length === 0) {
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">No Batches Available</h1>
          <p className="text-gray-600">
            No question batches found for {topic.title} - {difficulty}
          </p>
        </div>
      </div>
    );
  }

  return (
    <BatchListClient
      topicId={topicId}
      difficulty={difficulty}
      topicTitle={topic.title}
      batches={problem.batches.map(b => ({
        batchNumber: b.batchNumber,
        totalQuestions: (b.understanding?.length || 0) + (b.approach?.length || 0)
      }))}
    />
  );
}