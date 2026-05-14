'use client'

import {  useEffect, useState } from "react"
import { UserType } from "../types/admin.venues.types"




export default function users() {
  const [allUser, setAllUser] = useState<UserType[] | null>(null)
  const [open40, setOpen40] = useState<boolean>(false)
  const [PUser, setPUser] = useState<UserType|null>(null)

  try {
    useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/viewAllUser`)
        .then((res) => res.json())
        .then((data) => setAllUser(data.data))
    }, [])
  }
  catch (error) {
    throw error
  }

 const handle40 = async (id: string) => {
     fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/viewUser/${id}`)
    .then((res)=>res.json())
    .then((data) => setPUser(data.data))

  }



  return (

    <>
      <div className="mt-3">
        <div className="h-10 w-[60%] flex justify-between px-2 items-center">
          <div><h1 className="text-blue-800 text-2xl">Users</h1></div>
          <div><button className="bg-stone-900 text-white rounded-2xl px-5 py-1.5">Sort</button></div>

        </div>

      </div>



      <div className=" flex w-full min-h-screen bg-gray-50 p-4">

        <div className={`${open40 ? 'w-[70%]' : 'w-full'} bg-gray-100 rounded-xl p-6 shadow`}>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Users</h2>

            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded-full bg-gray-200 outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-5 text-gray-500 text-sm border-b pb-2">
            <span>Name</span>
            <span>Level</span>
            <span>Email</span>
            <span>Phone Number</span>
            <span className="text-center">Action</span>
          </div>

          {allUser?.map((user) =>
            <div className="grid grid-cols-5 items-center py-3 border-b"
              key={user._id}>
              <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/40?img=1" className="w-8 h-8 rounded-full" />
                <span>{user?.name}</span>
              </div>
              <span>5000</span>
              <span>{user?.email}</span>
              <span>+91{user?.phone}</span>
              <div className="text-center text-orange-500 cursor-pointer"
                onClick={() => {
                  setOpen40(true)
                  handle40(user._id)
                }}
              
                >👁</div>
            </div>
          )}






        </div>


        {open40 && <div className="bg-gray-100 flex items-center justify-center min-h-screen">

          <div className="w-100 bg-white rounded-3xl shadow-lg overflow-hidden">

            {/* Top Section */}
            <div className="bg-blue-600 h-44 relative px-6 pt-6 text-white">

              <div className="flex items-center gap-4">
                <img
                  src="https://i.pravatar.cc/100"
                  className="w-16 h-16 rounded-full border-2 border-white object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">{PUser?.name}</h2>
                  {/* <h2 className="text-xl font-semibold">Anderson</h2> */}
                </div>
              </div>

              <div className="absolute right-6 top-6 bg-blue-800 px-4 py-1 rounded-full text-sm">
                ₹2000
              </div>

              <div className="absolute bottom-0 left-0 w-full">
                <svg viewBox="0 0 500 80" className="w-full">
                  <path fill="#ffffff" d="M0,40 C150,100 350,0 500,40 L500,80 L0,80 Z"></path>
                </svg>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-6 pt-6 pb-10 text-gray-700 flex">

              {/* LEFT CONTENT */}
              <div className="flex-1">

                <h3 className="font-semibold mb-3">Personal Details</h3>

                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400"> Number</span>
                    <span className="font-medium">+91 {PUser?.phone}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Email Address</span>
                    <span className="font-medium">{PUser?.email}</span>
                  </div>
                </div>

                <h3 className="font-semibold mt-6 mb-3">Statistics</h3>

                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Loyalty Points</span>
                    <span className="font-medium">5800</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Level</span>
                    <span className="font-medium">65456</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Month Level</span>
                    <span>-1</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Level This Month</span>
                    <span>-1</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Level 6 Months Ago</span>
                    <span>-1</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Level 12 Months Ago</span>
                    <span>-1</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Improvement</span>
                    <span>-0.01</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Confidence</span>
                    <span className="font-medium">27%</span>
                  </div>
                </div>

              </div>

              {/* RIGHT IMAGE */}
              <div className="w-40 flex items-end justify-end">
                <img
                  src="/tennis_player_image.png"
                  className="w-full opacity-90"
                />
              </div>

            </div>

          </div>

        </div>}
      </div>






    </>
  )
}
