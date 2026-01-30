"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminRoute({children}) {
    const { data: session, status} = useSession();
    const router = useRouter();

    useEffect(() => {
        if( status === "loading") return;

        if(!session){
            router.push('/login');
            return;
        }

        if(!session.user.isAdmin){
            router.push('/');
            return;
        }
    },[session,status,router]);

    if(status === "loading"){
        return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-xl text-white">Loading...</div>
      </div>
        );
    }

    if(!session || !session.user.isAdmin){
        return null;
    }
    return <>{children}</>;
}