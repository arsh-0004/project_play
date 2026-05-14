"use client"

import { useRouter } from "next/navigation"


const UserNavbar = ()=>{
    const router = useRouter()

    return(
        <nav className="w-full bg-white px-4 py-3">
  <div className="mx-auto flex h-18 items-center justify-between rounded-full">
    {/* <!-- Left logo --> */}
    <a
      href="#"
      className="flex h-14 items-center rounded-full bg-[#10284A] px-5 py-3 shadow-sm"
    >
      <div className="leading-none text-white">
        <div className="text-[22px] font-extrabold tracking-[0.14em]">PROJECT</div>
        <div className="mt-0.5 text-[11px] font-medium tracking-[0.35em] text-white/90">
          PLAY
        </div>
      </div>
    </a>

    {/* <!-- Center tabs --> */}
    <div className="hidden md:flex items-center rounded-full bg-white px-2 py-2 shadow-[0_6px_30px_rgba(16,24,40,0.08)] ring-1 ring-gray-100">
      <div className="rounded-full px-6 py-3 text-[15px] font-medium text-gray-700 transition hover:bg-gray-100"
      onClick={()=>router.push("/userDashboard/Matches")}>
        Matches
      </div>
      <div className="rounded-full px-6 py-3 text-[15px] font-medium text-gray-700 transition hover:bg-gray-100"
      onClick={()=>router.push("/userDashboard/Venuetab")}>
        Venues
      </div>
      <div className="rounded-full px-6 py-3 text-[15px] font-medium text-gray-700 transition hover:bg-gray-100"
            onClick={()=>router.push("/userDashboard/Account")}>

        Account
      </div>
      
      
    </div>

    {/* <!-- Right icon --> */}
    <button
      className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_6px_30px_rgba(16,24,40,0.08)] ring-1 ring-gray-100 transition hover:bg-gray-50"
      aria-label="Notifications"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.8"
        stroke="currentColor"
        className="h-6 w-6 text-gray-800"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.857 17.082a4.5 4.5 0 0 1-5.714 0M15 10a3 3 0 1 0-6 0c0 3.5-1 5-2 6h10c-1-1-2-2.5-2-6Z"
        />
      </svg>
    </button>
  </div>
</nav>
    )
}

export default UserNavbar