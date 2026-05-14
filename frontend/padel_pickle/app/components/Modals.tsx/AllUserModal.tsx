"use client";

import { UserType } from "@/app/admin/types/admin.venues.types";
import { useEffect, useState } from "react"


// const [team, setTeam] = useState<TeamType>({
//     player1:{_id:`${user?._id}`,name:`${user?.name}`},
//     player2:{_id:"",name:""}
//   })


type Props = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onSelect: (user: UserType) => void;
  
};

export default function UserListModal({isOpen, setIsOpen, onSelect}:Props) {

    const [userData, setUserData]= useState<UserType[]|null>(null)

  useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/viewAllUser`)
    .then((res) => res.json())
    .then((data) => setUserData(data.data));
}, []);

  return (
    <div className="p-6">      

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            
            {/* Modal Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                User List
              </h2>

              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-gray-500 hover:text-red-500"
              >
                &times;
              </button>
            </div>

            {/* User List */}
<div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                  {userData?.map((user) => (
                <div
                  key={user._id}
                  className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                  onClick={() => onSelect(user)}
                 >
                  <h3 className="font-medium text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-900"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}