import mongoose from "mongoose";

const TopicStreakSchema = new mongoose.Schema({
    topicId:{
        type:String,
        required:true,
    },
    currentStreak:{
        type:Number,
        default:0,
    },
    longestStreak:{
        type:Number,
        default:0,
    },
    lastActiveDate:{
        type:Date,  
    },
});

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String }, // Add password field (optional if using OAuth)
    image: String,
    
    // ✅ ADD ADMIN FIELD
    isAdmin: { type: Boolean, default: false },
    
    // Gamification fields
    level: { type: Number, default: 1 },
    totalXP: { type: Number, default: 0 },
    streakCount: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastActiveDate: { type: Date },
    topicStreaks: [TopicStreakSchema],
},
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);