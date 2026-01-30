import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Topic from "@/models/Topic";

export async function  GET() {
    try{
        await connectDB();

        const topics = await Topic.find({isActive:true})
            .select("topicId title order")
            .sort({order:1});

        return NextResponse.json({
            success:true,
            topics,
        });
    }catch(error){
        console.error("FETCH TOPICS ERROR:",error);

        return NextResponse.json(
            {success:false,message:error.message},
            {status:500}
        );
    }
}