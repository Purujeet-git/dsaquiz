// models/Topic.js
import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema(
  {
    topicId: {
      type: String,
      required: true,
      unique: true,
      index: true, // used in URLs
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
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

export default mongoose.models.Topic ||
  mongoose.model("Topic", TopicSchema);
