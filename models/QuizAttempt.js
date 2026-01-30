import mongoose from "mongoose";
import Quiz from "./Quiz";

const QuizAttemptSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

        quizTag:{
            type:String,
            required:true,
        },

        score:{
            type:Number,
            required:true,
        },

        passed:{
            type:Boolean,
            required:true,
        },

        attemptedAt:{
            type:Date,
            default:Date.now,
        },
    },
    {timestamps:true}
);

const QuizAttempt = 
    mongoose.models.QuizAttempt ||
    mongoose.model("QuizAttempt",QuizAttemptSchema);

export default QuizAttempt;