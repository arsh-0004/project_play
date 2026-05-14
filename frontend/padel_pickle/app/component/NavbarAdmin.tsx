"use client"

import { useRouter, usePathname } from "next/navigation"
import { jwtDecode } from "jwt-decode"


export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const linkClass = (path: string) =>
    pathname === path
      ? "bg-black text-white px-5 my-2 rounded-full py-2"
      : "hover:text-black"
  return (

    <div className=" flex justify-around sticky top-1 z-50 bg-white pb-3 mt-3">
      <div className="flex items-center gap-2">
        <div className="text-blue-600 font-bold text-lg leading-tight">
          <span className="block"><img src="/logo.png" alt="" className="h-10 w-10 ml-2" /></span>
        </div>
      </div>


      <div className="w-[95%] bg-gray-100 rounded-full shadow-sm px-4  flex  justify-around">

        {/* Menu */}
        <div className="flex items-center gap-6 text-gray-600 text-sm font-medium">
          <button className={linkClass("/admin/Dashboard")}
            onClick={() => router.push('/admin/Dashboard')}>
            DashBoard
          </button>

          <button className={linkClass("/admin/Matches")}
            onClick={() => router.push('/admin/Matches')}>
            Matches
          </button>
          
          <button className={linkClass("/admin/users")}
            onClick={() => router.push('/admin/users')}>
            Users
          </button>
          
          <button className={linkClass("/admin/venues_test")}
            onClick={() => router.push('/admin/venues_test')}>
            Venues
          </button>
          {/* <button className="hover:text-black">
            Merchandise</button> */}
          {/* <button className="hover:text-black">Inventory</button> */}
          <button className={linkClass("/admin")}
            onClick={() => router.push("/admin")}>Employees</button>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
            🔔
          </div>
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
            👤
          </div>
        </div>

      </div>
    </div>


  )
}