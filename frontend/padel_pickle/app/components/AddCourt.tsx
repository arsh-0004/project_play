"use client";
import { useState } from "react";
import Modal from "./Modals.tsx/Modal";
import Select from "react-select";

type Props = {
    venueId :string,
  open: boolean;
  setOpen: (val: boolean) => void;
};

export default function AddCourt({ open, setOpen, venueId }: Props) {

  const [formdata, setformdata] = useState({
    _id:venueId,
    name: "",
    selectGame: "",
    status: ""
  });

  const handleSave = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/create_courts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata)
      });

      const data = await res.json();
      console.log("Created:", data);

      alert("Court Created ✅");
      setOpen(false); 
    } catch (err) {
      console.error(err);
      alert("Error Creating Court");
    }
  };

  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)}>

        {/* Image */}
        <div className="relative">
          <img
            src="/court.jpg"
            className="w-full h-50 object-cover rounded-2xl"
          />
          <button className="absolute bottom-3 right-3 bg-white px-4 py-2 rounded-full shadow">
            ✏️ Change Image
          </button>
        </div>

        {/* Form */}
        <div className="mt-4 space-y-4">

          {/* Name */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Name of the court</p>
            <input
              className="w-full bg-gray-100 rounded-full px-4 py-3"
              value={formdata.name}
              onChange={(e) =>
                setformdata({ ...formdata, name: e.target.value })
              }
            />
          </div>

          {/* Game */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Select game</p>
            <Select
              options={[
                { value: "paddle", label: "paddle" },
                { value: "pickleball", label: "pickleball" }
              ]}
              onChange={(data) =>
                setformdata({ ...formdata, selectGame: data?.value || "" })
              }
            />
          </div>

          {/* Status */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <Select
              options={[
                { value: "active", label: "active" },
                { value: "inactive", label: "inactive" }
              ]}
              onChange={(data) =>
                setformdata({ ...formdata, status: data?.value || "" })
              }
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="w-1/2 bg-orange-500 text-white py-3 rounded-full"
          onClick={()=>setOpen(false)}>
            Delete Court
          </button>

          <button
            className="w-1/2 bg-blue-900 text-white py-3 rounded-full"
            onClick={handleSave}   // ✅ correct
          >
            Save
          </button>
        </div>

      </Modal>
    </>
  );
}