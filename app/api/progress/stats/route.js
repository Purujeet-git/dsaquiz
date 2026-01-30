import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserProgress from "@/models/UserProgress";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const userId = session.user.id;
    const progress = await UserProgress.findOne({ userId });

    if (!progress) {
      return NextResponse.json({
        success: true,
        stats: {
          streak: 0,
          totalBatchesCompleted: 0,
          topicsStarted: 0,
          lastActive: null,
        },
      });
    }

    // Calculate total batches completed
    let totalBatchesCompleted = 0;
    progress.topics.forEach((topic) => {
      topic.difficulties.forEach((diff) => {
        totalBatchesCompleted += diff.completedBatches?.length || 0;
      });
    });

    return NextResponse.json({
      success: true,
      stats: {
        streak: progress.streak || 0,
        totalBatchesCompleted,
        topicsStarted: progress.topics.length,
        lastActive: progress.lastActiveDate,
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}