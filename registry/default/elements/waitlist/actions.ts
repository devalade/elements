"use server";

import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({ 
  secretKey: process.env.CLERK_SECRET_KEY! 
});

type WaitlistState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export async function addToWaitlist(
  prevState: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const email = formData.get("email") as string;
  
  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid email address" };
  }

  try {
    await clerkClient.waitlistEntries.create({
      emailAddress: email,
      notify: true
    });

    return { success: true, message: "You're on the list." };
  } catch (error: any) {
    console.error("Failed to add to waitlist:", error);
    
    if (error.errors?.[0]?.code === "form_identifier_exists") {
      return { error: "You're already on the waitlist!" };
    }
    
    if (error.errors?.[0]?.code === "form_invalid_email_address") {
      return { error: "Please enter a valid email address" };
    }
    
    return { error: "Failed to join waitlist. Please try again." };
  }
}