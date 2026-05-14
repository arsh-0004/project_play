'use client'

import { useRouter } from "next/navigation";


import { SingleVenueResponseType } from "@/app/admin/types/admin.venues.types"
import { useParams } from "next/navigation"
import {  useEffect, useState } from "react"
import dynamic from "next/dynamic"
import AddCourt from "@/app/components/AddCourt"
import AddEmployee from "./AddEmp"
import Facilities from "./Facilities"
import EditCourt from "./editCourt"
import Timing from "./timing";



const Select = dynamic(() => import("react-select"), {
    ssr: false
})





export default function venueUI() {
    const router = useRouter();

    const param = useParams()
    const id = param.id as string

    const [venueData, setVenueData] = useState<SingleVenueResponseType | null>(null)
    // for court modal
    const [open, setOpen] = useState(false)
    const [editCourtOpen, seteditCourtOPen] = useState(false)

    // for addEmp modal
    const [open2, setOpen2] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        status: "",
        gameAvailable: [] as string[]

    })


    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/view_Pvenue/${id}`)
            .then((res) => res.json()).
            then((data) => {
                const v = data.data
                setVenueData(v)
                setFormData({
                    name: v.name || "",
                    address: v.address || "",
                    city: v.city || "",
                    state: v.state || "",
                    status: v.status || "",
                    gameAvailable: v.gameAvailable || []



                })
            })




    }, [id])

    const handleSave = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/update_Pvenue/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json " },
                body: JSON.stringify(formData)

            }
            )
            const data = await res.json()
            console.log("Updated:", data)

            alert("Venue Updated ✅")
        } catch (err) {
            console.error(err)
            alert("Error updating venue")
        }
    }


    const removeEmp = async (empid: any) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/removeEmp/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json " },
                body: JSON.stringify({ employeAssociated: empid })

            }
            )
            const data = await res.json()
            console.log("Updated:", data)

            alert("Employee Removed ✅")

        } catch (err) {
            console.error(err)
            alert("Error removein Employee")
        }
    }



    return (
        <>
            <div className="w-full min-h-screen bg-gray-100 p-3 sm:p-6">

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">


                    {/* LEFT PANEL */}
                    <div className="lg:col-span-4 bg-white rounded-3xl shadow p-4">
                        <h2 className="text-xl font-semibold mb-4">{venueData?.name || ""}</h2>

                        {/* Image */}
                        <div className="relative">
                            <img
                                src="https://images.pexels.com/photos/35997810/pexels-photo-35997810.jpeg"
                                className="w-full h-40 sm:h-48 object-cover rounded-2xl"
                            />
                            <button className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full shadow text-sm">
                                Change Image
                            </button>
                        </div>

                        <div className="mt-4 space-y-3">

                            <input
                                // placeholder={vanue?.name}
                                className="w-full bg-gray-100 rounded-full px-4 py-2 outline-none"
                                value={formData?.name || ""}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}

                            />



                            {/* Address + City */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input
                                    placeholder="Address"
                                    className="bg-gray-100 rounded-full px-4 py-2 outline-none"
                                    value={formData?.address || ""}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}

                                />
                                <input
                                    placeholder="City"
                                    className="bg-gray-100 rounded-full px-4 py-2 outline-none"
                                    value={formData?.city || ""}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}

                                />
                            </div>



                            <div className="flex flex-wrap gap-2">


                            </div>
                            <Select
                                value={{ value: formData.state || "", label: formData?.state || "" }}
                                options={[
                                    { value: 'punjab', label: 'pujab' },
                                    { value: 'haryana', label: 'haryana' },
                                    { value: 'himachal', label: 'himachal' },
                                    { value: 'rajasthan', label: 'rajashtan' },
                                    { value: 'karnatak', label: 'karnatak' },
                                    { value: 'jammu', label: 'jammu' },
                                ]}
                                onChange={(data: any) => setFormData({ ...formData, state: data.value })}

                            />
                            <Select
                                isMulti
                                value={formData?.gameAvailable.map((g) => ({ value: g, label: g }))}
                                options={[
                                    { value: 'paddle', label: 'Paddle' },
                                    { value: 'pickleball', label: 'pickleball' }
                                ]}
                                onChange={(data: any) => setFormData({ ...formData, gameAvailable: data.map((d: any) => d.value) })}

                            />
                            <Select

                                value={{ value: formData?.status || "", label: formData?.status || "" }}
                                options={[
                                    { value: 'active', label: 'Active' },
                                    { value: 'inactive', label: 'Inactive' }
                                ]}
                                onChange={(data: any) => setFormData({ ...formData, status: data.value })}
                            />





                            <button className="w-full bg-blue-900 text-white py-3 rounded-full mt-4"
                                onClick={() => handleSave()}>
                                Save
                            </button>
                        </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* COURTS */}
                        <div className="bg-white rounded-3xl shadow p-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                                <h3 className="text-lg font-semibold">Courts</h3>
                                <button className="bg-black text-white px-4 py-2 rounded-full text-sm cursor-pointer"
                                    onClick={() => setOpen(true)}>
                                    + Add A New Court
                                </button>
                            </div>
                            {/* Modal of Add Court */}
                            <AddCourt open={open} setOpen={setOpen} venueId={`${id}`} />


                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {venueData?.courts.map((item, i) => (
                                    <div
                                        key={i}
                                        className="min-w-40 sm:min-w-50 bg-gray-100 rounded-2xl p-3"
                                    >
                                        <img
                                            src="https://images.pexels.com/photos/36293741/pexels-photo-36293741.jpeg"
                                            className="w-full h-20 object-cover rounded-lg"
                                        />

                                        <h4 className="mt-2 font-medium">Court No {item.name}</h4>

                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="w-8 h-4 bg-gray-300 rounded-full"></div>
                                            <span className="text-xs text-red-500"></span>
                                        </div>

                                        <button className="mt-2 w-full bg-black text-white py-1 rounded-full text-sm"
                                            onClick={() => seteditCourtOPen(true)}>
                                            Edit
                                        </button>
                                        <EditCourt open={editCourtOpen} setOpen={seteditCourtOPen} CourtId={item._id} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FACILITIES + EMPLOYEES */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Facilities (LEFT) */}
                            <div>

                                <div className="bg-white rounded-3xl shadow p-4">
                                    {/* <Facilities venueid={id}/> */}
                                    <Facilities venueid={id} />
                                </div>
                            </div>

                            {/* Employees (RIGHT) */}
                            <div>
                                <div className="bg-white rounded-3xl shadow p-4">
                                    <div className="flex justify-between mb-3">
                                        <h3 className="font-semibold">Employees Associated</h3>
                                        <button
                                            className="bg-black text-white px-3 py-1 rounded-full text-sm"
                                            onClick={() => setOpen2(true)}
                                        >
                                            Add Employee
                                        </button>
                                    </div>

                                    {venueData?.employeAssociated.map((item) => (
                                        <div
                                            key={item._id}
                                            className="flex justify-between items-center py-2"
                                        >
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src="https://i.pravatar.cc/40"
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <span className="text-sm">{item.name}</span>
                                            </div>

                                            <button className="text-orange-500 text-sm"
                                                onClick={() => removeEmp(item._id)}>
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        <AddEmployee
                            open={open2}
                            setOpen={setOpen2}
                            venueId={`${id}`}
                            existingEmployees={venueData?.employeAssociated || []}
                        />

                        {/* TIMINGS */}
                        <div className="bg-white rounded-3xl shadow p-4 max-h-64 overflow-y-auto">
                            {/* <h3 className="font-semibold mb-3">Timings</h3> */}

                            {/* {venueData?.timing.map((time, i) => (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-1"
                                    key={i}>
                                    <span>{time.day}</span>

                                    <input
                                        placeholder="Opening"
                                        className="bg-gray-100 rounded-full px-4 py-2 outline-none"
                                        value={time.open}
                                        readOnly
                                    />

                                    <input
                                        placeholder="Closing"
                                        className="bg-gray-100 rounded-full px-4 py-2 outline-none"
                                        value={time.close}
                                        readOnly
                                    />
                                </div>
                            )


                            )} */}
                            <Timing data={id} />
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}