import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "wouter"

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Forgot your password?</h1>
          <p className="text-muted-foreground mt-2">
            Enter your email and we'll send you a link to reset your password
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          
          <Button className="w-full">Send reset link</Button>
          
          <p className="text-center text-sm text-muted-foreground">
            <Link to="/signin" className="text-primary hover:underline">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
