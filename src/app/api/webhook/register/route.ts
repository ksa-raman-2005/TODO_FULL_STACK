import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
// 🚀 FIXED: Absolute relative path mapping ensuring compile-time engine discovery
import { prisma } from "../../../../lib/prisma"; 

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
        return new Response("Invalid WebHook Secret in ENV", { status: 500 });
    }
    
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occurred: Missing Svix headers", { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;
    
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature
        }) as WebhookEvent;
    } catch (err) {
        console.error("Webhook verification failed:", err);
        return new Response("Error occurred: Webhook verification failed", { status: 400 });
    }

    const { id } = evt.data;
    const eventType = evt.type;
    
    if (eventType === "user.created") {
        try {
            const { email_addresses, primary_email_address_id, id: userId } = evt.data;

            let primaryEmail = email_addresses?.find(
                (email) => email.id === primary_email_address_id
            );

            if (!primaryEmail && email_addresses && email_addresses.length > 0) {
                primaryEmail = email_addresses[0];
            }

            let emailString = primaryEmail?.email_address || (evt.data as any).email_address;

            if (!emailString && email_addresses?.length === 0) {
                emailString = `mock_clerk_user_${userId}@example.com`;
                console.log(`⚠️ Mock payload detected. Using fallback email: ${emailString}`);
            }

            if (!emailString) {
                return new Response("Primary Email Not Found in Payload Data Structure", { status: 400 });
            }

            // Fire off the database write utilizing our global prisma connection pool singleton
            const newUser = await prisma.user.create({
                data: {
                    id: userId!,
                    email: emailString,
                    isSubscribed: false
                }
            });

            console.log("New User Successfully Synced & Created!", newUser);

        } catch (err: any) {
            console.error("Database Write Error during user sync:", err);
            return new Response(`Database Error: ${err.message || "Error in Creating new User inside DB Pool"}`, { status: 500 });
        }
    }

    return new Response(`Webhook received! ID: ${id}, Type: ${eventType}`, { status: 200 });
}