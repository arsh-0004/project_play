"use client"

import { useParams, useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { useEffect } from "react"

export default function PaymentSuccess() {
  const router = useRouter()
   const params = useParams();
  const id = params.id as string; 


useEffect(() => {
  if (!id) return;

  const handlePaymentSuccess = async () => {
    const pendingJoin = localStorage.getItem("pendingJoin");

    if (pendingJoin) {
      const { playerId, whichPlayer } = JSON.parse(pendingJoin);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/joinMatchAfterPayment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matchId: id,
          playerId,
          whichPlayer,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.removeItem("pendingJoin");
      }

      return;
    }

    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/updateMatch/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  handlePaymentSuccess();
}, [id]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-800">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mt-2">
          Your payment has been processed successfully.
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  )
}