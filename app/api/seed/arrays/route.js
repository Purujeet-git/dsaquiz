import { connectDB } from "@/lib/db";
import Problem from "@/models/Problem";
import { arrayProblems } from "@/lib/seed/arrayProblem";

export async function POST() {
  try {
    await connectDB();

    // optional: prevent duplicate seeding
    if (process.env.NODE_ENV === "production") {
  return Response.json({ error: "Disabled" }, { status: 403 });
}


    const existing = await Problem.find({ topic: "Arrays" });
    if (existing.length > 0) {
      return Response.json({
        success: false,
        message: "Array problems already seeded",
      });
    }

    await Problem.insertMany(arrayProblems);

    return Response.json({
      success: true,
      count: arrayProblems.length,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
