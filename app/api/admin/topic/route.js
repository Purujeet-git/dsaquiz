import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Topic from "@/models/Topic";
import { requireAdmin } from "@/lib/adminAuth";

export async function POST(req) {
    try {
        // ✅ Check admin access first
        const { authorized, response, session } = await requireAdmin();
        if (!authorized) return response;

        await connectDB();

        const { topicId, title, description, order } = await req.json();

        if (!topicId || !title) {
            return NextResponse.json(
                {
                    success: false,
                    message: "topicId and title are required",
                },
                { status: 400 }
            );
        }

        const normalizedTopicId = topicId
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-'); // ✅ Also replace spaces with hyphens

        const existing = await Topic.findOne({ topicId: normalizedTopicId });

        if (existing) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Topic already exists",
                },
                { status: 409 }
            );
        }

        const topic = await Topic.create({
            topicId: normalizedTopicId,
            title,
            description: description || "",
            order: order ?? 0,
            isActive: true,
        });

        console.log(`✅ Topic created by ${session.user.email}:`, topic.topicId);

        return NextResponse.json({
            success: true,
            topic,
        });
    } catch (error) {
        console.error("ADMIN TOPIC ERROR:", error);
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}

// ✅ Optional: GET endpoint to list all topics (admin only)
export async function GET(req) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        await connectDB();

        const topics = await Topic.find()
            .sort({ order: 1, createdAt: 1 })
            .select('topicId title description order isActive createdAt');

        return NextResponse.json({
            success: true,
            topics,
            count: topics.length,
        });
    } catch (error) {
        console.error("GET TOPICS ERROR:", error);
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}

// ✅ Optional: DELETE endpoint to remove topics (admin only)
export async function DELETE(req) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        await connectDB();

        const { topicId } = await req.json();

        if (!topicId) {
            return NextResponse.json(
                { success: false, message: "topicId is required" },
                { status: 400 }
            );
        }

        const deleted = await Topic.findOneAndDelete({ topicId });

        if (!deleted) {
            return NextResponse.json(
                { success: false, message: "Topic not found" },
                { status: 404 }
            );
        }

        console.log(`✅ Topic deleted:`, topicId);

        return NextResponse.json({
            success: true,
            message: "Topic deleted successfully",
        });
    } catch (error) {
        console.error("DELETE TOPIC ERROR:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

// ✅ Optional: PATCH endpoint to update topics (admin only)
export async function PATCH(req) {
    try {
        const { authorized, response } = await requireAdmin();
        if (!authorized) return response;

        await connectDB();

        const { topicId, updates } = await req.json();

        if (!topicId) {
            return NextResponse.json(
                { success: false, message: "topicId is required" },
                { status: 400 }
            );
        }

        const topic = await Topic.findOneAndUpdate(
            { topicId },
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!topic) {
            return NextResponse.json(
                { success: false, message: "Topic not found" },
                { status: 404 }
            );
        }

        console.log(`✅ Topic updated:`, topicId);

        return NextResponse.json({
            success: true,
            topic,
        });
    } catch (error) {
        console.error("UPDATE TOPIC ERROR:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}