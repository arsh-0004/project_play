"use client";

import { getDecodedToken } from "@/app/admin/users/tokegetting";

const user = getDecodedToken();

type Props = {
  isOpen: boolean;
  whichPlayer: string;
  onClose: () => void;
  onConfirm: (player: {
    _id: string;
    name: string;
    email: string;
    whichPlayer: string;
  }) => void;
};

export default function UserModal({
  isOpen,
  onClose,
  whichPlayer,
  onConfirm,
}: Props) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!user?._id) {
      alert("User not logged in");
      return;
    }

    onConfirm({
      _id: user._id,
      name: user.name,
      email: user.email,
      whichPlayer,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-80 rounded-lg p-5 shadow-lg">
        <h2 className="text-lg font-semibold text-center mb-6">
          {user?.name}
          <br />
          {user?.email}
        </h2>

        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}