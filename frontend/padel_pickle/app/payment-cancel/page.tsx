"use client"

import { useRouter } from "next/navigation"
import { XCircle } from "lucide-react"

export default function PaymentFailure() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        
        <XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-800">
          Payment Failed ❌
        </h1>

        <p className="text-gray-600 mt-2">
          Something went wrong. Please try again.
        </p>

      
      </div>
    </div>
  )
}