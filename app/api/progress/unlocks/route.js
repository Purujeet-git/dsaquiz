import { NextResponse } from "next/server";

export async function POST(req) {
    const { difficultyProgress } = await req.json();

    const unlocks = {
        easy: true,
        medium: difficultyProgress.easy >= 80,
        hard: difficultyProgress.medium >= 70,
    };

    return NextResponse.json(unlocks);
}