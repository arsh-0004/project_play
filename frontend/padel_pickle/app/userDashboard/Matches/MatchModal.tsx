"use client"
import Modal from "@/app/components/Modals.tsx/Modal"

type Props = {
  open: boolean;
  close: (val: boolean) => void;
};

const MatchModal = ({ open, close }: Props) => {
  return (
    <Modal isOpen={open} onClose={() => close(false)}>

      {/* 🔥 Wrapper added for height + scroll fix */}
      <div className="h-[90vh] flex flex-col">

        {/* 🔥 Scrollable content */}
        <div className="overflow-y-auto pr-1">

          <img
            src="https://images.pexels.com/photos/6307230/pexels-photo-6307230.jpeg"
            alt="Padel"
            className="w-full h-52 rounded-2xl object-cover"
          />

          <div className="mt-3 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">Padel Game</h1>
              <p className="text-lg text-gray-600">Sector 24, Chandigarh</p>
            </div>

            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-blue-900 flex items-center justify-center text-sm font-semibold text-blue-900">
                60
              </div>
            </div>
          </div>

          <div className="mt-4 bg-gray-100 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-lg text-gray-800">Add Equipment</h2>

              <button className="w-12 h-6 bg-blue-900 rounded-full relative">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
              </button>
            </div>

            <div className="space-y-4 mt-3">

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Racket</p>
                    <p className="text-sm text-gray-500">Lorem Ipsum text here</p>
                  </div>
                </div>

                <div className="flex border border-gray-400 rounded overflow-hidden">
                  <button className="px-3 py-1">-</button>
                  <span className="px-3 py-1 border-x border-gray-400">0</span>
                  <button className="px-3 py-1">+</button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Racket</p>
                    <p className="text-sm text-gray-500">Lorem Ipsum text here</p>
                  </div>
                </div>

                <div className="flex border border-gray-400 rounded overflow-hidden">
                  <button className="px-3 py-1">-</button>
                  <span className="px-3 py-1 border-x border-gray-400">0</span>
                  <button className="px-3 py-1">+</button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <input type="checkbox" className="mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Ball</p>
                  </div>
                </div>

                <div className="flex border border-gray-400 rounded overflow-hidden">
                  <button className="px-3 py-1">-</button>
                  <span className="px-3 py-1 border-x border-gray-400">0</span>
                  <button className="px-3 py-1">+</button>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-4 bg-gray-100 rounded-lg p-3">
            <h2 className="font-medium text-lg mb-3 text-gray-800">Select Payment Methods</h2>

            <div className="bg-white rounded-full px-4 py-3 flex justify-between">
              <span className="text-gray-700">Available Play Coins</span>
              <span className="font-medium text-gray-900">3500 coins</span>
            </div>

            <div className="mt-4 space-y-3">

              <label className="flex justify-between items-center text-gray-800">
                <div className="flex items-center gap-3">
                  <input type="radio" defaultChecked name="payment" />
                  <span>Play Coins</span>
                </div>
                <span>🏆</span>
              </label>

              <label className="flex justify-between items-center text-gray-600">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" />
                  <span>UPI / Card</span>
                </div>
                <span>🏧</span>
              </label>

              <label className="flex justify-between items-center text-gray-600">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" />
                  <span>Both</span>
                </div>
                <div className="flex gap-2">
                  <span>🏆</span>
                  <span>🏧</span>
                </div>
              </label>

            </div>
          </div>

          <div className="mt-4 bg-gray-100 rounded-lg p-4 flex justify-between items-center">
            <span className="font-medium text-gray-800">Cancellation Policy</span>
            <span>⌄</span>
          </div>

        </div>

        <div className="pt-3">
          <button className="w-full bg-blue-900 text-white py-4 rounded-xl text-lg font-medium">
            Pay ₹500
          </button>
        </div>

      </div>

    </Modal>
  )
}

export default MatchModal