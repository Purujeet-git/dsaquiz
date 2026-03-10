import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export const authOptions = {
    
    session: {
        strategy: "jwt",
    },

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    callbacks: {
        async signIn({ user }) {
            await connectDB();

            let dbUser = await User.findOne({ email: user.email });

            if (!dbUser) {
                dbUser = await User.create({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    isAdmin: false, // ✅ Default to non-admin for new users
                    totalXP: 0,
                    streakCount: 0,
                    longestStreak: 0,
                    topicStreaks: [],
                    createdAt: new Date(),
                });
            }

            // ✅ Attach MongoDB _id and admin status to user object
            user.mongoId = dbUser._id.toString();
            user.isAdmin = dbUser.isAdmin || false; // ✅ Add admin status
            user.level = dbUser.level || 1;
            user.totalXP = dbUser.totalXP || 0;
            user.streakCount = dbUser.streakCount || 0;
            
            // console.log("✅ signIn callback - user.mongoId:", user.mongoId);
            // console.log("✅ signIn callback - user.isAdmin:", user.isAdmin);
            return true;
        },

        async jwt({ token, user, trigger, session }) {
            if (user?.mongoId) {
                token.id = user.mongoId; // ✅ MongoDB _id
                token.isAdmin = user.isAdmin; // ✅ Admin status
                token.level = user.level;
                token.totalXP = user.totalXP;
                token.streakCount = user.streakCount;
                
                // console.log("✅ jwt callback - token.id:", token.id);
                // console.log("✅ jwt callback - token.isAdmin:", token.isAdmin);
            }
            
            // ✅ Handle session updates (when user completes batches, etc.)
            if (trigger === "update" && session) {
                // Refresh user data from DB
                await connectDB();
                const dbUser = await User.findById(token.id);
                
                if (dbUser) {
                    token.isAdmin = dbUser.isAdmin;
                    token.level = dbUser.level;
                    token.totalXP = dbUser.totalXP;
                    token.streakCount = dbUser.streakCount;
                }
            }
            
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id; // ✅ MongoDB _id
                session.user.isAdmin = token.isAdmin; // ✅ Admin status
                session.user.level = token.level;
                session.user.totalXP = token.totalXP;
                session.user.streakCount = token.streakCount;
                
                // console.log("✅ session callback - session.user.id:", session.user.id);
                // console.log("✅ session callback - session.user.isAdmin:", session.user.isAdmin);
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };