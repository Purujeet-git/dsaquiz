import DailyQuest from "@/models/DailyQuest";
import Problem from "@/models/Problem";
import User from "@/models/User";
import { getLevelFromXP } from "./levels";

function pickRandom(arr,count){
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0,count);
}

export async function generateDailyQuestIfNeeded(userId,date){
    const existing = await DailyQuest.findOne({userId,date});
    if (existing) return existing;

    const user = await User.findById(userId).select("totalXP");
    const level = getLevelFromXP(user.totalXP).level;

    let mix;
    if(level <= 2){
        mix = {Easy: 3, Medium: 1, Hard: 0};
    } else if (level <= 4){
        mix = {Easy: 2, Medium: 2, Hard: 0};
    } else {
        mix = {Easy: 1, Medium: 2, Hard: 1};
    }

    const [easy,medium,hard] = await Promise.all([
        Problem.find({difficulty:"Easy"}),
        Problem.find({difficulty:"Medium"}),
        Problem.find({difficulty:"Hard"}),
    ]);

    const selectedProblems = [
        ...pickRandom(easy, mix.Easy),
        ...pickRandom(medium,mix.Medium),
        ...pickRandom(hard,mix.Hard),
    ];

    if(selectedProblems.length === 0){
        throw new Error("No Problems available to generate daily quest");
    }

    const dailyQuest = await DailyQuest.create({
        userId,
        date,
        problems: selectedProblems.map((p) => ({
            problemId: p._id,
            completed: false,
        })),
        completed:false,
        rewardGranted: false,
    });

    return dailyQuest;
}