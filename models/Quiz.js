import mongoose, { mongo } from "mongoose";

const QuizQuestionSchema = new mongoose.Schema(
    {
        type:{
            type:String,
            enum:["mcq","multi"],
            required:true,
        },
        question:{
            type:String,
            required:true,
        },
        options:{
            type:[String],
            required:true,
        },
        correct:{
            type:mongoose.Schema.Types.Mixed,
            required:true,
        },
        explaination:{
            type:String,
            required:true,
        },
    },
    {_id:false}
);

const QuizSchema = new mongoose.Schema(
    {
        quizTag:{
            type:String,
            required:true,
            unique:true,
        },
        difficulty:{
            type:String,
            enum:["Easy","Medium","Hard"],
            required:true,
        },
        questions:{
            type:[QuizQuestionSchema],
            required:true,
        },
    },
    {timestamps:true}
);

export default mongoose.models.Quiz || mongoose.model("Quiz",QuizSchema);