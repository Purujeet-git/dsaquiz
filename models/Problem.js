// models/Problem.js
import mongoose from "mongoose";

const MCQSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      default: "",
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function(arr) {
          return arr.length >= 2;
        },
        message: "At least 2 options are required"
      }
    },
    correct: {
      type: Number,
      required: true,
      validate: {
        validator: function(val) {
          return val >= 0 && val < this.options.length;
        },
        message: "Correct answer index must be valid"
      }
    },
    explanation: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const BatchSchema = new mongoose.Schema(
  {
    batchNumber: {
      type: Number,
      required: true,
    },
    title: {  // ✅ NEW: Title specific to this batch
      type: String,
      required: true,
    },
    description: {  // ✅ NEW: Description specific to this batch
      type: String,
      default: "",
    },
    understanding: {
      type: [MCQSchema],
      default: [],
    },
    approach: {
      type: [MCQSchema],
      default: [],
    },
    complexity: {
      time: {
        type: String,
        default: "",
      },
      space: {
        type: String,
        default: "",
      },
    },
  },
  { _id: false }
);

const ProblemSchema = new mongoose.Schema(
  {
    topicId: {
      type: String,
      required: true,
      index: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
      index: true,
    },
    // ❌ REMOVED: title and description from Problem level
    // They should be per-batch, not per-problem
    batches: {
      type: [BatchSchema],
      default: [],
      validate: {
        validator: function(arr) {
          const batchNumbers = arr.map(b => b.batchNumber);
          return batchNumbers.length === new Set(batchNumbers).size;
        },
        message: "Batch numbers must be unique"
      }
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Compound index for efficient queries
ProblemSchema.index({ topicId: 1, difficulty: 1 });

// Index for sorting by order
ProblemSchema.index({ order: 1 });

// Virtual to get total questions across all batches
ProblemSchema.virtual('totalQuestions').get(function() {
  return this.batches.reduce((total, batch) => {
    return total + batch.understanding.length + batch.approach.length;
  }, 0);
});

// Virtual to get questions with code
ProblemSchema.virtual('questionsWithCode').get(function() {
  return this.batches.reduce((total, batch) => {
    const understandingWithCode = batch.understanding.filter(q => q.code && q.code.trim()).length;
    const approachWithCode = batch.approach.filter(q => q.code && q.code.trim()).length;
    return total + understandingWithCode + approachWithCode;
  }, 0);
});

// Ensure virtuals are included in JSON output
ProblemSchema.set('toJSON', { virtuals: true });
ProblemSchema.set('toObject', { virtuals: true });

export default mongoose.models.Problem || mongoose.model("Problem", ProblemSchema);