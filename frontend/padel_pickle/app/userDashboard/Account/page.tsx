"use client";

import { useEffect, useState } from "react";
import { getDecodedToken } from "@/app/admin/users/tokegetting";
import { UserType } from "@/app/admin/types/admin.venues.types";

const Account = () => {
  const [userData, setUserData] = useState<UserType | null>(null);

  const [userId, setUserId] = useState<string | null>(null);

  // STEP 1: get token safely 
  useEffect(() => {
    const user = getDecodedToken();
    if (user?._id) {
      setUserId(user._id);
    }
  }, []);

  // STEP 2: fetch user when userId is ready
  useEffect(() => {
    if (!userId) return;

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/viewUser/${userId}`)
      .then((res) => res.json())
      .then((data) => setUserData(data.data));
  }, [userId]);

  return (
    <div className="bg-white rounded-3xl shadow p-4 w-[35%]">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>

      <div className="relative">
        <img
          src="https://images.pexels.com/photos/13185150/pexels-photo-13185150.jpeg"
          className="w-full h-40 sm:h-48 object-cover rounded-2xl"
        />
      </div>

      <div className="mt-4 space-y-3">
        <input
          className="w-full bg-gray-100 rounded-full px-4 py-2"
          value={userData?.name || ""}
          readOnly
        />

        <input
          className="w-full bg-gray-100 rounded-full px-4 py-2"
          value={userData?.phone || ""}
          readOnly
        />

        <input
          className="w-full bg-gray-100 rounded-full px-4 py-2"
          value={userData?.email || ""}
          readOnly
        />

        <button className="w-full bg-blue-900 text-white py-3 rounded-full mt-4">
          Save
        </button>
      </div>
    </div>
  );
};

export default Account;