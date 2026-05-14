"use client";
import { useEffect, useState } from "react";
import Modal from "@/app/components/Modals.tsx/Modal";
import Select from "react-select";

type Props = {
    CourtId: string,
    open: boolean;
    setOpen: (val: boolean) => void;
};

type CourtData = {
    _id: string,
    name: string,
    selectGame: string,
    status: string
}

export default function EditCourt({ open, setOpen, CourtId }: Props) {

    const [CourtData, setCourtData] = useState<CourtData>({
        _id: "",
        name: "",
        selectGame: "",
        status: ""
    });

    const [formdata, setformdata] = useState({
        _id: CourtId,
        name: "",
        selectGame: "",
        status: ""
    });

    

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/viewCourt/${CourtId}`)
            .then(res => res.json())
            .then(data => {
                console.log("DATA:", data);
                setCourtData(data.data)
            })
            .catch(err => {
                console.error("ERROR:", err);
            });
    }, []);


      const handleSave = async () => {
        try {
            console.log(CourtData);
            
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/editCourt/${CourtId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name:CourtData.name,
                                  selectGame:CourtData.selectGame,
                                  status:CourtData.status
            })
            
            
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
                        // src="/court.jpg"
                        className="w-full h-50 object-cover rounded-2xl"
                    />
                    <button className="absolute bottom-3 right-3 bg-white px-4 py-2 rounded-full shadow">
                        ✏️Change Image
                    </button>
                </div>

                {/* Form */}
                <div className="mt-4 space-y-4">

                    {/* Name */}
                    <div>
                        <p className="text-sm text-gray-600 mb-1"></p>
                        <input
                            className="w-full bg-gray-100 rounded-full px-4 py-3"
                            value={CourtData?.name || ""}
                            onChange={(e) =>
                                setCourtData({ ...CourtData, name: e.target.value })
                            }
                        />
                    </div>

                    {/* Game */}
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Select game</p>
                        <Select
                            
                            options={[
                                // { value: "paddle", label: "paddle" },
                                { value: "paddle", label: "paddle" },
                                { value: "pickleball", label: "pickleball" }
                            ]}
                            value={
                                CourtData.selectGame
                                    ? { value: CourtData.selectGame, label: CourtData.selectGame }
                                    : null
                            }
                            onChange={(data:any) =>
                                setCourtData(prev =>
                                    prev ? { ...prev, selectGame: data?.value || "" } : prev
                                )
                            }
                        />

                    </div>

                    {/* Status */}
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Status</p>
                        <Select
                            
                            options={[
                                // { value: "active", label: "active" },
                                { value: CourtData?.status, label: CourtData?.status },
                                { value: "inactive", label: "inactive" }
                            ]}

                            value={[{value:CourtData.status,label:CourtData.status}]}
                            onChange={(data)=>setCourtData(prev=>prev ? {...prev, status:data?.value||""}: prev)}
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                    <button className="w-1/2 bg-orange-500 text-white py-3 rounded-full"
                        onClick={() => setOpen(false)}>
                        Delete Court
                    </button>

                    <button
                        className="w-1/2 bg-blue-900 text-white py-3 rounded-full"
                    onClick={()=>handleSave()}   
                    >
                        Save
                    </button>
                </div>

            </Modal>
        </>
    );
}