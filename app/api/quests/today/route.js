import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getLevelFromXP,LEVELS } from "@/lib/levels";
import { generateDailyQuestIfNeeded } from "@/lib/dailyQuestGenerator";

export async function GET(){
  try{
    await connectDB();

    const session = await getServerSession(authOptions);
    if(!session){
      return NextResponse.json(
        {success:false,message:"Unauthorized"},
        {status:401}
      );
    }

    const userId = session.user.id;

    const today = new Date();
    today.setHours(0,0,0,0);
    const todayKey = today.toISOString().slice(0,10);

    const dailyQuest = await generateDailyQuestIfNeeded(
      userId,
      todayKey
    );

    await dailyQuest.populate("problems.problemId");

    const total = dailyQuest.problems.length;
    const completed = dailyQuest.problems.filter(
      (p) => p.completed
    ).length;

    const problems = dailyQuest.problems.map((p) => ({
      quizTag:p.problemId.quizTag,
      title:p.problemId.title,
      difficulty:p.problemId.difficulty,
      completed:p.completed,
    }));

    const user = await User.findById(userId).select(
      "totalXP streakCount longestStreak"
    );

    const levelInfo = getLevelFromXP(user.totalXP);

    return NextResponse.json({
      success:true,
      date:todayKey,
      todayCompleted: dailyQuest.completed,

      progress:{
        completed,
        total,
        percentage:
          total === 0 ? 0 : Math.round((completed/total)*100),
      },

      rewards:{
        dailyBonusXP: 30,
        rewardGranted: dailyQuest.rewardGranted,
      },

      user:{
        totalXP:user.totalXP,
        streakCount: user.streakCount,
        longestStreak: user.longestStreak,
        level:levelInfo.level,
        title:levelInfo.title,
        nextLevelXP:
          LEVELS.find(
            (l) => l.level === levelInfo.level + 1
          )?.minXP ?? null,
      },
    });
  }catch(error){
    console.error(error);
    return NextResponse.json(
      {success:false,error:error.message},
      {status:500}
    );
  }
}