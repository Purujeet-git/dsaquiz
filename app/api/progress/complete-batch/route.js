import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserProgress from "@/models/UserProgress";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { topicId, difficulty, batchNumber, score, total, answers, completedAt } = await req.json();
    const userId = new mongoose.Types.ObjectId(session.user.id);

    // Validate inputs
    if (!topicId || !difficulty || batchNumber === undefined || score === undefined || total === undefined) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ IMPROVED STREAK LOGIC
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let progress = await UserProgress.findOne({ userId });

    if (!progress) {
      // First time user
      progress = new UserProgress({
        userId,
        topics: [],
        streak: 1,
        lastActiveDate: new Date(),
      });
    } else {
      // Existing user - check streak
      const lastActive = progress.lastActiveDate ? new Date(progress.lastActiveDate) : null;

      if (lastActive) {
        lastActive.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
          // ✅ Same day - don't increment streak
          // Keep streak as is
        } else if (diffDays === 1) {
          // ✅ Consecutive day - increment streak
          progress.streak += 1;
          progress.lastActiveDate = new Date();
        } else if (diffDays > 1) {
          // ✅ Streak broken - reset to 1
          progress.streak = 1;
          progress.lastActiveDate = new Date();
        }
      } else {
        // No previous activity - start streak
        progress.streak = 1;
        progress.lastActiveDate = new Date();
      }
    }

    // Find or create topic
    let topicIndex = progress.topics.findIndex(
      (t) => t.topicId.toString() === topicId.toString()
    );

    if (topicIndex === -1) {
      progress.topics.push({
        topicId,
        completed: false,
        difficulties: [],
      });
      topicIndex = progress.topics.length - 1;
    }

    const topic = progress.topics[topicIndex];

    // Find or create difficulty
    let diffIndex = topic.difficulties.findIndex(
      (d) => d.difficulty === difficulty
    );

    if (diffIndex === -1) {
      topic.difficulties.push({
        difficulty,
        completedBatches: [],
      });
      diffIndex = topic.difficulties.length - 1;
    }

    const diff = topic.difficulties[diffIndex];

    if (!diff.completedBatches) {
      diff.completedBatches = [];
    }

    // Add or update batch completion
    const batchIndex = diff.completedBatches.findIndex(
      (b) => b.batchNumber === batchNumber
    );

    const batchData = {
      batchNumber,
      score,
      total,
      answers,
      completedAt: completedAt ? new Date(completedAt) : new Date(),
    };

    if (batchIndex !== -1) {
      // Update existing batch (allow retries, keep best score)
      if (score > diff.completedBatches[batchIndex].score) {
        diff.completedBatches[batchIndex] = batchData;
      }
    } else {
      // Add new batch
      diff.completedBatches.push(batchData);
    }

    // Sort batches by batch number
    diff.completedBatches.sort((a, b) => a.batchNumber - b.batchNumber);

    progress.markModified("topics");
    await progress.save();

    console.log(`✅ Batch ${batchNumber} completed - Score: ${score}/${total} | Streak: ${progress.streak}`);

    return NextResponse.json({
      success: true,
      message: "Batch completed successfully",
      streak: progress.streak,
      batchData: {
        batchNumber,
        score,
        total,
        percentage: Math.round((score / total) * 100),
      },
    });
  } catch (error) {
    console.error("Complete batch error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}