import { ClerkProvider } from "@clerk/nextjs";
import { WaitlistElement } from "./waitlist";

export default function WaitlistTestPage() {
  return (
    <ClerkProvider>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Waitlist Test</h1>
            <p className="text-muted-foreground">
              Test your waitlist element with Clerk integration
            </p>
          </div>
          
          <WaitlistElement />
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Make sure you have configured Clerk with waitlist enabled
            </p>
          </div>
        </div>
      </div>
    </ClerkProvider>
  );
}