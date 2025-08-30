import { ClerkProvider } from "@clerk/nextjs";
import { ClerkSignUpElement } from "@/components/elements/clerk/sign-up";

export default function SignUpTestPage() {
  return (
    <ClerkProvider>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Sign Up Test</h1>
            <p className="text-muted-foreground">
              Test your sign-up element with Clerk integration
            </p>
          </div>

          <ClerkSignUpElement />

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
