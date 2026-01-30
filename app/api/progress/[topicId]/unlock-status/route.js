import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserProgress from "@/models/UserProgress";
import { PROBLEMS_BY_TOPIC_AND_DIFFICULTY } from "@/lib/problems/problemRegistry";
import {
  isMediumUnlocked,
  isHardUnlocked,
} from "@/lib/progress/unlockRules.server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req, { params }) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const { topicId } = params;

  const progress = await UserProgress.findOne({ userId });

  const easyTotal =
    PROBLEMS_BY_TOPIC_AND_DIFFICULTY?.[topicId]?.easy?.length || 0;

  const mediumTotal =
    PROBLEMS_BY_TOPIC_AND_DIFFICULTY?.[topicId]?.medium?.length || 0;

  let easyCompleted = 0;
  let mediumCompleted = 0;

  if (progress) {
    const topic = progress.topics.find(
      (t) => t.topicId === topicId
    );

    const easy = topic?.difficulties.find(
      (d) => d.difficulty === "easy"
    );

    const medium = topic?.difficulties.find(
      (d) => d.difficulty === "medium"
    );

    easyCompleted = easy?.completedProblems.length || 0;
    mediumCompleted = medium?.completedProblems.length || 0;
  }

  const mediumUnlocked = isMediumUnlocked(
    easyCompleted,
    easyTotal
  );

  const hardUnlocked = isHardUnlocked(
    mediumCompleted,
    mediumTotal
  );

  return NextResponse.json({
    easy: {
      completed: easyCompleted,
      total: easyTotal,
    },
    medium: {
      completed: mediumCompleted,
      total: mediumTotal,
    },
    mediumUnlocked,
    hardUnlocked,
  });
}
