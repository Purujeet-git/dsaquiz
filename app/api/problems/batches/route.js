import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Problem from "@/models/Problem";

export async function GET(req) {
    try{
        await connectDB();

        const { searchParams } = new URL(req.url);
        const topicId = searchParams.get("topicId");
        const difficulty = searchParams.get("difficulty");

        if(!topicId || !difficulty) {
            return NextResponse.json(
                {
                    success:false,
                    message:"topicId and difficulty are required",
                },
                {status:400}
            );
        }

        const problem = await Problem.findOne({
            topicId:topicId.trim().toLowerCase(),
            difficulty,
            isActive:true,
        });

        if(!problem){
            return NextResponse.json(
                {
                    success:false,
                    message:"No batches found",
                },
                {status:404}
            );
        }

        return NextResponse.json({
            success:true,
            batches: problem.batches,
            totalBatches: problem.batches.length,
        });
    }catch(error){
        console.error("Fetch Batches Error:",error);
        return NextResponse.json(
            {success:false,messag:error.message},
            {status:500}
        );
    }
}