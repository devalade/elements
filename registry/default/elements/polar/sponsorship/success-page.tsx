"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CheckoutData {
  id: string;
  status: string;
  amount: number;
  currency: string;
  product_name?: string;
  customer_email?: string;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkoutId = searchParams.get("checkout_id");

  useEffect(() => {
    if (checkoutId) {
      // You can optionally fetch checkout details from Polar API here
      // For now, we'll just show a generic success message
      setCheckoutData({
        id: checkoutId,
        status: "completed",
        amount: 0,
        currency: "USD",
      });
    }
    setIsLoading(false);
  }, [checkoutId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">
            Processing your sponsorship...
          </p>
        </div>
      </div>
    );
  }

  if (!checkoutId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-destructive">
              Invalid Access
            </h1>
            <p className="text-muted-foreground">
              This page can only be accessed after a successful sponsorship
              checkout.
            </p>
          </div>
          <Button onClick={() => router.push("/sponsor")}>
            Go to Sponsorship Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-6">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full">
          <svg
            className="w-8 h-8 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-label="Success checkmark"
            role="img"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-green-600 dark:text-green-400">
            Thank You! 🎉
          </h1>
          <p className="text-xl text-muted-foreground">
            Your sponsorship means the world to us!
          </p>
          <p className="text-muted-foreground max-w-lg mx-auto">
            We've received your sponsorship and you'll get a confirmation email
            shortly. Your support helps us continue building amazing open source
            tools.
          </p>
        </div>

        {/* Checkout Details */}
        {checkoutData && (
          <div className="bg-card border rounded-lg p-6 text-left">
            <h3 className="font-semibold mb-3">Sponsorship Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Checkout ID:</span>
                <Badge variant="outline" className="font-mono text-xs">
                  {checkoutData.id}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="default" className="text-xs">
                  ✅ {checkoutData.status}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* What's Next */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">What's Next?</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              📧 Check your email for a receipt and sponsorship confirmation
            </p>
            <p>🚀 You'll be added to our sponsors page within 24 hours</p>
            <p>💬 Feel free to reach out if you have any questions</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => router.push("/")} variant="default">
            Back to Home
          </Button>
          <Button onClick={() => router.push("/sponsor")} variant="outline">
            View Sponsorship Page
          </Button>
        </div>

        {/* Contact */}
        <p className="text-xs text-muted-foreground">
          Questions? Contact us at{" "}
          <a
            href="mailto:hello@yourdomain.com"
            className="underline hover:text-foreground"
          >
            hello@yourdomain.com
          </a>
        </p>
      </div>
    </div>
  );
}
