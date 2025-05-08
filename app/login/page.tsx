// // "use client"

// // import { useState } from "react"
// // import Link from "next/link"
// // import { useRouter } from "next/navigation"
// // import { TrendingUp } from "lucide-react"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { useAuth } from "@/contexts/AuthContext"
// // import { useToast } from "@/components/ui/use-toast"

// // export default function LoginPage() {
// //   const [email, setEmail] = useState("")
// //   const [password, setPassword] = useState("")
// //   const [isLoading, setIsLoading] = useState(false)
// //   const { login } = useAuth()
// //   const { toast } = useToast()
// //   const router = useRouter()

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     setIsLoading(true)

// //     try {
// //       await login(email, password)
// //       toast({
// //         title: "Login successful",
// //         description: "Welcome back to VentureWise!",
// //       })
// //       router.push("/investor")
// //     } catch (error) {
// //       toast({
// //         title: "Login failed",
// //         description: error.message || "Please check your credentials and try again.",
// //         variant: "destructive",
// //       })
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   return (
// //     <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
// //       <div className="mb-8 flex items-center gap-2">
// //         <TrendingUp className="h-8 w-8 text-emerald-600" />
// //         <span className="text-2xl font-bold">VentureWise</span>
// //       </div>

// //       <Card className="w-full max-w-md">
// //         <CardHeader>
// //           <CardTitle>Login</CardTitle>
// //           <CardDescription>Enter your credentials to access your account</CardDescription>
// //         </CardHeader>
// //         <form onSubmit={handleSubmit}>
// //           <CardContent className="space-y-4">
// //             <div className="space-y-2">
// //               <Label htmlFor="email">Email</Label>
// //               <Input
// //                 id="email"
// //                 type="email"
// //                 placeholder="you@example.com"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 required
// //               />
// //             </div>
// //             <div className="space-y-2">
// //               <div className="flex items-center justify-between">
// //                 <Label htmlFor="password">Password</Label>
// //                 <Link href="/forgot-password" className="text-xs text-emerald-600 hover:underline">
// //                   Forgot password?
// //                 </Link>
// //               </div>
// //               <Input
// //                 id="password"
// //                 type="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //               />
// //             </div>
// //           </CardContent>
// //           <CardFooter className="flex flex-col space-y-4">
// //             <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
// //               {isLoading ? "Logging in..." : "Login"}
// //             </Button>
// //             <div className="text-center text-sm">
// //               Don't have an account?{" "}
// //               <Link href="/register" className="text-emerald-600 hover:underline">
// //                 Register
// //               </Link>
// //             </div>
// //           </CardFooter>
// //         </form>
// //       </Card>

// //       <div className="mt-8 text-center text-xs text-gray-500">
// //         <p>© {new Date().getFullYear()} VentureWise. All rights reserved.</p>
// //       </div>
// //     </div>
// //   )
// // }




// 'use client'

// import { useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { TrendingUp } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { useToast } from "@/components/ui/use-toast"
// import { ethers } from "ethers"

// export default function LoginPage() {
//   const [message, setMessage] = useState<string>("")
//   const [isLoading, setIsLoading] = useState(false)
//   const { toast } = useToast()
//   const router = useRouter()

//   const getNonce = async (): Promise<string> => {
//     const response = await fetch("http://localhost:3000/api/nonce", {
//       method:"GET"
//     })
//     const data = await response.json()
//     console.log("In getnonce: ",data);
    
//     return data.nonce
//   }

//   const signMessage = async () => {
//     setIsLoading(true)
//     try {
//       const token = window.localStorage.getItem("token")
//       console.log("Stored token:", token)

//       if (token) {
//         const response = await fetch("/api/verify", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         })

//         const newResponse = await response.json()
//         console.log(newResponse)

//         if (newResponse === "ok") {
//           toast({
//             title: "Login successful",
//             description: "Welcome back to VentureWise!",
//           })
//           router.push("/success")
//         } else {
//           window.localStorage.removeItem("token")
//           setMessage("Token expired, log in again to get a new token.")
//         }
//       } else {
//         const nonce = await getNonce()
//         console.log(nonce);
//         console.log(window);
        

//         if (!window.ethereum) {
//           throw new Error("MetaMask is not installed")
//         }
//         console.log("Before provider");
        
//         const provider = new ethers.BrowserProvider(window.ethereum); 
//         console.log("provider: ",provider);
        
//         const signer = await provider.getSigner()
//         const address = await signer.getAddress()
//         console.log("After address");
        

//         const msgToSign = `I am signing this message to prove my identity. Nonce: ${nonce}`
//         const signedMessage = await signer.signMessage(msgToSign)

//         const data = { signedMessage, message: msgToSign, address }

//         const loginResponse = await fetch("/api/login", {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         })

//         const tokenResponse = await loginResponse.json()
//         window.localStorage.setItem("token", tokenResponse.token)
//         console.log("tokenresponse: ", tokenResponse.token);
        

//         // Verify token
//         console.log("above verify");
//         const verifyResponse = await fetch("/api/verify", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${tokenResponse.token}`,
//           },
//         })

//         const verifyResult = await verifyResponse.json()
//         console.log(verifyResult.status)

//         if (verifyResult.status === "ok") {
//           toast({
//             title: "Login successful",
//             description: "Welcome back to VentureWise!",
//           })
//           router.push("/")
//         } else {
//           setMessage("Invalid token!")
//         }
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         toast({
//           title: "Error",
//           description: error.message || "MetaMask sign-in failed. Please try again.",
//           variant: "destructive",
//         })
//       } else {
//         toast({
//           title: "Error",
//           description: "An unexpected error occurred. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
//       <div className="mb-8 flex items-center gap-2">
//         <TrendingUp className="h-8 w-8 text-emerald-600" />
//         <span className="text-2xl font-bold">VentureWise</span>
//       </div>

//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>Login</CardTitle>
//           <CardDescription>Sign in securely using MetaMask</CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           <p className="text-center text-sm text-gray-600">
//             Click the button below to sign in with MetaMask. Make sure you have MetaMask installed and connected.
//           </p>
//           {message && <p className="text-center text-sm text-red-600">{message}</p>}
//         </CardContent>

//         <CardFooter className="flex flex-col space-y-4">
//           <Button
//             onClick={signMessage}
//             className="w-full bg-emerald-600 hover:bg-emerald-700"
//             disabled={isLoading}
//           >
//             {isLoading ? "Signing in..." : "Sign in with MetaMask"}
//           </Button>
//           <div className="text-center text-sm">
//             Don&apos;t have MetaMask?{" "}
//             <a
//               href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-emerald-600 hover:underline"
//             >
//               Install here
//             </a>
//           </div>
//           <div className="text-center text-sm">
//             Don&apos;t have an account?{" "}
//             <a
//               href="http://localhost:3000/register"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-emerald-600 hover:underline"
//             >
//               Register here
//             </a>
//           </div>
//         </CardFooter>
//       </Card>

//       <div className="mt-8 text-center text-xs text-gray-500">
//         <p>© {new Date().getFullYear()} VentureWise. All rights reserved.</p>
//       </div>
//     </div>
//   )
// }

//new login 

'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { ethers } from "ethers"


export default function LoginPage() {
  const [message, setMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>("")
  
  // Registration form state
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [role, setRole] = useState<string>("investor")
  
  const { toast } = useToast()
  const router = useRouter()

  const getNonce = async (): Promise<string> => {
    const response = await fetch("/api/nonce", {
      method: "GET"
    })
    const data = await response.json()
    return data.nonce
  }

  const signMessage = async () => {
    setIsLoading(true)
    try {
      const token = window.localStorage.getItem("token")

      if (token) {
        const response = await fetch("/api/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        const result = await response.json()

        if (result.status === "ok") {
          toast({
            title: "Login successful",
            description: "Welcome back to VentureWise!",
          })
          router.push("/startup/dashboard")
          return
        } else {
          window.localStorage.removeItem("token")
          setMessage("Token expired, log in again to get a new token.")
        }
      }

      const nonce = await getNonce()

      if (!window.ethereum) {
        throw new Error("MetaMask is not installed")
      }
      
      //const provider = new ethers.providers.Web3Provider(window.ethereum);
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const address = await signer.getAddress()

      const msgToSign = `I am signing this message to prove my identity. Nonce: ${nonce}`
      const signedMessage = await signer.signMessage(msgToSign)

      const data = { signedMessage, message: msgToSign, address }

      const loginResponse = await fetch("/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const loginResult = await loginResponse.json()
      console.log(loginResult);
      // If registration is required, show registration form
      if (loginResult.status === "registration_required") {
        setWalletAddress(loginResult.address)
        setShowRegistration(true)
        setIsLoading(false)
        return
      }

      // If login was successful, store token and redirect
      if (loginResult.token) {
        window.localStorage.setItem("token", loginResult.token)
        window.localStorage.setItem("userId", loginResult.user.userId)
        window.localStorage.setItem("role", loginResult.user.role)
        window.localStorage.setItem("name", loginResult.user.username)
        toast({
          title: "Login successful",
          description: "Welcome back to VentureWise!",
        })
        
        const role2 = localStorage.getItem("role")
        if(role2 == "investor")
        {
          router.push("/investor")
        }else{
          router.push("/startup/dashboard")
        }

      } else {
        toast({
          title: "Login failed",
          description: loginResult.error || "An unexpected error occurred",
          variant: "destructive",
        })
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message || "MetaMask sign-in failed. Please try again.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const registerResponse = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          role,
          walletAddress,
        }),
      })

      const result = await registerResponse.json()
     

      if (registerResponse.ok && result.token) {
        // Store token
        window.localStorage.setItem("token", result.token)
        window.localStorage.setItem("userId", result.user.userId)
        window.localStorage.setItem("role", result.user.role)
        window.localStorage.setItem("name", result.user.username)
        
        toast({
          title: "Registration successful",
          description: "Welcome to VentureWise!",
        })

        if(role == "startup"){
          router.push("/startup/dashboard")
          }
          else{
            router.push("/investor")
          }
        
        // router.push("/dashboard")
      } else {
        toast({
          title: "Registration failed",
          description: result.error || "Please check your information and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Registration error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-8 flex items-center gap-2">
        <TrendingUp className="h-8 w-8 text-emerald-600" />
        <span className="text-2xl font-bold">VentureWise</span>
      </div>

      {showRegistration ? (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Complete Registration</CardTitle>
            <CardDescription>Please provide the following information to complete your account</CardDescription>
          </CardHeader>
          
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="walletAddress">Wallet Address</Label>
                <Input
                  id="walletAddress"
                  value={walletAddress}
                  disabled
                  className="bg-gray-100"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Role</Label>
                <RadioGroup value={role} onValueChange={setRole} className="flex flex-col space-y-1">
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
              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Complete Registration"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowRegistration(false)}
                className="w-full"
              >
                Back to Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Sign in securely using MetaMask</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-center text-sm text-gray-600">
              Click the button below to sign in with MetaMask. Make sure you have MetaMask installed and connected.
            </p>
            {message && <p className="text-center text-sm text-red-600">{message}</p>}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              onClick={signMessage}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in with MetaMask"}
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have MetaMask?{" "}
              <a
                href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                Install here
              </a>
            </div>
          </CardFooter>
        </Card>
      )}

      <div className="mt-8 text-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} VentureWise. All rights reserved.</p>
      </div>
    </div>
  )
}