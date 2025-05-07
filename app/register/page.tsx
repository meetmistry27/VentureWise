"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "investor",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value:string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    // Validate passwords match
    if (formData.get('password') !== formData.get('confirmPassword')) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // try {
    //   // Remove confirmPassword before sending to API
    //   const { confirmPassword, ...registerData } = formData
    //   await register(registerData)

    //   toast({
    //     title: "Registration successful",
    //     description: "Welcome to VentureWise!",
    //   })

    //   // Redirect based on role
    //   if (formData.role === "investor") {
    //     router.push("/investor")
    //   } else {
    //     router.push("/startup/dashboard")
    //   }
    // } catch (error) {
    //     let errorMessage = "Please check your information and try again."
    //       if (error instanceof Error) {
    //         errorMessage = error.message
    //       }
    //   toast({
    //     title: "Registration failed",
    //     description: errorMessage || "Please check your information and try again.",
    //     variant: "destructive",
    //   })
    // } finally {
    //   setIsLoading(false)
    // }

    //get user details
    const email = formData.get('email')
    const password = formData.get('password')
    const role = formData.get('role')
    const name = formData.get('name') 

    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    })
 
    if (response.ok) {
      router.push('/profile')
    } else {
      // Handle errors
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-8 flex items-center gap-2">
        <TrendingUp className="h-8 w-8 text-emerald-600" />
        <span className="text-2xl font-bold">VentureWise</span>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Sign up to start investing or raise funds for your startup</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>I am a</Label>
              <RadioGroup value={formData.role} onValueChange={handleRoleChange} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="investor" id="investor" />
                  <Label htmlFor="investor">Investor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="startup" id="startup" />
                  <Label htmlFor="startup">Startup</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-emerald-600 hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>

      <div className="mt-8 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} VentureWise. All rights reserved.</p>
        <p className="mt-1">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-emerald-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-emerald-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
