"use server";

export async function addToWaitlist(formData: FormData) {
  const email = formData.get("email") as string;
  
  if (!email || !email.includes("@")) {
    return { error: "Invalid email" };
  }

  // Simple webhook call - replace with your endpoint
  try {
    if (process.env.WAITLIST_WEBHOOK_URL) {
      await fetch(process.env.WAITLIST_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          timestamp: new Date().toISOString(),
          source: "elements-landing" 
        }),
      });
    }
  } catch (e) {
    console.error("Webhook failed:", e);
  }

  return { success: true };
}