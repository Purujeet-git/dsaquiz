import { connectDB } from "@/lib/db";

export async function GET(){
    try{
        await connectDB();
        return new Response(
            JSON.stringify({success:true,message:"MongoDB connected"}),
            {status:200}
        );
    }catch(err){
        return new Response(
            JSON.stringify({success:false,error:err.message}),
            {status:500}
        );
    }
}