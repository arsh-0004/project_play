'use client'
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useState } from "react"



const Select = dynamic(() => import("react-select"), {
    ssr: false
})

type OnlyVenuedata = {
    name: string,
    description: string,
    address: string,
    city: string,
    state: string,
    gameAvailable: string[],
    status: string

}

export default function AddVenue() {
    const router = useRouter()

    const [venueData, setVenueData] = useState<OnlyVenuedata>({
        name: "",
        description: "",
        address: "",
        city: "",
        state: "",
        gameAvailable: [],
        status: ""
    })

    const handleVenuSave = async () => {
        try {

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/create_venues`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(venueData)

            });

            const data = await res.json();
            console.log("Created:", data);

            alert("venue Created ✅ Open it and Add details");
            router.push('/admin/venues_test')

        } catch (err) {
            console.error(err);
            alert("Error Creating venue");
        }
    }
    const stateOptions = [
        { value: 'punjab', label: 'Punjab' },
        { value: 'haryana', label: 'Haryana' },
        { value: 'himachal', label: 'Himachal' },
        { value: 'rajasthan', label: 'Rajasthan' },
        { value: 'karnatak', label: 'Karnatak' },
        { value: 'jammu', label: 'Jammu' },
    ];

    const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
    ];


    return (
        <div className="w-full min-h-screen bg-gray-100 p-3 sm:p-6 flex items-center justify-center">
            <div className="w-full flex justify-center">
                <div className="w-full max-w-2xl bg-white rounded-3xl shadow p-4 mt-2">                    <h2 className="text-xl font-semibold mb-4">Add Venue</h2>

                    {/* Image */}
                    <div className="relative">
                        <img
                            src="https://images.pexels.com/photos/36293741/pexels-photo-36293741.jpeg"
                            className="w-full h-40 sm:h-48 object-cover rounded-2xl"
                        />
                        <button className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full shadow text-sm">
                            Change Image
                        </button>
                    </div>

                    <div className="mt-4 space-y-3">

                        <input
                            placeholder="Name of Venue"
                            className="w-full bg-gray-100 rounded-full px-4 py-2 outline-none"
                            value={venueData?.name || ""}
                            onChange={(e) => setVenueData({ ...venueData, name: e.target.value })}
                        />
                        <input
                            placeholder="Description of Venue"
                            className="w-full bg-gray-100 rounded-full px-4 py-2 outline-none"
                            value={venueData?.description || ""}
                            onChange={(e) => setVenueData({ ...venueData, description: e.target.value })}
                        />

                        {/* Address + City */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                                placeholder="Address"
                                className="bg-gray-100 rounded-full px-4 py-2 outline-none"
                                value={venueData.address || ""}
                                onChange={(e) => setVenueData({ ...venueData, address: e.target.value })}
                            />
                            <input
                                placeholder="City"
                                className="bg-gray-100 rounded-full px-4 py-2 outline-none"
                                value={venueData.city || ""}
                                onChange={(e) => setVenueData({ ...venueData, city: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-wrap gap-2"></div>


                        <Select
                            placeholder="Select State"
                            options={stateOptions}
                            value={
                                venueData.state
                                    ? stateOptions.find(opt => opt.value === venueData.state)
                                    : null
                            }
                            onChange={(data: any) =>
                                setVenueData({ ...venueData, state: data?.value || "" })
                            }
                        />

                        <Select
                            isMulti
                            placeholder="Select Game"

                            value={venueData.gameAvailable.map((g) => ({ value: g, label: g }))}
                            options={[
                                { value: 'paddle', label: 'Paddle' },
                                { value: 'pickleball', label: 'pickleball' }
                            ]}
                            onChange={(data: any) => setVenueData({ ...venueData, gameAvailable: data.map((d: any) => d.value) })}
                        />

                        <Select
                            placeholder="Select Status"
                            options={statusOptions}
                            value={
                                venueData.status
                                    ? statusOptions.find(opt => opt.value === venueData.status)
                                    : null
                            }
                            onChange={(data: any) =>
                                setVenueData({ ...venueData, status: data?.value || "" })
                            }
                        />

                        <button
                            className="w-full bg-blue-900 text-white py-3 rounded-full mt-4"
                            onClick={handleVenuSave}
                        >
                            Save
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}