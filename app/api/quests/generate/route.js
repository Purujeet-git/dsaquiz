import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import DailyQuest from "@/models/DailyQuest";
import User from "@/models/User";
import Problem from "@/models/Problem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getLevelFromXP } from "@/lib/levels";

function pickRandom(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export async function POST() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const today = new Date().toISOString().slice(0, 10);

    const existingQuest = await DailyQuest.findOne({
      userId,
      date: today,
    });

    if (existingQuest) {
      return NextResponse.json({
        success: true,
        message: "Daily quest already exists",
        questId: existingQuest._id,
      });
    }

    const user = await User.findById(userId).select("totalXP");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const { level } = getLevelFromXP(user.totalXP);

    let mix;
    if (level <= 2) {
      mix = { easy: 3, medium: 1, hard: 0 };
    } else if (level <= 4) {
      mix = { easy: 2, medium: 2, hard: 0 };
    } else {
      mix = { easy: 1, medium: 2, hard: 1 };
    }

    const easy = await Problem.find({ difficulty: "easy" });
    const medium = await Problem.find({ difficulty: "medium" });
    const hard = await Problem.find({ difficulty: "hard" });

    const selected = [
      ...pickRandom(easy, mix.easy),
      ...pickRandom(medium, mix.medium),
      ...pickRandom(hard, mix.hard),
    ];

    if (selected.length === 0) {
      return NextResponse.json(
        { success: false, message: "No problems available" },
        { status: 400 }
      );
    }

    const dailyQuest = await DailyQuest.create({
      userId,
      date: today,
      problems: selected.map((p) => ({
        problemId: p._id,
        completed: false,
      })),
      completed: false,
      rewardGranted: false,
    });

    return NextResponse.json({
      success: true,
      message: "Daily quest generated",
      questId: dailyQuest._id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
