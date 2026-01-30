import { connectDB } from "@/lib/db";
import Quiz from "@/models/Quiz";

export async function GET(req, { params }) {
  // Await params in Next.js 15+
  const { quizTag } = await params;
  
  if (!quizTag) {
    return Response.json(
      { success: false, message: "quizTag is required" },
      { status: 400 }
    );
  }

  await connectDB();
  
  const quiz = await Quiz.findOne({ quizTag: quizTag.trim() });

  if (!quiz) {
    return Response.json(
      { success: false, message: "Quiz not found" },
      { status: 404 }
    );
  }

  return Response.json({
    success: true,
    quizTag: quiz.quizTag,
    difficulty: quiz.difficulty,
    questions: quiz.questions.map(q => ({
      type: q.type,
      question: q.question,
      options: q.options,
    })),
  });
}
