import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/src/lib/prisma";
import { syncUser } from "@/src/lib/sync-user";

const ITEMS_PER_PAGE = 10;
export async function GET(req:NextRequest){
    const { userId } = await auth();

    if(!userId){
        return NextResponse.json({error:"Unauthorized User"},{status:401});
    }

    await syncUser(userId);

    const {searchParams} = new URL(req.url);
    const page = parseInt(searchParams.get("page")||"1");
    const search = searchParams.get("search") || ""

    try{
        const todos = await prisma.todo.findMany({
            where:{
                userId,
                title:{
                    contains:search,
                    mode:"insensitive"
                }
            },
            orderBy:{createdAt:"desc"},
            take:ITEMS_PER_PAGE,
            skip:(page-1)*ITEMS_PER_PAGE
        })

        const totalTodos = await prisma.todo.count({
            where:{
                userId,
                title:{
                    contains:search,
                    mode:"insensitive"
                }
            }
        });

        const totalPages = Math.ceil(totalTodos/ITEMS_PER_PAGE);
        return NextResponse.json({todos,currentPage:page,totalPages})


    }catch(err){
        console.error("Error Fetching TODOS");
        return NextResponse.json({message:"Internal Server Error"},{status:401});
    }
}

export async function POST(req:NextRequest){
    const { userId } = await auth();

    if(!userId){
        return NextResponse.json({error:"Unauthorized User"},{status:401});
    }
    await syncUser(userId);
    const user = await prisma.user.findUnique({
        where:{id:userId},
        include:{todos:true}
    });

    if(!user){
        return NextResponse.json({error:"User not Found"},{status:401});
    }

    if(!user.isSubscribed && user.todos.length>=5){
        return NextResponse.json({error:"Free Users Can Only Create upto 5 free TODOS. Please subscribe to our paid plans to write awesome todos"},{status:403});
    }

    const {title} = await req.json();
    const todo = await prisma.todo.create({
        data:{title,userId}
    })
    return NextResponse.json(todo,{status:201})

}