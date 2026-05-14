"use client"

import { SingleVenueResponseType } from "@/app/admin/types/admin.venues.types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function MatchPage() {
    const router = useRouter()

    const[venues, setVenues] = useState<SingleVenueResponseType[]|null>(null)
    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/view_venues`)
        .then((res)=>res.json())
        .then((data)=>setVenues(data))
    })


    return (

        <div className=" flex tail-container min-h-screen ">

            <div className="w-full p-6">
                {/* <!-- Header --> */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-400">All Venues</h1>

                    {/* <!-- Search Bar --> */}
                    <div className="relative w-80">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className="fas fa-search text-gray-400"></i>
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full border border-blue-500/50 focus:border-blue-500 rounded-full py-3 pl-11 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition" />
                    </div>
                </div>

                {/* <!-- Grid of Venues --> */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">

                    {venues?.map((venue)=>(
                         <div className="flex flex-col w-fit" key={venue.address} onClick={()=>router.push(`/userDashboard/Venuetab/MatchCreationInvenue/${venue._id}`)}>
                        <img
                            src="https://images.pexels.com/photos/5645997/pexels-photo-5645997.jpeg"
                            className="max-w-65 max-h-60 rounded-2xl object-cover"
                            alt=""
                        />

                        <div className="max-w-60">
                            <div className="text-stone-900 text-xl">{venue.name}</div>
                        <div className="text-stone-500">{venue.city}</div>
                        </div>
                    </div>

                    ))
                       }
                  
                  

                </div>


            </div>

</div>       

    )
}