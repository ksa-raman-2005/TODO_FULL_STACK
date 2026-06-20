import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email parameter is required. Example: /api/admin/promote?email=user@example.com" },
      { status: 400 }
    );
  }

  try {
    const client = await clerkClient();
    // Retrieve Clerk user by email address
    const response = await client.users.getUserList({ emailAddress: [email] });
    const user = response.data[0];

    if (!user) {
      return NextResponse.json(
        { error: `User with email ${email} not found in Clerk.` },
        { status: 404 }
      );
    }

    // Update public metadata to set the role to "admin"
    await client.users.updateUser(user.id, {
      publicMetadata: {
        ...user.publicMetadata,
        role: "admin",
      },
    });

    return NextResponse.json({
      success: true,
      message: `User ${email} has been promoted to admin successfully!`,
    });
  } catch (error: any) {
    console.error("Promotion Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
