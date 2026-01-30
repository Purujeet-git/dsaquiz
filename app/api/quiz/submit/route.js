import { connectDB } from "@/lib/db";
import Quiz from "@/models/Quiz";
import User from "@/models/User";
import QuizAttempt from "@/models/QuizAttempt";
import DailyQuest from "@/models/DailyQuest";
import Problem from "@/models/Problem";
import mongoose from "mongoose";

import { getUserIdFromRequest } from "@/lib/getUserId";
import { updateStreak } from "@/lib/streak";
import { detectLevelUp } from "@/lib/levelUp";

export async function POST(req) {
  try {
    await connectDB();

    // ---------------- USER ----------------
    const userId = getUserIdFromRequest(req);

    // ---------------- BODY ----------------
    const { quizTag, answers } = await req.json();

    if (!quizTag || !Array.isArray(answers)) {
      return Response.json(
        { success: false, message: "Invalid payload" },
        { status: 400 }
      );
    }

    // ---------------- QUIZ ----------------
    const quiz = await Quiz.findOne({ quizTag });

    if (!quiz) {
      return Response.json(
        { success: false, message: "Quiz not found" },
        { status: 404 }
      );
    }

    // ---------------- SCORE ----------------
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (q.type === "mcq" && answers[i] === q.correct) {
        correct++;
      }
    });

    const score = Math.round(
      (correct / quiz.questions.length) * 100
    );
    const passed = score >= 70;

    // ---------------- DAILY QUEST LOCK ----------------
    const today = new Date().toISOString().slice(0, 10);

    const dailyQuest = await DailyQuest.findOne({
      userId,
      date: today,
    });

    if (!dailyQuest) {
      return Response.json({
        success: false,
        message: "No active Daily Quest for today",
      });
    }

    const problem = await Problem.findOne({ quizTag });

    if (!problem) {
      return Response.json({
        success: false,
        message: "Problem not found for this quiz",
      });
    }

    const questProblem = dailyQuest.problems.find(
      (p) => p.problemId.toString() === problem._id.toString()
    );

    if (!questProblem) {
      return Response.json({
        success: false,
        message: "This quiz is not part of today's Daily Quest",
      });
    }

    if (questProblem.completed) {
      return Response.json({
        success: true,
        message: "Problem already completed today",
        score,
        passed,
      });
    }

    // ---------------- ATTEMPT LOG ----------------
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const alreadyPassedToday = await QuizAttempt.findOne({
      userId,
      quizTag,
      passed: true,
      attemptedAt: { $gte: todayStart },
    });

    await QuizAttempt.create({
      userId,
      quizTag,
      score,
      passed,
    });

    // ---------------- XP CALCULATION (SINGLE SOURCE) ----------------
    let xpGain = 0;

    if (passed && !alreadyPassedToday) {
      xpGain +=
        quiz.difficulty === "Easy"
          ? 10
          : quiz.difficulty === "Medium"
          ? 20
          : 35;
    }

    // ---------------- DAILY QUEST PROGRESS ----------------
    questProblem.completed = true;

    const allCompleted = dailyQuest.problems.every(
      (p) => p.completed === true
    );

    if (allCompleted) {
      dailyQuest.completed = true;

      if (!dailyQuest.rewardGranted) {
        xpGain += 30; // 🎁 Daily quest bonus
        dailyQuest.rewardGranted = true;
      }
    }

    // ---------------- USER UPDATE (ONCE) ----------------
    let levelUpPayload = null;

    if (xpGain > 0) {
      const user = await User.findById(userId);

      const prevXP = user.totalXP;
      const nextXP = prevXP + xpGain;

      const levelCheck = detectLevelUp(prevXP, nextXP);

      user.totalXP = nextXP;
      updateStreak(user);
      await user.save();

      if (levelCheck.leveledUp) {
        levelUpPayload = {
          leveledUp: true,
          newLevel: levelCheck.to,
          title: levelCheck.title,
        };
      }
    }

    await dailyQuest.save();

    // ---------------- RESPONSE ----------------
    return Response.json({
      success: true,
      score,
      passed,
      ...(levelUpPayload ?? {}),
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
