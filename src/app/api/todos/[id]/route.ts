import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/src/lib/prisma";

export async function DELETE(req:NextRequest,{params}:{params:Promise<{id:string}>}){
    const { userId } = await auth();

    if(!userId){
        return NextResponse.json({error:"Unauthorized User"},{status:401});
    }
    try {
        const { id: todoId } = await params;
        const todo = await prisma.todo.findUnique({
            where:{id:todoId}
        }) 
        if(!todo){
            return NextResponse.json({error:"todo not found"},{status:401});
        }

        if(todo.userId!==userId){
            return NextResponse.json({error:"Forbidden"},{status:402});
        }

        await prisma.todo.delete({
            where:{id:todoId}
        })

        return NextResponse.json({message:"Todo Deleted Successfully"},{status:201});
    } catch (error) {
        console.error("Error Deleting Todo");
        return NextResponse.json({message:"Internal Server Error"},{status:401});
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });
    }

    try {
        const { id: todoId } = await params;
        
        const body = await req.json();
        const { title, completed } = body;

        const todo = await prisma.todo.findUnique({
            where: { id: todoId }
        });

        if (!todo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 }); 
        }

        if (todo.userId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 }); 
        }

        const updatedTodo = await prisma.todo.update({
            where: { id: todoId },
            data: {
                title: title !== undefined ? title : todo.title,
                completed: completed !== undefined ? completed : todo.completed,
            }
        });

        return NextResponse.json(
            { message: "Todo Updated Successfully", todo: updatedTodo }, 
            { status: 200 } 
        );

    } catch (error) {
        console.error("Error Updating Todo:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}