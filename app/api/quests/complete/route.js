import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import DailyQuest from "@/models/DailyQuest";
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
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  // IMPORTANT: normalize date for streak logic
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Used for DailyQuest lookup (string-based date)
  const todayKey = today.toISOString().slice(0, 10);

  const dailyQuest = await DailyQuest.findOne({
    userId,
    date: todayKey,
  });

  if (!dailyQuest || dailyQuest.completed) {
    return NextResponse.json({
      success: false,
      message: "Quest already completed or not found",
    });
  }

  dailyQuest.completed = true;
  dailyQuest.rewardGranted = true;

  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  // 🔥 UPDATE STREAKS
  updateGlobalStreak(user, today);

  // Optional: only if quest is tied to a topic
  if (dailyQuest.topicId) {
    updateTopicStreak(user, dailyQuest.topicId, today);
  }

  // Grant rewards
  user.totalXP += 30;

  await Promise.all([
    dailyQuest.save(),
    user.save(),
  ]);

  return NextResponse.json({
    success: true,
    streakCount: user.streakCount,
    longestStreak: user.longestStreak,
  });
}
