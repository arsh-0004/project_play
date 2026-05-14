"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import AddVenue from "./AddVenue/page"
export default function venues() {
  const [allvenues, setAllVenues] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/view_venues`)
          .then((res) => res.json())
          .then((data) => setAllVenues(data));

      } catch (error) {
        console.log("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, []);


  return (
    <>
      <div className="w-full min-h-screen bg-white p-6"
      >

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">All Venues</h2>

          <button className="bg-stone-900 text-white px-5 py-2 rounded-full shadow"
          onClick={()=>router.push("/admin/venues_test/AddVenue")}
          >
            Add A New Venue
          </button>
        </div>

        <div className="flex gap-6 flex-wrap ">

          {allvenues.map((venue: any) => (
            <div
              key={venue._id}
              className="min-w-62.5 bg-white rounded-2xl shadow-md overflow-hidden"
              onClick={() => router.push(`/admin/venues_test/venues_testUI/${venue._id}`)}
            >
              <img
                src="https://images.pexels.com/photos/36293741/pexels-photo-36293741.jpeg"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{venue.name}</h3>
                <p className="text-sm text-gray-500">{venue.city}</p>
              </div>
            </div>
          ))}




        </div>
      </div>
    </>
  )
}