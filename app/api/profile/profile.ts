// Profile API service for interacting with the backend

// Define a TypeScript interface for User instead of importing the model
export interface UserProfile {
    id?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    location?: string;
    bio?: string;
    profileImage?: string;
    role?: string;
    walletAddress?: string;
    isVerified?: boolean;
    tokenBalance?: number;
    totalInvested?: number;
    createdAt?: string;
    updatedAt?: string;
  }
  
  const BASE_URL = "/api/profile"
  
  // Helper function to get the authorization header
  const getAuthHeader = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")
      
      if (!token || !userId) {
        throw new Error("Authentication required")
      }
      
      return `Bearer ${token} ${userId}`
    }
    return ""
  }
  
  interface ProfileResponse {
    success: boolean
    message?: string
    data?: UserProfile
  }
  
  export const profileAPI = {
    // Get the current user's profile
    getProfile: async (): Promise<UserProfile> => {
      try {
        const response = await fetch(BASE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": getAuthHeader(),
          },
        })
  
        const data: ProfileResponse = await response.json()
  
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch profile")
        }
  
        if (!data.success || !data.data) {
          throw new Error("Failed to fetch profile data")
        }
  
        return data.data
      } catch (error: any) {
        console.error("Error fetching profile:", error)
        throw error
      }
    },
  
    // Update the current user's profile
    updateProfile: async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
      try {
        const response = await fetch(BASE_URL, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": getAuthHeader(),
          },
          body: JSON.stringify(profileData),
        })
  
        const data: ProfileResponse = await response.json()
  
        if (!response.ok) {
          throw new Error(data.message || "Failed to update profile")
        }
  
        if (!data.success || !data.data) {
          throw new Error("Failed to update profile data")
        }
  
        return data.data
      } catch (error: any) {
        console.error("Error updating profile:", error)
        throw error
      }
    },
  }