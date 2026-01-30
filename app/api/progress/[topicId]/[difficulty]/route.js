import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserProgress from "@/models/UserProgress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function GET(req, {params}) {
    await connectDB();


    const {topicId,difficulty} = await params;

    const session = await getServerSession(authOptions);

    const userId = session.user.id;

    const progress = await UserProgress.findOne({userId});

    if(!progress){
        return NextResponse.json({completedProblemIds:[]});
    }

    const topic = progress.topics.find(
        (t) => t.topicId === topicId
    );

    if(!topic){
        return NextResponse.json({completedProblemIds:[]});
    }

    const diff = topic.difficulties.find(
        (d) => d.difficulty === difficulty
    );

    if(!diff){
        return NextResponse.json({completedProblemIds: []});
    }

    const completedProblemIds = diff.completedProblems.map(
        (p) => p.problemId
    );

    return NextResponse.json({completedProblemIds});

}