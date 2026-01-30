import { connectDB } from "@/lib/db";
import DailyQuest from "@/models/DailyQuest";
import Problem from "@/models/Problem";
import User from "@/models/User";
import { getUserIdFromRequest } from "@/lib/getUserId";
import { getLevelFromXP,LEVELS } from "@/lib/levels";

export async function GET(req){
    try{
        await connectDB();

        const userId = getUserIdFromRequest(req);
        const today = new Date().toISOString().slice(0,10);

        const dailyQuest  = await DailyQuest.findOne({
            userId,
            date:today,
        }).populate("problems.problemId");

        if(!dailyQuest){
            return Response.json({
                success:true,
                date:today,
                todayCompleted:false,
                quest:null,
                message:"No daily quest generated yet",
            });
        }

        const total = dailyQuest.problems.length;
        const completed = dailyQuest.problems.filter(
            (p) => p.completed
        ).length;

        const problems = dailyQuest.problems.map((p) => ({
            quizTag:p.problems.quizTag,
            title:p.problemId.title,
            difficulty: p.problemId.difficulty,
            completed: p.completed,
        }));

        const user = await User.findById(userId).select(
            "totalXP streakCount"
        );

        const levelInfo = getLevelFromXP(user.totalXP);

        return Response.json({
            success:true,
            date:today,
            todayCompleted: dailyQuest.completed,

            progress:{
                completed,
                total,
                percentage: Math.round((completed / total) * 100),
            },

            quest: {
                problems,
            },

            rewards: {
                dailyBonusXP: 30,
                rewardGranted: dailyQuest.rewardGranted,
            },

            user:{
                totalXP: user.totalXP,
                streakCount: user.streakCount,
                level: levelInfo.level,
                title: levelInfo.title,
                nextLevelXP:
                    LEVELS.find(
                        (l) => l.level === levelInfo.level + 1
                    )?.minXP ?? null,
            },
        });
    }catch(error){
        console.error(error);
        return Response.json(
            {success:false,error:error.message},
            {status:500}
        );
    }
}