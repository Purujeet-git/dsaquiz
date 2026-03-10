import { notFound } from "next/navigation";
import TopicDetailClient from "./topic-detail-client";
import { connectDB } from "@/lib/db";
import Topic from "@/models/Topic";
import Problem from "@/models/Problem";
import UserProgress from "@/models/UserProgress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function TopicDetailPage({ params }) {
  const { topicId } = await params;

  await connectDB();

  const topic = await Topic.findOne({
    topicId,
    isActive:true,
  }).select("topicId title description");
  if (!topic) notFound();

  const session = await getServerSession(authOptions);
  let progress = null;

  if (session?.user?.id) {
    const [problems, userProgress] = await Promise.all([
      Problem.find({
        topicId,
        isActive: true,
      }).select("difficulty batches"),
      UserProgress.findOne({ userId: session.user.id }),
    ]);

    const totalBatches = {
      easy: 0,
      medium: 0,
      hard: 0,
    };

    problems.forEach((problem) => {
      if (problem.batches?.length) {
        totalBatches[problem.difficulty] = problem.batches.length;
      }
    });

    const completedBatches = {
      easy: 0,
      medium: 0,
      hard: 0,
    };

    const topicProgress = userProgress?.topics?.find((entry) => entry.topicId === topicId);
    topicProgress?.difficulties?.forEach((diff) => {
      completedBatches[diff.difficulty] = diff.completedBatches?.length || 0;
    });

    progress = {
      easy: {
        completed: completedBatches.easy,
        total: totalBatches.easy,
        percentage: totalBatches.easy > 0 ? Math.round((completedBatches.easy / totalBatches.easy) * 100) : 0,
      },
      medium: {
        completed: completedBatches.medium,
        total: totalBatches.medium,
        percentage: totalBatches.medium > 0 ? Math.round((completedBatches.medium / totalBatches.medium) * 100) : 0,
      },
      hard: {
        completed: completedBatches.hard,
        total: totalBatches.hard,
        percentage: totalBatches.hard > 0 ? Math.round((completedBatches.hard / totalBatches.hard) * 100) : 0,
      },
    };
  }

  return <TopicDetailClient topic={{
    title:topic.title,
    description:topic.description,
  }} topicId={topicId} isAuthenticated={Boolean(session?.user?.id)} initialProgress={progress} />;
}
