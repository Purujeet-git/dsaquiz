import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Problem from "@/models/Problem";
import UserProgress from "@/models/UserProgress";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import {
  isMediumUnlocked,
  isHardUnlocked,
} from "@/lib/progress/unlockRules.server";

export async function GET(req) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const userId = session.user.id;
  const { searchParams } = new URL(req.url);

  const topicId = searchParams.get("topicId");
  const difficulty = searchParams.get("difficulty");
  const currentOrder = Number(searchParams.get("currentOrder"));

  /* ---------------- NEXT PROBLEM ---------------- */
  const nextProblem = await Problem.findOne({
    topicId,
    difficulty,
    order: { $gt: currentOrder },
    isActive: true,
  }).sort({ order: 1 });

  if (nextProblem) {
    return NextResponse.json({
      type: "NEXT_PROBLEM",
      nextProblemId: nextProblem._id,
    });
  }

  /* ---------------- USER PROGRESS ---------------- */
  const progress = await UserProgress.findOne({ userId });
  if (!progress) {
    return NextResponse.json({ type: "TOPIC_COMPLETED" });
  }

  const topic = progress.topics.find(
    (t) => t.topicId === topicId
  );

  if (!topic) {
    return NextResponse.json({ type: "TOPIC_COMPLETED" });
  }

  const easyCompleted =
    topic.difficulties.find((d) => d.difficulty === "easy")
      ?.completedProblems.length || 0;

  const mediumCompleted =
    topic.difficulties.find((d) => d.difficulty === "medium")
      ?.completedProblems.length || 0;

  const hardCompleted = 
    topic.difficulties.find((d) => d.difficulty === "hard")
        ?.completedProblems.length || 0;

  const easyTotal = await Problem.countDocuments({
    topicId,
    difficulty: "easy",
    isActive: true,
  });

  const mediumTotal = await Problem.countDocuments({
    topicId,
    difficulty: "medium",
    isActive: true,
  });

  const hardTotal = await Problem.countDocuments({
    topicId,
    difficulty: "hard",
    isActive: true,
  });

  /* ---------------- DIFFICULTY UNLOCK ---------------- */
  if (
    difficulty === "easy" &&
    isMediumUnlocked(easyCompleted, easyTotal)
  ) {
    return NextResponse.json({
      type: "NEXT_DIFFICULTY",
      nextDifficulty: "medium",
    });
  }

  if (
    difficulty === "medium" &&
    isHardUnlocked(mediumCompleted, mediumTotal)
  ) {
    return NextResponse.json({
      type: "NEXT_DIFFICULTY",
      nextDifficulty: "hard",
    });
  }

  /* ---------------- TOPIC COMPLETION ---------------- */
  const allCompleted =
    easyCompleted === easyTotal &&
    mediumCompleted === mediumTotal &&
    hardCompleted === hardTotal;

  if (allCompleted) {
    topic.completed = true;
    await progress.save();
  }

  return NextResponse.json({
    type: "TOPIC_COMPLETED",
  });
}
