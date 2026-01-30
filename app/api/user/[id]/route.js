  import { connectDB } from "@/lib/db";
  import User from "@/models/User";
  import { getUserIdFromRequest } from "@/lib/getUserId";
  import { getLevelFromXP, LEVELS } from "@/lib/levels";

  export async function GET(req) {
    try {
      await connectDB();

      // ✅ Single source of truth for user identity
      const userId = getUserIdFromRequest(req);

      const user = await User.findById(userId).select(
        "name email totalXP streakCount"
      );

      if (!user) {
        return Response.json(
          { success: false, message: "User not found" },
          { status: 404 }
        );
      }

      // ✅ Derive level from XP
      const levelInfo = getLevelFromXP(user.totalXP);

      // (Optional debug – remove later)
      console.log("USER XP:", user.totalXP);
      console.log("LEVEL INFO:", levelInfo);

      return Response.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          totalXP: user.totalXP,
          streakCount: user.streakCount,
          level: levelInfo.level,
          title: levelInfo.title,
          nextLevelXP:
            LEVELS.find((l) => l.level === levelInfo.level + 1)?.minXP ?? null,
        },
      });
    } catch (error) {
      console.error(error);

      return Response.json(
        { success: false, message: error.message },
        { status: 401 }
      );
    }
  }
