// models/UserProgress.js
import mongoose from "mongoose";

const CompletedBatchSchema = new mongoose.Schema(
  {
    batchNumber: Number,
    score: Number,
    total: Number,
    answers: Array,
    completedAt: Date,
  },
  { _id: false }
);

const DifficultyProgressSchema = new mongoose.Schema(
  {
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
    },
    // ❌ REMOVE THIS LINE:
    // completedProblems: [String],
    completedBatches: [CompletedBatchSchema],
  },
  { _id: false }
);

const TopicProgressSchema = new mongoose.Schema(
  {
    topicId: String,
    completed: Boolean,
    difficulties: [DifficultyProgressSchema],
  },
  { _id: false }
);

const UserProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    topics: [TopicProgressSchema],
    streak: {
      type: Number,
      default: 0,
    },
    lastActiveDate: Date,
  },
  { timestamps: true }
);

export default mongoose.models.UserProgress || mongoose.model("UserProgress", UserProgressSchema);