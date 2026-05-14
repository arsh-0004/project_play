'use client'

import { useState, useEffect } from "react"



export default function View_and_update_emp({ id }: { id: string }) {

    const [empdata, setempdata] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
    })


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/viewEmp/${id}`);
            const data = await res.json();
            setempdata(data);
        };

        fetchData();
    }, [id]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setempdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSave = async()=>{

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/editEmp/${id}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(empdata),
            });

            if (!res.ok) throw new Error("Failed");

            const data = await res.json();
            console.log(data);

            alert("Employee Added ✅");

            // reset form
            setempdata({
                name: "",
                phone: "",
                email: "",
                password: "",
            });

            // router.push("/admin")
            

        } catch (err) {
            alert("Error ❌");
        }

    }




    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center p-6">
            <div className="w-[40%]  bg-gray-100 rounded-3xl shadow-lg p-4">

                <div className="relative">
                    <img
                        src="https://images.pexels.com/photos/2618794/pexels-photo-2618794.jpeg"
                        alt="profile"
                        className="w-full h-48 object-cover rounded-2xl"
                    />


                </div>

                {/* Form */}
                <div className="mt-6 space-y-4">

                    {/* Name */}
                    <div>
                        <label className="text-sm text-gray-600">Name Of Employee</label>
                        <input
                            type="text"
                            value={empdata?.name}
                            className="w-full mt-1 p-3 rounded-full bg-gray-200 outline-none"
                            name="name"
                            onChange={handleChange}
            />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-sm text-gray-600">Phone</label>
                        <input
                            type="text"
                            value={empdata?.phone}
                            className="w-full mt-1 p-3 rounded-full bg-gray-200 outline-none"
                            name="phone"
                            onChange={handleChange}


                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-600">Email Address</label>
                        <input
                            type="email"
                            value={empdata?.email}
                            className="w-full mt-1 p-3 rounded-full bg-gray-200 outline-none"
                            name="email"
                            onChange={handleChange}

                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            value={empdata?.password}
                            className="w-full mt-1 p-3 rounded-full bg-gray-200 outline-none text-stone-950"
                            name="password"
                            onChange={handleChange}

                        />
                    </div>



                    <button className="w-full bg-blue-900 text-white py-3 rounded-full mt-4 hover:bg-blue-800 transition"
                    onClick={()=>handleSave()}>
                        Save
                    </button>

                </div>
            </div>
        </div>
    )
}