"use client";
import { useState } from "react";



export default function addEmployee() {



    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
    });

    const handlechange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value

        })
    }



    const handleSave = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/add_emp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed");

            const data = await res.json();
            console.log(data);

            alert("Employee Added ✅");

            // reset form
            setFormData({
                name: "",
                phone: "",
                email: "",
                password: "",
            });

        } catch (err) {
            alert("Error ❌");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex gap-6">

            <div className="w-[35%] bg-white rounded-2xl shadow-md p-4">

                <div className="relative">
                    <img
                        src="https://images.pexels.com/photos/2618794/pexels-photo-2618794.jpeg"
                        alt="profile"
                        className="w-full h-64 object-cover rounded-xl"
                    />

                    <button className="absolute bottom-3 right-3 bg-white px-4 py-2 rounded-full shadow text-sm flex items-center gap-2 text-stone-900">
                        ✏️ Change Image
                    </button>
                </div>

                <div className="mt-4 space-y-4">

                    <div>
                        <label className="text-sm text-gray-600">Name Of Employee</label>
                        <input
                            type="text"
                            placeholder="Enter the name"
                            className="w-full mt-1 px-4 py-3 bg-gray-100 rounded-full outline-none text-stone-900"
                            name="name"
                            value={formData.name}
                            onChange={handlechange}

                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Phone</label>
                        <input
                            type="text"
                            placeholder="Phone number"
                            value={formData.phone}
                            onChange={handlechange}

                            className="w-full mt-1 px-4 py-3 bg-gray-100 rounded-full outline-none text-stone-900"
                            name="phone"

                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Status</label>
                        <select className="w-full mt-1 px-4 py-3 bg-gray-100 rounded-full outline-none text-stone-900">
                            <option>Working</option>
                            <option>On Leave</option>
                            <option>Resigned</option>

                        </select>
                    </div>

                </div>
            </div>

            <div className="w-[65%] bg-white rounded-2xl shadow-md p-6">

                <h2 className="text-lg font-semibold mb-4 text-stone-900">Credentials</h2>

                <div className="space-y-4">

                    <div>
                        <label className="text-sm text-gray-600">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handlechange}


                            //   onChange={(e)=>e.target.value}
                            className="w-full mt-1 px-4 py-3 bg-gray-100 rounded-full outline-none text-stone-950"
                        />
                    </div>

                    <div className="relative">
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handlechange}



                            className="w-full mt-1 px-4 py-3 bg-gray-100 rounded-full outline-none pr-10 text-stone-950"
                        />

                        <span className="absolute right-4 top-9.5 cursor-pointer">
                            👁️
                        </span>
                    </div>

                    <button className="w-full mt-4 bg-gray-900 text-white py-3 rounded-full hover:bg-gray-800 transition"
                        onClick={() => handleSave()}
                    >
                        Save
                    </button>

                </div>
            </div>


        </div>

    )
}


