"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"



export default function Header() {
  const router = useRouter()
  
  type viewEmp={
    _id:string,
    name:string,
    email:string,
    phone:string,
    

  }
  const [Employees, setEmployees] = useState([])
  const [selectedEmp, setSelectedEmp] = useState<viewEmp|null>(null);
  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/employe`)
      .then((res) => res.json())
      .then((data) => setEmployees(data))
  }, [])
  return (

    <>
      <div className="flex flex-col  p-2 bg-[#f1f1f1] mt-4">
        <div className="p-2">
          <h2 className="text-left text-4xl text-blue-950">All Employees</h2>
        </div>
        <div className="flex mt-3">
          <div className="w-[60%] flex gap-2 justify-end ">
            <button className=" bg-[#1C2329] w-20 h-10 rounded-3xl text-white ">Sort ▼</button>
            <button className=" bg-[#1C2329] w-40 h-10 rounded-3xl text-white text-left px-2" >Status ▼</button>

          </div>
          <div className="flex justify-end w-[40%] px-3">
            <button className=" bg-[#1C2329]   rounded-3xl h-10 w-50 text-white cursor-pointer "
            onClick={()=>router.push("/admin/addemp")}>+ Add New Employees </button>
          </div>
        </div>


      </div>




      <div className="min-h-screen bg-gray-100 flex  justify-center w-full ">
        <div className={`${selectedEmp ? "w-[60%]" : "w-full" } bg-white rounded-2xl shadow-lg p-6`}>
        {/* <div className={`w-full bg-white rounded-2xl shadow-lg p-6`}> */}

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-700">All Employees</h2>

            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 text-sm text-gray-500 px-4 py-2 border-b">
            <span>Name</span>
            <span>Status</span>
            <span>Email</span>
            <span>Phone Number</span>
            <span className="text-right">Action</span>
          </div>

          {
            Employees.map((emp: any) => (
              <div className="space-y-3 mt-3" key={emp._id}>

                <div className="grid grid-cols-5 items-center bg-gray-50 p-3 rounded-xl">
                  <div className="flex items-center gap-3">
                    {/* <img src="https://i.pravatar.cc/40" className="w-8 h-8 rounded-full" /> */}
                    <span className="text-sm text-gray-700">{emp.name}</span>
                  </div>

                  <span className="bg-green-400 text-white text-xs px-3 py-1 rounded-full w-fit">

                  </span>

                  <span className="text-sm text-gray-600">{emp.email}</span>
                  <span className="text-sm text-gray-600">{emp.phone}</span>

                  <div className="text-right text-orange-500 cursor-pointer" onClick={()=>setSelectedEmp(emp)}>👁</div>
                </div>

              </div>
            )

            )
          }
        </div>

        {/* this is layout */}

        {selectedEmp &&(<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">


            <img
              src="https://images.pexels.com/photos/2618794/pexels-photo-2618794.jpeg"
              alt="Employee"
              className="w-full h-56 object-cover"
            />

            <div className="p-5 space-y-4">

              <div>
                <label className="text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  value={selectedEmp.name}
                  readOnly
                  className="w-full mt-1 px-4 py-3 rounded-full bg-gray-200 outline-none text-zinc-950"
                />
              </div>


              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    type="text"
                    value={selectedEmp.email}
                    readOnly
                    className="w-full mt-1 px-4 py-3 rounded-full bg-gray-200 outline-none text-sm text-zinc-950"
                  />
                </div>

                <div className="w-1/2">
                  <label className="text-sm text-gray-600">Phone</label>
                  <input
                    type="text"
                    value={selectedEmp.phone}
                    readOnly
                    className="w-full mt-1 px-4 py-3 rounded-full bg-gray-200 outline-none text-sm text-zinc-950"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">Status</label>
                <select className="w-full mt-1 px-4 py-3 rounded-full bg-gray-200 outline-none text-zinc-950">
                  <option>Working</option>
                  <option>On Leave</option>
                  <option>Resigned</option>
                </select>
              </div>

              <button className="w-full bg-blue-900 text-white py-3 rounded-full hover:bg-blue-800 transition"
              onClick={() => router.push(`/admin/view_update_emp/${selectedEmp._id}`)}
              

              >
                View Details
              </button>

            </div>
          </div>
        </div>)}



      </div>

    </>
    
    
  )
}

