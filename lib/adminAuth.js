import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function requireAdmin(){
    const session = await getServerSession(authOptions);

    if(!session?.user?.id){
        return{
            authorized:false,
            response: NextResponse.json(
                {success:false,message:"Unauthorized - Please Login!"},
            ),
        };
    }

    if(!session.user.isAdmin){
        return {
            authorized:false,
            response:NextResponse.json(
                { success: false, message: "Forbidden - Admin access required!"},
                {status:403}
            ),
        };
    }

    return { authorized : true, session};
}