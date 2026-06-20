import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/src/lib/prisma";
import { syncUser } from "@/src/lib/sync-user";

export async function POST() {
    const { userId } = await auth();

    if(!userId){
        return NextResponse.json({error:"Unauthorized User"},{status:401});
    }
    try {
        const user = await syncUser(userId);
        if (!user){
            return NextResponse.json({erro:"User Not Found"},{status:401});
        }
        const subscriptionEnds = new Date();
        subscriptionEnds.setMonth(subscriptionEnds.getMonth()+1);
        const updatedUser = await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                isSubscribed:true,
                subscriptionEnds:subscriptionEnds
            },
        });
        
        return NextResponse.json({ message:"Subscription Successfull",subscriptionEnds:updatedUser.subscriptionEnds }, { status: 200 });
    }catch(err){
        console.error("Error Updating Subscription");
        return NextResponse.json({message:"Internal Server Error"},{status:401});
    }

}


export async function GET() {
    const { userId } = await auth();

    if(!userId){
        return NextResponse.json({error:"Unauthorized User"},{status:401});
    }
    try{
        const user = await syncUser(userId);
        if (!user){
            return NextResponse.json({erro:"User Not Found"},{status:401});
        }
        const now = new Date();
        if (user.subscriptionEnds && user.subscriptionEnds<now){
            await prisma.user.update({
                where:{id:userId},
                data:{
                    isSubscribed:false,
                    subscriptionEnds:null
                }
            })
            return NextResponse.json({isSubscribed:false,
                    subscriptionEnds:null});
        }
        return NextResponse.json({isSubscribed:user.isSubscribed,
                    subscriptionEnds:user.subscriptionEnds});
    }catch(err){
        console.error("Error Fetching Subscription");
        return NextResponse.json({message:"Internal Server Error"},{status:401});
    }
}