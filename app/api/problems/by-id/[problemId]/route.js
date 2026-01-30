import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Problem from "@/models/Problem";
import mongoose from "mongoose";

export async function GET(req, ctx) {
  const params = await ctx.params; // ✅ REQUIRED in Next 15
  const { problemId } = params;

  if (!problemId || !mongoose.Types.ObjectId.isValid(problemId)) {
    return NextResponse.json(
      { success: false, message: "Invalid problemId" },
      { status: 400 }
    );
  }

  await connectDB();

  const problem = await Problem.findById(problemId);

  if (!problem || !problem.isActive) {
    return NextResponse.json(
      { success: false, message: "Problem not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    problem,
  });
}
