import { connectDB } from "@/lib/db";
import Quiz from "@/lib/Quiz";
import { arrayQuizzes } from "@/lib/seed/arrayQuizzes";

export async function POST() {
    try{
        await connectDB();

        const existing = await Quiz.find({});
        if(existing.length > 0){
            return Response.json({
                success:false,
                message:"Quizzes already seeded",
            });
        }

        await Quiz.insertMany(arrayQuizzes);

        return Response.json({
            success:true,
            count:arrayQuizzes.length,
        });
    }catch(error){
        console.error(error);
        return Response.json(
            {success:false,error:error.message},
            {status:500}
        );
    }
}