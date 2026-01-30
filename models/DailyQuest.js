import mongoose from "mongoose";

const DailyQuestSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        date:{
            type:String,
            requried:true,
        },
        problems:[
            {
                problemId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Problem",
                    requried:true,
                },
                completed:{
                    type:Boolean,
                    default:false,
                },
            },
        ],
        completed:{
            type:Boolean,
            default:false,
        },
        rewardGranted:{
            type:Boolean,
            default:false,
        },
    },
    {timestamps:true}
);

const DailyQuest = 
    mongoose.models.DailyQuest ||
    mongoose.model("DailyQuest",DailyQuestSchema);

export default DailyQuest;