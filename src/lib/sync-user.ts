import { clerkClient } from "@clerk/nextjs/server";
import prisma from "./prisma";

export async function syncUser(userId: string) {
  let user = await prisma.user.findUnique({
    where: { id: userId },
  });

  try {
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);
    let email = clerkUser.emailAddresses[0]?.emailAddress;
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          email: email || `clerk_user_${userId}@example.com`,
          isSubscribed: email === "ksahemanthraman@gmail.com",
        },
      });
      console.log(`Synced user ${userId} to database.`);
    } else if (email === "ksahemanthraman@gmail.com" && !user.isSubscribed) {
      // Auto-grant premium to database user
      user = await prisma.user.update({
        where: { id: userId },
        data: { isSubscribed: true },
      });
    }

    // Auto-promote ksahemanthraman@gmail.com to admin in Clerk publicMetadata
    if (email === "ksahemanthraman@gmail.com" && clerkUser.publicMetadata.role !== "admin") {
      await client.users.updateUser(userId, {
        publicMetadata: {
          ...clerkUser.publicMetadata,
          role: "admin",
        },
      });
      console.log(`Automatically promoted owner ${email} to admin in Clerk.`);
    }
  } catch (error) {
    console.error(`Error syncing user ${userId} to database:`, error);
  }

  return user;
}
