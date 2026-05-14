"use client";

import { EmpType } from "@/app/admin/types/admin.venues.types";
import Modal from "@/app/components/Modals.tsx/Modal";
import { useEffect, useState } from "react";

type Props = {
  venueId: string,
  open: boolean;
  setOpen: (val: boolean) => void;
    existingEmployees: any[]; // add this

};



export default function AddEmployee({ open, setOpen, venueId ,existingEmployees}: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [empdata, setempdata] = useState<EmpType[]>([])
  const employee = {
    name: "Name of person",
    img: "https://i.pravatar.cc/150?img=1",
  };

  useEffect(() => {
    try {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/employe`)
        .then((res) => res.json())
        .then((data) => setempdata(data))
    } catch (error) {
      throw error
    }
  }, [])

  useEffect(() => {
  if (open && existingEmployees.length > 0) {
    const ids = existingEmployees.map((emp) => emp._id);
    setSelected(ids);
  }
}, [open, existingEmployees]);

const handleSave = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/AddEmpVenue/${venueId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeAssociated: selected, // 👈 only selected IDs
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update");
    }

    console.log("Updated successfully", data);

    setOpen(false); 
  } catch (err) {
    console.error(err);
  }
};

  return (

    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <div className="w-full max-w-md mx-auto bg-gray-100 rounded-3xl p-6 shadow-lg">

        <h2 className="text-lg font-semibold mb-4">Add Employees</h2>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">Search Name</p>
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-3 rounded-full bg-gray-200 outline-none text-sm"
          />
        </div>

        {/* Single Employee */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {empdata.map((emp) => {
            const isSelected = selected.includes(emp._id);
            return (

              <div className="flex flex-col items-center" key={emp._id}>

                <div
                  onClick={() => {
                    let newSelected = [...selected];

                    if (newSelected.includes(emp._id)) {
                      newSelected = newSelected.filter((id) => id !== emp._id);
                    } else {
                      newSelected.push(emp._id);
                    }

                    setSelected(newSelected);
                  }}
                  className="relative cursor-pointer w-full"
                  
                >
                  <img
                    src={employee.img}
                    className="w-full h-28 object-cover rounded-xl"
                  />

                  {/* Checkbox */}
                  <div
                    className={`absolute top-2 left-2 w-5 h-5 rounded-md border-2 ${isSelected
                      ? "bg-blue-900 border-blue-900"
                      : "bg-white border-gray-300"
                      }`}
                  />
                </div>

                <p className="text-sm mt-2 text-gray-600">
                  {emp.name}
                </p>
              </div>)
          })}
        </div>

        <div className="flex gap-4">
          <button className="flex-1 py-3 rounded-full border border-blue-900 text-blue-900 font-medium">
            Cancel
          </button>
          <button className="flex-1 py-3 rounded-full bg-blue-900 text-white font-medium"
          onClick={()=>handleSave()}>
            Add
          </button>
        </div>
      </div>




    </Modal>
  )
}
