import { ClerkProvider } from "@clerk/nextjs";
import { ClerkSignInElement } from "@/components/elements/clerk/sign-in";

export default function SignInTestPage() {
  return (
    <ClerkProvider>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Sign In Test</h1>
            <p className="text-muted-foreground">
              Test your sign-in element with Clerk integration
            </p>
          </div>

          <ClerkSignInElement />

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Make sure you have configured your Clerk API keys
            </p>
          </div>
        </div>
      </div>
    </ClerkProvider>
  );
}
