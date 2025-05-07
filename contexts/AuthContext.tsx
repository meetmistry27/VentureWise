"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authAPI } from "@/lib/api"

interface User {
  id: string
  name: string
  email: string
  role: "investor" | "startup" | "admin"
  tokenBalance: number
  totalInvested: number
  [key: string]: any
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          setLoading(false)
          return
        }

        const response = await authAPI.getProfile()
        setUser(response.data)
      } catch (err) {
        console.error("Auth check failed:", err)
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await authAPI.login({ email, password })
      setUser(response.data)
    } catch (err: any) {
      setError(err.message || "Login failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData: any) => {
    setLoading(true)
    setError(null)

    try {
      const response = await authAPI.register(userData)
      setUser(response.data)
    } catch (err: any) {
      setError(err.message || "Registration failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)

    try {
      await authAPI.logout()
      setUser(null)
    } catch (err: any) {
      setError(err.message || "Logout failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
