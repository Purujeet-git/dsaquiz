import { connectDB } from "@/lib/db";
import Quiz from "@/models/Quiz";

export async function GET() {
  await connectDB();
  const quizzes = await Quiz.find({}, { quizTag: 1, _id: 0 });
  return Response.json(quizzes);
}
