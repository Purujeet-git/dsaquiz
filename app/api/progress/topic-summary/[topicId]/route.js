import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserProgress from "@/models/UserProgress";
import Problem from "@/models/Problem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { topicId } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          progress: {
            easy: { completed: 0, total: 0, percentage: 0 },
            medium: { completed: 0, total: 0, percentage: 0 },
            hard: { completed: 0, total: 0, percentage: 0 },
          },
        }
      );
    }

    const userId = session.user.id;

    // Get all problems for this topic
    const problems = await Problem.find({
      topicId,
      isActive: true,
    }).select("difficulty batches");

    // Count total batches per difficulty
    const totalBatches = {
      easy: 0,
      medium: 0,
      hard: 0,
    };

    problems.forEach((problem) => {
      if (problem.batches && problem.batches.length > 0) {
        totalBatches[problem.difficulty] = problem.batches.length;
      }
    });

    // Get user progress
    const userProgress = await UserProgress.findOne({ userId });
    
    const completedBatches = {
      easy: 0,
      medium: 0,
      hard: 0,
    };

    if (userProgress) {
      const topic = userProgress.topics.find((t) => t.topicId === topicId);
      
      if (topic) {
        topic.difficulties.forEach((diff) => {
          completedBatches[diff.difficulty] = diff.completedBatches?.length || 0;
        });
      }
    }

    const progress = {
      easy: {
        completed: completedBatches.easy,
        total: totalBatches.easy,
        percentage: totalBatches.easy > 0 
          ? Math.round((completedBatches.easy / totalBatches.easy) * 100) 
          : 0,
      },
      medium: {
        completed: completedBatches.medium,
        total: totalBatches.medium,
        percentage: totalBatches.medium > 0
          ? Math.round((completedBatches.medium / totalBatches.medium) * 100)
          : 0,
      },
      hard: {
        completed: completedBatches.hard,
        total: totalBatches.hard,
        percentage: totalBatches.hard > 0
          ? Math.round((completedBatches.hard / totalBatches.hard) * 100)
          : 0,
      },
    };

    return NextResponse.json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error("Topic summary error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}