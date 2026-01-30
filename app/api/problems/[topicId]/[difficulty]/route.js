import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Problem from "@/models/Problem";

export async function GET(req,ctx) {
    const params = await ctx.params;
    const { topicId, difficulty } = params;

    if(!["easy","medium","hard"].includes(difficulty)) {
        return NextResponse.json(
            {message:"Invalid difficulty"},
            {status:400}
        );
    }

    await connectDB();

    const problems = await Problem.find({
        topicId,
        difficulty,
        isActive:true,
    })
        .sort({order:1})
        .select("_id title description");
        
    return NextResponse.json(problems);
}