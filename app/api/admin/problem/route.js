import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Problem from "@/models/Problem";

// ✅ Function to generate unique question IDs
function generateQuestionId(topicId, difficulty, batchNumber, type, index) {
  return `${topicId}_${difficulty}_b${batchNumber}_${type}_q${index + 1}`;
}

// ✅ Function to validate and sanitize question structure
function validateQuestion(question, topicId, difficulty, batchNumber, type, index) {
  const validated = {
    id: question.id || generateQuestionId(topicId, difficulty, batchNumber, type, index),
    question: question.question || "",
    code: question.code || "", // ✅ NEW: Code field with default empty string
    options: Array.isArray(question.options) ? question.options : [],
    correct: typeof question.correct === 'number' ? question.correct : 0,
    explanation: question.explanation || ""
  };

  // Basic validation
  if (!validated.question.trim()) {
    throw new Error(`Question text is required for ${type} question ${index + 1}`);
  }

  if (validated.options.length < 2) {
    throw new Error(`At least 2 options required for ${type} question ${index + 1}`);
  }

  if (validated.correct < 0 || validated.correct >= validated.options.length) {
    throw new Error(`Invalid correct answer index for ${type} question ${index + 1}`);
  }

  return validated;
}

export async function POST(req) {
  try {
    await connectDB();

    const { topicId, difficulty, title, description, batchNumber, order, steps } = await req.json();

    // Validate required fields
    if (!topicId || !difficulty || !title || batchNumber === undefined || !steps) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate batch number
    if (typeof batchNumber !== 'number' || batchNumber < 1) {
      return NextResponse.json(
        { success: false, message: "Batch number must be a positive integer" },
        { status: 400 }
      );
    }

    // ✅ Validate and process questions with code field support
    const processedSteps = {
      understanding: [],
      approach: [],
      complexity: steps.complexity || { time: "", space: "" }
    };

    // Process understanding questions
    if (Array.isArray(steps.understanding)) {
      processedSteps.understanding = steps.understanding.map((q, index) => 
        validateQuestion(q, topicId, difficulty, batchNumber, 'understanding', index)
      );
    }

    // Process approach questions
    if (Array.isArray(steps.approach)) {
      processedSteps.approach = steps.approach.map((q, index) => 
        validateQuestion(q, topicId, difficulty, batchNumber, 'approach', index)
      );
    }

    // Ensure at least one question exists
    const totalQuestions = processedSteps.understanding.length + processedSteps.approach.length;
    if (totalQuestions === 0) {
      return NextResponse.json(
        { success: false, message: "At least one question is required" },
        { status: 400 }
      );
    }

    // Find existing problem for this topic/difficulty
    let problem = await Problem.findOne({ topicId, difficulty });

    const newBatch = {
      batchNumber,
      title,
      description,
      understanding: processedSteps.understanding,
      approach: processedSteps.approach,
      complexity: processedSteps.complexity,
    };

    if (problem) {
      // Check if batch number already exists
      const existingBatchIndex = problem.batches.findIndex(
        (b) => b.batchNumber === batchNumber
      );

      if (existingBatchIndex !== -1) {
        // Update existing batch
        problem.batches[existingBatchIndex] = newBatch;
      } else {
        // Add new batch
        problem.batches.push(newBatch);
      }

      // Sort batches by batchNumber
      problem.batches.sort((a, b) => a.batchNumber - b.batchNumber);

      // Update title and description if provided
      
      if (order !== undefined) problem.order = order;

      await problem.save();
    } else {
      // Create new problem with first batch
      problem = new Problem({
        topicId,
        difficulty,
        order: order || 0,
        batches: [newBatch],
      });

      await problem.save();
    }

    // Count questions with code
    const questionsWithCode = [
      ...processedSteps.understanding,
      ...processedSteps.approach
    ].filter(q => q.code && q.code.trim() !== '').length;

    return NextResponse.json({
      success: true,
      message: `Batch ${batchNumber} saved successfully`,
      problem: {
        id: problem._id,
        topicId: problem.topicId,
        difficulty: problem.difficulty,
        totalBatches: problem.batches.length,
      },
      stats: {
        totalQuestions,
        understandingQuestions: processedSteps.understanding.length,
        approachQuestions: processedSteps.approach.length,
        questionsWithCode,
      }
    });
  } catch (error) {
    console.error("Problem upload error:", error);
    
    // Return more specific error messages
    if (error.message.includes('Question') || error.message.includes('options')) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}