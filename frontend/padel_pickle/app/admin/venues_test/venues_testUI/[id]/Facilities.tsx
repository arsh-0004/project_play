"use client"

import { log } from "console"
import { useEffect, useState } from "react"


export default function Facilities(venueid:any) {
const myid = venueid.venueid
 const[venue,setVenueData] = useState<any>([null])
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])

   const allFacilities = [
    "parking",
    "washroom",
    "cafe",
    "wifi",
    "locker",
    "ac"
  ]

  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/view_Pvenue/${myid}`)
    .then((res)=>res.json())
    .then((data)=>{setVenueData(data.data)
      setSelectedFacilities(data.data.facilities)

      // console.log(data.data.facilites,"setdata facilites")
    }
          )
  },[venueid])

  const handleToggle = (facility: string) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(prev => prev.filter(f => f !== facility))
    } else {
      setSelectedFacilities(prev => [...prev, facility])
    }
  }

  const handleSave = async()=>{
    try {
      console.log("ldkjdskljfdkjd",selectedFacilities)
            console.log('my id is ',myid);
            console.log("the select facilites from state",selectedFacilities);
            
            
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/editFacilities/${myid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({facilities:selectedFacilities})

            }
            )
            const data = await res.json()
            console.log("Updated:", data)

            alert("facilities Updated ✅")
        } catch (err) {
            console.error(err)
            alert("Error facilites error")
        }
    }

  





  return (
    <>
    {/* <h1>the venu id is {venueid}</h1> */}
      <div className="max-w-md mx-auto bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Select Facilities
        </h2>

        <div className="space-y-3">

            {allFacilities.map((fac, i) => (
          <div key={i}>
            <label className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm cursor-pointer">
              <span className="text-gray-700">{fac}</span>

              <input
                type="checkbox"
                className="hidden peer"
                checked={selectedFacilities.includes(fac)}
                onChange={() => handleToggle(fac)}
              />

              <div className="w-4 h-4 rounded-full bg-gray-300 peer-checked:bg-orange-500"></div>
            </label>
          </div>
        ))}

          

        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-0.5 items-center"
        onClick={()=>handleSave()}>
  Save
</button>
      </div>
    </>
  )
}