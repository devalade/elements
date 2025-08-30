# Clerk Authentication Components

Ultra-fast, production-ready authentication components using Clerk's official SDK.

## Components

### 🔐 ClerkSignIn
Complete sign-in form with email/password authentication, password visibility toggle, and forgot password functionality.

**Features:**
- Real-time form validation
- Loading states and error handling
- Password visibility toggle
- Forgot password integration
- Auto-complete attributes
- TypeScript support

### 📝 ClerkSignUp
Multi-step sign-up flow with email verification.

**Features:**
- Two-step registration process
- Email verification with code input
- Password strength validation
- Auto-complete attributes
- Resend verification code
- Complete Clerk integration

### 📧 WaitlistElement
Animated waitlist signup component with Clerk waitlist API integration.

**Features:**
- Server Actions integration
- Smooth animations with Framer Motion
- Success/error state handling
- Email validation
- Responsive design

## Installation

```bash
# Install Clerk (if not already installed)
npm install @clerk/nextjs

# Copy the components to your project
# Each component is self-contained and ready to use
```

## Setup

1. **Configure Clerk in your Next.js app:**

```tsx
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

2. **Add environment variables:**

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

## Usage

### Sign In Component
```tsx
import { ClerkSignIn } from "@registry/default/elements/clerk/sign-in"

export default function SignInPage() {
  return <ClerkSignIn />
}
```

### Sign Up Component
```tsx
import { ClerkSignUp } from "@registry/default/elements/clerk/sign-up"

export default function SignUpPage() {
  return <ClerkSignUp />
}
```

### Waitlist Component
```tsx
import { WaitlistElement } from "@registry/default/elements/waitlist/waitlist"

export default function WaitlistPage() {
  return <WaitlistElement />
}
```

## Customization

All components use your existing design system through:
- `@/components/ui/button`
- `@/components/ui/input` 
- `@/components/ui/label`
- `@/components/ui/alert`

Simply modify these base components to match your design.

## API Integration

### ClerkSignIn & ClerkSignUp
- Uses official `@clerk/nextjs` hooks
- Real-time API integration
- Production-ready error handling
- Automatic session management

### WaitlistElement  
- Server Actions for secure backend processing
- Clerk Waitlist API integration
- Real-time validation and feedback

## Dependencies

```json
{
  "@clerk/nextjs": "^latest",
  "motion": "^latest",
  "lucide-react": "^latest"
}
```

## Support

These components are production-ready and have been tested in real applications. They follow Clerk's best practices and include comprehensive error handling.