import { NextRequest, NextResponse } from "next/server";
import { auth,clerkClient } from "@clerk/nextjs/server";
import prisma from "@/src/lib/prisma";

async function isAdmin(userId:string) {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    return user.publicMetadata.role === "admin";
}

const ITEMS_PER_PAGE = 10;
export async function GET(req: NextRequest) {
  const { userId } = await auth();

  if (!userId || !(await isAdmin(userId))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const page = parseInt(searchParams.get("page") || "1");

  try {
    let user;
    let role = "user";
    if (email) {
      user = await prisma.user.findUnique({
        where: { email },
        include: {
          todos: {
            orderBy: { createdAt: "desc" },
            take: ITEMS_PER_PAGE,
            skip: (page - 1) * ITEMS_PER_PAGE,
          },
        },
      });

      if (user) {
        try {
          const client = await clerkClient();
          const clerkUser = await client.users.getUser(user.id);
          role = (clerkUser.publicMetadata.role as string) || "user";
        } catch (clerkErr) {
          console.error("Error fetching Clerk user role:", clerkErr);
        }
      }
    }

    const totalItems = email
      ? await prisma.todo.count({ where: { user: { email } } })
      : 0;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    return NextResponse.json({ user, totalPages, currentPage: page, role });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const { userId } = await auth();

  if (!userId || !(await isAdmin(userId))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email, isSubscribed, todoId, todoCompleted, todoTitle, role } =
      await req.json();

    if (isSubscribed !== undefined) {
      await prisma.user.update({
        where: { email },
        data: {
          isSubscribed,
          subscriptionEnds: isSubscribed
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            : null,
        },
      });
    }

    if (role !== undefined) {
      const client = await clerkClient();
      const response = await client.users.getUserList({ emailAddress: [email] });
      const targetClerkUser = response.data[0];
      if (targetClerkUser) {
        await client.users.updateUser(targetClerkUser.id, {
          publicMetadata: {
            ...targetClerkUser.publicMetadata,
            role: role === "admin" ? "admin" : null,
          },
        });
      } else {
        return NextResponse.json({ error: "Clerk user not found" }, { status: 404 });
      }
    }

    if (todoId) {
      await prisma.todo.update({
        where: { id: todoId },
        data: {
          completed: todoCompleted !== undefined ? todoCompleted : undefined,
          title: todoTitle || undefined,
        },
      });
    }

    return NextResponse.json({ message: "Update successful" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { userId } = await auth();

  if (!userId || !(await isAdmin(userId))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { todoId } = await req.json();

    if (!todoId) {
      return NextResponse.json(
        { error: "Todo ID is required" },
        { status: 400 }
      );
    }

    await prisma.todo.delete({
      where: { id: todoId },
    });

    return NextResponse.json({ message: "Todo deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

