"use server";

// Polar.sh integration for sponsorship
// Simple approach using the Polar NextJS adapter

// Optional: Advanced Polar API integration types (for reference only)
interface PolarCheckoutItem {
  type: "product";
  product_id: string;
  product_price_id?: string;
  quantity?: number;
}

interface PolarCheckoutSession {
  payment_processor: "stripe";
  success_url: string;
  items: PolarCheckoutItem[];
  customer_email?: string;
  customer_name?: string;
  custom_fields?: Record<string, unknown>;
  allow_discount_codes?: boolean;
  metadata?: Record<string, string>;
}

// Update these with your actual Polar product IDs from your dashboard
// Get these from https://polar.sh/dashboard -> Products -> [Product Name] -> Product ID
const POLAR_PRODUCT_IDS = {
  "Tip Jar": "your_tip_jar_product_id_here",
  Supporter: "your_supporter_product_id_here",
  Sponsor: "your_sponsor_product_id_here",
  Backer: "your_backer_product_id_here",
};

// Optional: Advanced server-side checkout creation (if you need more control)
export async function createPolarCheckout(
  tierName: string,
  customAmount?: number,
) {
  const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN;
  const POLAR_BASE_URL = process.env.POLAR_BASE_URL || "https://api.polar.sh";

  if (!POLAR_ACCESS_TOKEN) {
    throw new Error("Polar access token not configured");
  }

  const productId =
    POLAR_PRODUCT_IDS[tierName as keyof typeof POLAR_PRODUCT_IDS];

  if (!productId) {
    throw new Error(`Unknown tier: ${tierName}`);
  }

  const checkoutData: PolarCheckoutSession = {
    payment_processor: "stripe",
    success_url: process.env.POLAR_SUCCESS_URL || "",
    items: [
      {
        type: "product",
        product_id: productId,
        quantity: 1,
      },
    ],
    allow_discount_codes: true,
    metadata: {
      tier: tierName,
      source: "website-sponsorship",
      ...(customAmount && { custom_amount: customAmount.toString() }),
    },
  };

  try {
    const response = await fetch(`${POLAR_BASE_URL}/v1/checkouts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${POLAR_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(checkoutData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Polar API Error:", errorData);
      throw new Error(`Polar API Error: ${response.status}`);
    }

    const session = await response.json();
    return { url: session.url, sessionId: session.id };
  } catch (error) {
    console.error("Failed to create Polar checkout:", error);
    throw new Error("Failed to create checkout session");
  }
}
