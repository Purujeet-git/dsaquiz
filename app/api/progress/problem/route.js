import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserProgress from "@/models/UserProgress";
import User from "@/models/User";
import {
  updateGlobalStreak,
  updateTopicStreak,
} from "@/lib/streak";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  await connectDB();

  const session = await getServerSession(authOptions);

  console.log("=== SESSION DEBUG ===");
  console.log("Full session:", JSON.stringify(session, null, 2));
  console.log("session exists?", !!session);
  console.log("session.user exists?", !!session?.user);
  console.log("session.user.id:", session?.user?.id);
  console.log("===================");
  
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  console.log(userId);
  const { topicId, difficulty, problemId } = await req.json();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /* ======================
     FETCH USER (STREAK OWNER)
     ====================== */
  const user = await User.findById(userId);
  console.log(userId);
  console.log("🔍 Full session object:", JSON.stringify(session, null, 2)); 
  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  /* ======================
     FETCH / CREATE PROGRESS
     ====================== */
  let progress = await UserProgress.findOne({ userId });
  if (!progress) {
    progress = await UserProgress.create({
      userId,
      topics: [],
    });
  }

  let topic = progress.topics.find(
    t => t.topicId === topicId
  );
  if (!topic) {
    topic = { topicId, difficulties: [] };
    progress.topics.push(topic);
  }

  let diff = topic.difficulties.find(
    d => d.difficulty === difficulty
  );
  if (!diff) {
    diff = { difficulty, completedProblems: [] };
    topic.difficulties.push(diff);
  }

  const alreadyCompleted = diff.completedProblems.find(
    p => p.problemId.toString() === problemId
  );

  if (!alreadyCompleted) {
    diff.completedProblems.push({
      problemId,
      completed: true,
      completedAt: today,
    });

    /* ======================
       🔥 UPDATE STREAKS HERE
       ====================== */
    updateGlobalStreak(user, today);
    updateTopicStreak(user, topicId, today);
  }

  await Promise.all([
    progress.save(),
    user.save(),
  ]);

  return NextResponse.json({
    success: true,
    streakCount: user.streakCount,
    longestStreak: user.longestStreak,
  });
}
