"use client"

import Link from "next/link"
import { Bell, ChevronDown, Menu, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"

import { useRouter } from "next/navigation"

export function StartupHeader() {
const router = useRouter()

const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem("userId")
      window.localStorage.removeItem("token")
      window.localStorage.removeItem("role")
      window.localStorage.removeItem("name")
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href = "/startup/dashboard">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-emerald-600" />
          <span className="text-xl font-bold">VentureWise</span>
        </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/startup/dashboard" className="text-sm font-medium text-emerald-600">
            Dashboard
          </Link>
          <Link href="/profile" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Profile
          </Link>
          <Link href="/startup/about" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            How It Works
          </Link>
          {/* <Link href="/startup/create" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Create Startup
          </Link> */}
          {/* <Link href="/startup/investors" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Investors
          </Link>
          <Link href="/startup/updates" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Updates
          </Link>
          <Link href="/startup/settings" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Settings
          </Link> */}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {/* <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-emerald-600">
                2
              </Badge>
            </Button> */}

<div className="flex items-center gap-4">
  {/* <Link href="/profile">
    <Button variant="outline" className="text-sm font-medium">
      Profile
    </Button>
  </Link> */} 
  <Button variant="destructive" onClick={handleLogout} className="bg-emerald-600 hover:bg-emerald-700">
    Logout
  </Button>
</div>

            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>{user?.name?.substring(0, 2) || "ST"}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{localStorage.getItem("name") || "Startup User"}</span>
                  {/* <span className="text-sm font-medium">{user?.name || "Startup User"}</span> */}
                  {/* <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/profile" className="flex w-full">
                    Profile
                  </Link>
                </DropdownMenuItem> */}
                {/* <DropdownMenuItem>
                  <Link href="/startup/dashboard" className="flex w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/startup/settings" className="flex w-full">
                    Settings
                  </Link> */}
                {/* </DropdownMenuItem> */}
                {/* <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            {/* <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/startup/create">Create Startup</Link>
            </Button> */}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-6">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>{user?.name?.substring(0, 2) || "ST"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user?.name || "Startup User"}</div>
                    <div className="text-xs text-gray-500">{user?.email || "startup@example.com"}</div>
                  </div>
                </div>

                <nav className="flex flex-col gap-4">
                  <Link href="/startup/dashboard" className="text-sm font-medium text-emerald-600">
                    Dashboard
                  </Link>
                  <Link href="/profile" className="text-sm font-medium text-emerald-600">
                    Profile
                  </Link>
                  {/* <Link href="/startup/create" className="text-sm font-medium">
                    Create Startup
                  </Link> */}
                  {/* <Link href="/startup/investors" className="text-sm font-medium">
                    Investors
                  </Link>
                  <Link href="/startup/updates" className="text-sm font-medium">
                    Updates
                  </Link>
                  <Link href="/startup/settings" className="text-sm font-medium">
                    Settings
                  </Link> */}
                </nav>

                <div className="flex flex-col gap-2">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Create Startup</Button>
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
