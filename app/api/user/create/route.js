import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req){
    try{
        await connectDB();

        const body = await req.json();

        const user = await User.create({
            name:body.name,
            email:body.email
        });

        return new Response(
            JSON.stringify({success:true,user}),
            {status:201}
        );

    }catch(err){
        return new Response(
            JSON.stringify({success:false,error:err.message}),
            {status:501}
        );
    }
}