import Link from "next/link"
import { TrendingUp } from "lucide-react"

export function InvestorFooter() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
          <span className="font-semibold">VentureWise</span>
        </div>
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} VentureWise. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="text-xs text-gray-500 hover:underline">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs text-gray-500 hover:underline">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs text-gray-500 hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
