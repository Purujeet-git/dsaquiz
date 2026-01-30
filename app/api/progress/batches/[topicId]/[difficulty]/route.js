import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserProgress from "@/models/UserProgress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { topicId, difficulty } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ completedBatches: [] });
    }

    const userId = session.user.id;
    const progress = await UserProgress.findOne({ userId });

    if (!progress) {
      return NextResponse.json({ completedBatches: [] });
    }

    const topic = progress.topics.find((t) => t.topicId === topicId);
    if (!topic) {
      return NextResponse.json({ completedBatches: [] });
    }

    const diff = topic.difficulties.find((d) => d.difficulty === difficulty);
    if (!diff) {
      return NextResponse.json({ completedBatches: [] });
    }

    const completedBatches = diff.completedBatches.map((b) => b.batchNumber);

    return NextResponse.json({ completedBatches });
  } catch (error) {
    console.error("Fetch completed batches error:", error);
    return NextResponse.json({ completedBatches: [] });
  }
}