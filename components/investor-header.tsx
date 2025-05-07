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

export function InvestorHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-emerald-600" />
          <span className="text-xl font-bold">VentureWise</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/investor" className="text-sm font-medium text-emerald-600">
            Dashboard
          </Link>
          <Link href="/investor/opportunities" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Opportunities
          </Link>
          <Link href="/investor/portfolio" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Portfolio
          </Link>
          <Link href="/investor/insights" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Insights
          </Link>
          <Link href="/investor/events" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Events
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-emerald-600">
                3
              </Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>VS</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">Vikram Singh</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Investments</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="bg-emerald-600 hover:bg-emerald-700">Add Funds</Button>
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
                    <AvatarFallback>VS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Vikram Singh</div>
                    <div className="text-xs text-gray-500">vikram@example.com</div>
                  </div>
                </div>

                <nav className="flex flex-col gap-4">
                  <Link href="/investor" className="text-sm font-medium text-emerald-600">
                    Dashboard
                  </Link>
                  <Link href="/investor/opportunities" className="text-sm font-medium">
                    Opportunities
                  </Link>
                  <Link href="/investor/portfolio" className="text-sm font-medium">
                    Portfolio
                  </Link>
                  <Link href="/investor/insights" className="text-sm font-medium">
                    Insights
                  </Link>
                  <Link href="/investor/events" className="text-sm font-medium">
                    Events
                  </Link>
                </nav>

                <div className="flex flex-col gap-2">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Add Funds</Button>
                  <Button variant="outline">Logout</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
