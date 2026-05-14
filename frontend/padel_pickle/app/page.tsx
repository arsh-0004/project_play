"use client";

import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function Home() {
  type MyToken = {
    name:string,
    _id: string,
    email: string,
    roll: string
  };

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      console.log(data.token);
      localStorage.setItem("token", data.token);
      const decoded = jwtDecode<MyToken>(data.token);
      console.log(decoded);

      if (decoded.roll === "admin") {
        router.push("/admin");
      } else {
        router.push("/userDashboard/Matches");
      }

      alert(data.message);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      
      {/* Image Section */}
      <div className="w-1/2 bg-gray-200 flex items-center justify-center">
        <img
          src="/tennis_player_image.png"
          alt="Tennis Player"
          className="w-3/4 object-contain"
        />
      </div>

      {/* Form Section */}
      <div className="w-1/2 flex flex-col justify-center px-12">

        <div className="mb-6 text-center flex justify-center">
          <img className="h-24 w-23" src="/logo.png" />
        </div>

        <h2 className="text-center text-lg font-semibold text-gray-700 mb-6">
          Welcome Back
        </h2>
        
        <form className="space-y-4" onSubmit={handleLogin}>

          <div>
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Naomi M"
              className="w-full mt-1 px-4 py-2 border border-blue-400 rounded-full outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Your Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Your Password"
              className="w-full mt-1 px-4 py-2 bg-gray-100 rounded-full outline-none"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-blue-500 text-sm">Forgot Password/</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
          >
            Log In
          </button>

        </form>

      </div>
    </div>
  );
}