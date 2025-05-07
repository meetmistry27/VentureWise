"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { UserProfile } from "../api/profile/profile.ts" // Keep the type import
import { Loader2, Save, MapPin, Phone, Mail, Wallet, Shield, Briefcase, Edit, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const { user, loading: authLoading, refreshUser } = useAuth()
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: "",
    email: "",
    phoneNumber: "",
    location: "",
    bio: "",
    profileImage: "", 
  })

  // Fetch user profile on mount and when user changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      // If user is already available from auth context, use that data
      if (user) {
        setFormData({
          name: user.username || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          location: user.location || "",
          bio: user.bio || "",
          profileImage: user.profileImage || "/placeholder.svg?height=200&width=200",
        })
        return
      }

      // If not, try to fetch the profile directly from API
      try {
        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("userId")
        
        if (!token || !userId) {
          router.push("/login")
          return
        }
        
        const response = await fetch("/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token} ${userId}`,
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to fetch profile")
        }

        const data = await response.json()
        
        if (!data.success || !data.data) {
          throw new Error("Failed to fetch profile data")
        }

        const profileData = data.data
        
        setFormData({
          username: profileData.username || "",
          email: profileData.email || "",
          phoneNumber: profileData.phoneNumber || "",
          location: profileData.location || "",
          bio: profileData.bio || "",
          profileImage: profileData.profileImage || "/placeholder.svg?height=200&width=200",
          role: profileData.role || "1 khokha 2",
          walletAddress : profileData.walletAddress || "joker",
        })
      } catch (error) {
        console.error("Failed to fetch profile:", error)
        // If we can't fetch the profile and there's no user, redirect to login
        if (!authLoading && !user) {
          router.push("/login")
        }
      }
    }

    fetchUserProfile()
  }, [user, authLoading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // For demo purposes, we'll use a FileReader to convert the image to a data URL
    // In a real app, you would upload this to a server/storage service
    const reader = new FileReader()
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        profileImage: reader.result as string,
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")
      
      if (!token || !userId) {
        throw new Error("Authentication required")
      }
      
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token} ${userId}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update profile")
      }

      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || "Failed to update profile")
      }

      // Refresh the user data in the auth context if available
      if (refreshUser) {
        await refreshUser()
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
        variant: "default",
      })

      setIsEditing(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground mt-1">View and manage your profile information</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "destructive" : "default"}
          className="mt-4 md:mt-0"
        >
          {isEditing ? (
            <>
              <X className="mr-2 h-4 w-4" /> Cancel Editing
            </>
          ) : (
            <>
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={formData.profileImage || "/placeholder.svg?height=200&width=200"}
                  alt={formData.username}
                />
                <AvatarFallback>{formData.username?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <div className="absolute -bottom-2 right-0">
                  <label htmlFor="profile-image-upload" className="cursor-pointer">
                    <div className="rounded-full bg-primary p-2 text-white shadow-sm hover:bg-primary/90 transition-colors">
                      <Edit className="h-4 w-4" />
                    </div>
                    <input
                      id="profile-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileImageChange}
                    />
                  </label>
                </div>
              )}
            </div>
            <CardTitle className="text-xl">{formData.username}</CardTitle>
            <Badge variant="outline" className="mt-2 capitalize">
              {user?.role}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center text-sm">
              <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{formData.email}</span>
            </div>
            {formData.phoneNumber && (
              <div className="flex items-center text-sm">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{formData.phoneNumber}</span>
              </div>
            )}
            {formData.location && (
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{formData.location}</span>
              </div>
            )}
            {/* <Separator />
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Wallet Address</p>
                <div className="flex items-center mt-1">
                  <Wallet className="mr-2 h-4 w-4 text-muted-foreground" />
                  <p className="text-sm break-all">{user?.walletAddress || "No wallet connected"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Account Status</p>
                <div className="flex items-center mt-1">
                  <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Badge variant={user?.isVerified ? "success" : "secondary"}>
                    {user?.isVerified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
              </div>
              {user?.role === "investor" && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Token Balance</p>
                  <div className="flex items-center mt-1">
                    <div className="mr-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                      T
                    </div>
                    <p className="text-sm font-medium">{user?.tokenBalance || 0} Tokens</p>
                  </div>
                </div>
              )}
            </div> */}
          </CardContent>
        </Card>

        {/* Profile Edit Form */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              {isEditing ? "Update your profile information below" : "View your profile information"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                {isEditing ? (
                  <Input
                    id="name"
                    name="name"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                ) : (
                  <p className="text-sm p-2 border rounded-md bg-muted/50">{formData.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                {isEditing ? (
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    required
                  />
                ) : (
                  <p className="text-sm p-2 border rounded-md bg-muted/50">{formData.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-sm font-medium">
                  Phone Number
                </label>
                {isEditing ? (
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber || ""}
                    onChange={handleChange}
                    placeholder="Your phone number"
                  />
                ) : (
                  <p className="text-sm p-2 border rounded-md bg-muted/50">{formData.phoneNumber || "Not provided"}</p>
                )}
              </div>

              {/* <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                {isEditing ? (
                  <Input
                    id="location"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleChange}
                    placeholder="Your location (city, country)"
                  />
                ) : (
                  <p className="text-sm p-2 border rounded-md bg-muted/50">{formData.location || "Not provided"}</p>
                )}
              </div> */}

              {/* <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium">
                  Bio
                </label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio || ""}
                    onChange={handleChange}
                    placeholder="Tell us about yourself"
                    rows={4}
                  />
                ) : (
                  <p className="text-sm p-2 border rounded-md bg-muted/50 min-h-[100px]">
                    {formData.bio || "No bio provided"}
                  </p>
                )}
              </div> */}

              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <p className="text-sm p-2 border rounded-md bg-muted/50 capitalize">
                  {formData.role || "User"} (Non-editable)
                </p>
              </div>

              {/* <div className="space-y-2">
                <label className="text-sm font-medium">Wallet Address</label>
                <p className="text-sm p-2 border rounded-md bg-muted/50 break-all">
                  {formData.walletAddress || "No wallet connected"} (Non-editable)
                </p>
                <p className="text-xs text-muted-foreground">
                  Wallet addresses can only be updated through the wallet connection process
                </p>
              </div> */}
            </CardContent>

            {isEditing && (
              <CardFooter>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            )}
          </form>
        </Card>
      </div>

      {user?.role === "investor" && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Investment Summary</CardTitle>
              <CardDescription>Overview of your investment activity</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col space-y-1.5 p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Invested</h3>
                <p className="text-2xl font-bold">${user?.totalInvested?.toLocaleString() || 0}</p>
              </div>
              <div className="flex flex-col space-y-1.5 p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Token Balance</h3>
                <p className="text-2xl font-bold">{user?.tokenBalance?.toLocaleString() || 0}</p>
              </div>
              {/* <div className="flex flex-col space-y-1.5 p-4 border rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Account Status</h3>
                <div className="flex items-center mt-2">
                  <Badge variant={user?.isVerified ? "success" : "secondary"} className="text-sm">
                    {user?.isVerified ? "Verified Investor" : "Unverified Account"}
                  </Badge>
                </div>
              </div> */}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => router.push("/investor/portfolio")}>
                <Briefcase className="mr-2 h-4 w-4" />
                View My Portfolio
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}