import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, email_addresses } = body.data;
    const primaryEmail = email_addresses[0].email_address;

    // Direct mirror of your production webhook write logic
    const newUser = await prisma.user.create({
      data: {
        id: id,
        email: primaryEmail,
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "🎉 Neon DB Write Successful!", 
      user: newUser 
    }, { status: 200 });

  } catch (error: any) {
    console.error("Database Crash:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Internal Server Error" 
    }, { status: 500 });
  }
}