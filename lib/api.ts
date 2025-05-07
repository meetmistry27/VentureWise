// API utility functions for making requests to the backend

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Generic fetch function with authentication
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  // Get token from localStorage if available
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include", // For cookies
  })

  // Handle unauthorized errors
  if (response.status === 401) {
    // Clear token and redirect to login
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    throw new Error("Unauthorized")
  }

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong")
  }

  return data
}

// Auth API
export const authAPI = {
  register: async (userData: any) => {
    const data = await fetchWithAuth("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })

    if (data.token) {
      localStorage.setItem("token", data.token)
    }

    return data
  },

  login: async (credentials: any) => {
    const data = await fetchWithAuth("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })

    if (data.token) {
      localStorage.setItem("token", data.token)
    }

    return data
  },

  logout: async () => {
    await fetchWithAuth("/auth/logout")
    localStorage.removeItem("token")
  },

  getProfile: async () => {
    return await fetchWithAuth("/auth/me")
  },
}

// Startup API
export const startupAPI = {
  getStartups: async (params = {}) => {
    const queryString = new URLSearchParams(params as any).toString()
    return await fetchWithAuth(`/startups?${queryString}`)
  },

  getStartup: async (id: string) => {
    return await fetchWithAuth(`/startups/${id}`)
  },

  getFeaturedStartup: async () => {
    return await fetchWithAuth("/startups/featured")
  },

  getStartupsByRiskLevel: async (riskLevel: string) => {
    return await fetchWithAuth(`/startups/risk/${riskLevel}`)
  },

  getStartupsByIndustry: async (industry: string) => {
    return await fetchWithAuth(`/startups/industry/${industry}`)
  },

  createStartup: async (startupData: any) => {
    return await fetchWithAuth("/startups", {
      method: "POST",
      body: JSON.stringify(startupData),
    })
  },

  updateStartup: async (id: string, startupData: any) => {
    return await fetchWithAuth(`/startups/${id}`, {
      method: "PUT",
      body: JSON.stringify(startupData),
    })
  },
}

// Investment API
export const investmentAPI = {
  getInvestments: async () => {
    return await fetchWithAuth("/investments")
  },

  getInvestment: async (id: string) => {
    return await fetchWithAuth(`/investments/${id}`)
  },

  getUserInvestments: async () => {
    return await fetchWithAuth("/investments/user")
  },

  createInvestment: async (investmentData: any) => {
    return await fetchWithAuth("/investments", {
      method: "POST",
      body: JSON.stringify(investmentData),
    })
  },

  simulateBlockchainTransaction: async (id: string) => {
    return await fetchWithAuth(`/investments/${id}/simulate-blockchain`, {
      method: "POST",
    })
  },
}

// Token API
export const tokenAPI = {
  getBalance: async () => {
    return await fetchWithAuth("/tokens/balance")
  },

  getTransactions: async () => {
    return await fetchWithAuth("/tokens/transactions")
  },

  getBenefits: async () => {
    return await fetchWithAuth("/tokens/benefits")
  },

  redeemTokens: async (redemptionData: any) => {
    return await fetchWithAuth("/tokens/redeem", {
      method: "POST",
      body: JSON.stringify(redemptionData),
    })
  },
}

// User API
export const userAPI = {
  getPortfolio: async () => {
    return await fetchWithAuth("/users/portfolio")
  },

  updateProfile: async (userData: any) => {
    return await fetchWithAuth(`/users/${userData.id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  },

  connectWallet: async (walletAddress: string) => {
    return await fetchWithAuth("/users/connect-wallet", {
      method: "POST",
      body: JSON.stringify({ walletAddress }),
    })
  },
}

// Analytics API
export const analyticsAPI = {
  getMarketTrends: async () => {
    return await fetchWithAuth("/analytics/market-trends")
  },

  getInvestorAnalytics: async () => {
    return await fetchWithAuth("/analytics/investor")
  },
}
