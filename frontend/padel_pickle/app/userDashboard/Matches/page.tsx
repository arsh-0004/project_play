"use client"
import { useEffect, useState } from "react"
import MatchModal from "./MatchModal"
import { Courts, MatchMakingType, SingleVenueResponseType, UserType } from "@/app/admin/types/admin.venues.types"
import UserModal from "@/app/components/Modals.tsx/AddUserItself"

type MatchDataType = {
  _id: string,
  createdBy: UserType,
  participents: UserType[],
  gameType: string,
  venue: SingleVenueResponseType,
  date: string,
  court: Courts,
  duration: string,
  slots: [
    {
      time: String,     // "06:00"
      price: Number,    // 400
      session: String,  // "morning"
    }
  ],
  status: string,
  maxPlayers: number,


}


const Matches = () => {

  const [section35, setSection35] = useState(false)
  const [joinMatchModal, setJoinMatchModal] = useState(false)
  const [matchData, setMatchData] = useState<MatchDataType[] | null>(null)
  const [pMatchData, setPMatchData] = useState<MatchMakingType | null>(null)
  const [addPlayer, setAddPlayer] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<
    "teamA.player1" | "teamA.player2" | "teamB.player1" | "teamB.player2" | ""
  >("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/viewMatches`)
      .then((res) => res.json())
      .then((data) => {
        setMatchData(data.data)

      })
  }, [])


  const viewDetailsOfMatch = async (id: string) => {

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/viewPMatch/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPMatchData(data.data)

      })

  }


  const handlePaymentAndJoin = async (player: {
  _id: string;
  name: string;
  email: string;
  whichPlayer: string;
}) => {
  if (!pMatchData?._id) {
    alert("Match not selected");
    return;
  }

  localStorage.setItem(
    "pendingJoin",
    JSON.stringify({
      // matchId: pMatchData._id,
      playerId: player._id,
      whichPlayer: player.whichPlayer,
    })
  );
  

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: 400,
      match: pMatchData.gameType,
      email: player.email,
      _id: pMatchData._id,
      whichPlayer: player.whichPlayer,
    }),
  });

  const data = await res.json();

  if (data.success && data.url) {
    window.location.href = data.url;
  } else {
    alert(data.message || "Payment failed");
  }
};
  return (


    <div className="bg-white p-6 text-white font-sans flex">

      <div className={section35 ? "w-[65%]" : "w-full"}>

        {/* <!-- Header --> */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-blue-400">Open Matches</h1>

          <div className="flex gap-3">
            <button className="bg-gray-800 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              Game
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <button className="bg-gray-800 px-4 py-2 rounded-full text-sm flex items-center gap-2">
              Select a date
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* <!-- Table Container --> */}
        <div className="bg-gray-100 text-gray-800 rounded-2xl p-4">

          {/* <!-- Table Header --> */}
          <div className="grid grid-cols-6 text-sm text-gray-500 px-4 py-2 border-b">
            <div>Name of Creator</div>
            <div>People Joined</div>
            <div>Game</div>
            <div>Venue</div>
            <div>Date & Time</div>
            <div className="text-center">Action</div>
          </div>

          {/* <!-- Rows --> */}
          <div className="divide-y">

            {/* <!-- Row --> */}
            {matchData?.map((data, i) => (
              <div
                key={i} className="grid grid-cols-6 items-center px-4 py-3 hover:bg-gray-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <img src="https://i.pravatar.cc/40?img=1" className="w-8 h-8 rounded-full" />
                  {data.createdBy?.name}
                </div>
                <div>{ }</div>
                <div>{data.gameType}</div>
                <div>{data.venue?.name}</div>
                <div className="text-sm">{data.date}</div>
                <div className="flex justify-center text-orange-500"
                  onClick={() => {
                    setSection35(true)
                    viewDetailsOfMatch(data._id)
                  }
                  }
                >👁</div>
              </div>

            ))}

          </div>

          {/* <!-- Footer --> */}
          <div className="flex items-center justify-between mt-6 text-sm text-gray-500">

            <div>
              Showing 12 results of 12,408
            </div>

            {/* <!-- Pagination --> */}
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded bg-gray-200 text-gray-400">Prev</button>
              <button className="px-3 py-1 rounded bg-blue-600 text-white">1</button>
              <button className="px-3 py-1 rounded bg-gray-200">2</button>
              <button className="px-3 py-1 rounded bg-gray-200">3</button>
              <span>...</span>
              <button className="px-3 py-1 rounded bg-gray-200">10</button>
              <button className="px-3 py-1 rounded bg-gray-200">Next</button>
            </div>

          </div>

        </div>
      </div>


      {/* 35% wala section */}


      {section35 && <div className="w-[35%] p-3">
        <div className="bg-gray-100 flex items-center  min-h-screen w-full text-black">

          <div className="w-full  rounded-2xl overflow-hidden shadow-lg">

            <div className="relative">
              <img src="https://images.pexels.com/photos/27440719/pexels-photo-27440719.jpeg"
                className="w-full h-44 object-cover" />
            </div>

            <div className="p-4  space-y-2">

              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{pMatchData?.gameType} Game</h2>
                <span className="text-sm ">{pMatchData?.duration}</span>
              </div>

              <p className="text-sm ">Sector 24, Chandigarh</p>

              <div className="flex justify-between text-sm">
                <span>📅{pMatchData?.date}</span>
                <span>⏰ {pMatchData?.date}</span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg"
                    className="w-6 h-6 rounded-full" />
                  {/* <span className="text-sm ">{pMatchData?.tea.map((player)=>player.name)}</span> */}
                </div>
                {/* <span className="text-sm ">{pMatchData?.participents.length}</span> */}
              </div>

              <p className="text-sm ">Equipment Rented: None</p>
            </div>

            <div className="bg-white text-black p-4 rounded-t-2xl">
              <h3 className="text-sm font-medium text-center mb-3">Players in the game</h3>

              <div className="flex items-center justify-between">

                <div className="flex flex-col items-center">
                  {
                    pMatchData?.teamA.player1?.name ? (
                      <div className="flex flex-col items-center">
                        <img
                          src="https://randomuser.me/api/portraits/men/11.jpg"
                          className="w-12 h-12 rounded-full"
                        />
                        <span className="text-xs mt-1">
                          {pMatchData?.teamA.player1?.name}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center"

                      >
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          +
                        </div>
                        <p className="text-xs mt-1">Available</p>
                      </div>
                    )
                  }

                </div>
                <div className="flex flex-col items-center">
                  {
                    pMatchData?.teamA.player2?.name ? (
                      <div className="flex flex-col items-center">
                        <img
                          src="https://randomuser.me/api/portraits/men/11.jpg"
                          className="w-12 h-12 rounded-full"
                        />
                        <span className="text-xs mt-1">
                          {pMatchData?.teamA.player2?.name}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center"
                        onClick={() => {
                          setSelectedSlot("teamA.player2");
                          setAddPlayer(true);
                        }}                      >
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          +
                        </div>
                        <p className="text-xs mt-1">Available</p>
                      </div>
                    )
                  }
                </div>
                <UserModal
                  isOpen={addPlayer}
                  onClose={() => setAddPlayer(false)}
                  whichPlayer={selectedSlot}
                  onConfirm={(player) => {
                    setAddPlayer(false);
                    handlePaymentAndJoin(player);
                  }}
                />




                <span className="text-sm font-semibold">VS</span>

                <div className="flex flex-col items-center">
                  {
                    pMatchData?.teamB.player1?.name ? (
                      <div className="flex flex-col items-center">
                        <img
                          src="https://randomuser.me/api/portraits/men/11.jpg"
                          className="w-12 h-12 rounded-full"
                        />
                        <span className="text-xs mt-1">
                          {pMatchData?.teamB.player1?.name}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center"
                        onClick={() => {
                          setSelectedSlot("teamB.player1");
                          setAddPlayer(true);
                        }}
                      >
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          +
                        </div>
                        <p className="text-xs mt-1">Available</p>
                      </div>
                    )
                  }
                </div>

                <div className="flex flex-col items-center">
                  {
                    pMatchData?.teamB.player2?.name ? (
                      <div className="flex flex-col items-center">
                        <img
                          src="https://randomuser.me/api/portraits/men/11.jpg"
                          className="w-12 h-12 rounded-full"
                        />
                        <span className="text-xs mt-1">
                          {pMatchData?.teamB.player2?.name}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center"
                        onClick={() => {
                          setSelectedSlot("teamB.player2");
                          setAddPlayer(true);
                        }}
                      >
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          +
                        </div>
                        <p className="text-xs mt-1">Available</p>
                      </div>
                    )
                  }
                </div>

              </div>
            </div>

            <div className="p-4">
              <button className="w-full bg-blue-900 text-white py-3 rounded-xl font-medium hover:bg-blue-800 transition"
                onClick={() => setJoinMatchModal(true)}>
                Join Game
              </button>
            </div>

          </div>

        </div>
        <MatchModal open={joinMatchModal} close={setJoinMatchModal} />
      </div>}


    </div>



  )


}


export default Matches