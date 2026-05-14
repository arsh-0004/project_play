"use client"

import { Courts, MatchMakingType, SingleVenueResponseType, TeamType, UserType } from "@/app/admin/types/admin.venues.types";
import { getDecodedToken } from "@/app/admin/users/tokegetting";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserListModal from "@/app/components/Modals.tsx/AllUserModal"





const user = getDecodedToken()
const generateDates = () => {
  const today = new Date();
  const dates = [];

  const year = today.getFullYear();
  const month = today.getMonth();

  // last date of current month
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let d = today.getDate(); d <= lastDate; d++) {
    const dateObj = new Date(year, month, d);

    dates.push({
      day: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
      date: d,
      fullDate: dateObj
    });
  }

  return dates;
};





const MatchCreationInVenue = () => {
  const router = useRouter()

  const params = useParams()
  const id = params.id
  const dates = generateDates()
  const [section40, setSection40] = useState(false)

  const [gameSelect, setGameSelect] = useState("padel");
  const [durationselect, setdurationselect] = useState<Record<string, string>>({});
  const [courtBgColor, setCourtBgColor] = useState<string>("")
  const [morningslotBgColor, setMorningSlotBgColor] = useState<string>("")
  const [eveningslotBgColor, setEveningSlotBgColor] = useState<string>("")
  const [section40Court, setSection40Court] = useState<Courts | null>(null)
  const [dateBg, setDateBg] = useState<number>(-1)
  const [selectType, setSelectType] = useState<
    "team1_player2" | "team2_player1" | "team2_player2" | null
  >(null);
  const [team1, setTeam1] = useState<TeamType>({
    player1: { _id: `${user?._id}`, name: `${user?.name}` },
    player2: { _id: "", name: "" }
  })
  const [team2, setTeam2] = useState<TeamType>({
    player1: { _id: "", name: "" },
    player2: { _id: "", name: "" }
  })
  const [playerModal, setPlayerModal] = useState(false)


  const [venue, setVenue] = useState<SingleVenueResponseType | null>(null)
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/view_Pvenue/${id}`)
      .then((res) => res.json())
      .then((data) => setVenue(data.data))
  }, [id])

  const [matchData, setMatchData] = useState<MatchMakingType>({
    createdBy: `${user?._id}`,
    date: "",
    gameType: "padel",
    venue: `${venue?._id}`,
    court: "",
    duration: "",
    slots: [],
    isPublic: false,
    status: "open",
    maxPlayers: 4,
    teamA: {
      player1: team1.player1 || null,
      player2: team1.player2 || null,
    },

    teamB: {
      player1: team2.player1 || null,
      player2: team2.player2 || null,
    }

  })



  const handle40 = async (id: string) => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/viewCourt/${id}`)
      .then((res) => res.json())
      .then((data) => setSection40Court(data.data))

  }

  useEffect(() => {
    if (venue?._id) {
      setMatchData((prev) => ({
        ...prev,
        venue: venue._id
      }))
    }
  }, [venue])



  const handleSelectPlayer = (selectedUser: UserType) => {
    if (selectType === "team1_player2") {
      setTeam1(prev => ({
        ...prev,
        player2: {
          _id: selectedUser._id,
          name: selectedUser.name
        }
      }));
    }

    if (selectType === "team2_player1") {
      setTeam2(prev => ({
        ...prev,
        player1: {
          _id: selectedUser._id,
          name: selectedUser.name
        }
      }));
    }

    if (selectType === "team2_player2") {
      setTeam2(prev => ({
        ...prev,
        player2: {
          _id: selectedUser._id,
          name: selectedUser.name
        }
      }));
    }

    setPlayerModal(false); // close modal
  };

  var match_id: string;
 const creatematch = async () => {
  try {
    const payload = {
      ...matchData,
      teamA: {
        player1: team1.player1?._id || null,
        player2: team1.player2?._id || null,
      },
      teamB: {
        player1: team2.player1?._id || null,
        player2: team2.player2?._id || null,
      },
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/matchCreation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("Match creation error:", data);
      throw new Error(data.message || "Failed");
    }

    return data.matchId;
  } catch (err) {
    console.log(err);
    alert("Error ❌");
    return null;
  }
};

  const totalPlayers = [
  team1.player1,
  team1.player2,
  team2.player1,
  team2.player2,
].filter((player) => player?._id && player._id.trim() !== "").length;




  const handlePayment = async () => {

    const match_id = await creatematch()
    console.log("in the ui the matchid is ", match_id)


    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 400 * totalPlayers,
        match: `${matchData.gameType}`,
        email: `${user?.email}`,
        _id: `${match_id}`

      }),
    });

    const data = await res.json();

    if (data.success && data.url) {
      window.location.href = data.url;

    } else {
      alert(data.message || "Payment failed");
    }
  };

  useEffect(() => {
    setMatchData((prev) => ({
      ...prev,
      teamA: {
        player1: {
          _id: team1.player1?._id || "",
          name: team1.player1?.name || "",
        },
        player2: {
          _id: team1.player2?._id || "",
          name: team1.player2?.name || "",
        },
      },
      teamB: {
        player1: {
          _id: team2.player1?._id || "",
          name: team2.player1?.name || "",
        },
        player2: {
          _id: team2.player2?._id || "",
          name: team2.player2?.name || "",
        },
      },

    }));
  }, [team1, team2]);




  return (



    <div className="bg-gray-100 p-6 font-sans flex">
      <div className={`bg-gray-200 rounded-2xl p-6 space-y-6 shadow ${section40 ? "w-[70%]" : "w-full"}`}>

        {/* <!-- Select Game --> */}
        <div>
          <h2 className="text-sm font-medium mb-2">Select Game</h2>
          <div className="flex gap-4">
            <button
              name="padel"
              //  className="flex-1 bg-blue-900 text-white py-3 rounded-xl"
              onClick={(e) => {
                setGameSelect("padel")
                setMatchData({ ...matchData, gameType: "padel" })
              }
              }
              className={`flex-1 py-3 rounded-xl ${gameSelect === "padel"
                ? "bg-blue-900 text-white"
                : "bg-gray-300 text-gray-600"
                }`}>Padel</button>
            <button
              //  className="flex-1 bg-gray-300 text-gray-600 py-3 rounded-xl"
              onClick={() => {
                setGameSelect("pickleball")
                setMatchData({ ...matchData, gameType: "pickleball" })

              }}
              className={`flex-1 py-3 rounded-xl ${gameSelect === "pickleball"
                ? "bg-blue-900 text-white"
                : "bg-gray-300 text-gray-600"
                }`}>Pickleball</button>
          </div>
        </div>

        {/* <!-- Date --> */}

        <div className="flex gap-3 overflow-x-auto py-2">
          {dates.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setMatchData({ ...matchData, date: `${item.fullDate}` })
                setDateBg(index)
              }}
              className={dateBg === index ? `min-w-15 bg-blue-900 rounded-xl px-3 py-2 text-center text-white` : `bg-gray-100 rounded-xl px-3 py-2 text-center`}
            >
              <p className="text-sm ">{item.day}</p>
              <p className="text-lg font-semibold">{item.date}</p>

            </div>
          ))}
        </div>

        {/* <!-- Courts --> */}
        <div>
          <h2 className="text-sm font-medium mb-3">Select a court</h2>
          <div className="grid grid-cols-2 gap-4">
            {venue?.courts.map((court) => (
              <div className={`bg-white p-4 rounded-xl space-y-3 ${courtBgColor === court._id ? "border" : null}`}
                key={court._id}>
                <p className="text-sm">{court.name}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setdurationselect((prev) => ({
                        ...prev,
                        [court._id]: "60"
                      }))
                      setCourtBgColor(court._id)
                      setMatchData({ ...matchData, court: `${court._id}`, duration: "60 Min", })
                      setSection40(true)
                      handle40(court._id)
                    }
                    }
                    className={
                      durationselect[court._id] === "60"
                        ? "bg-blue-900 text-white px-4 py-2 rounded-lg text-sm"
                        : "bg-gray-300 text-black px-4 py-2 rounded-lg text-sm"
                    }
                  >
                    60 Mins
                  </button>

                  {/* 120 mins */}
                  <button
                    onClick={() => {
                      setdurationselect((prev) => ({
                        ...prev,
                        [court._id]: "120"
                      }))
                      setCourtBgColor(court._id)
                      setMatchData({ ...matchData, court: `${court._id}`, duration: "120 Min", })
                      setSection40(true)
                      handle40(court._id)
                    }
                    }
                    className={
                      durationselect[court._id] === "120"   // ✅ FIX HERE
                        ? "bg-blue-900 text-white px-4 py-2 rounded-lg text-sm"
                        : "bg-gray-300 text-black px-4 py-2 rounded-lg text-sm"
                    }
                  >
                    120 Mins
                  </button>
                </div>
              </div>

            ))}
          </div>
        </div>

        {/* <!-- Time Slots --> */}
        <div className="grid grid-cols-2 gap-4">
          {/* <!-- Column --> */}
          <div className="bg-white p-4 rounded-xl">
            <h3 className="text-sm mb-3">Morning</h3>
            <div
              className="grid grid-cols-3 gap-2 text-center text-sm">
              {['06', '07', '08', '09', "10", "11"].map((slot) => (<div
                onClick={() => {
                  setMorningSlotBgColor(slot)
                  const newSlot = {
                    time: `${slot}:00`,
                    price: 400,
                    session: "morning"
                  }
                  setMatchData({ ...matchData, slots: [newSlot] })
                }
                }
                className={`${morningslotBgColor === slot ? "bg-orange-500 text-white" : "bg-gray-100"} p-2 rounded`} key={slot}>{`${slot}:00`}<br /><span className="text-xm">₹400</span></div>
              ))}
            </div>
          </div>

          {/* <!-- Column duplicate --> */}

          {/* <div className="bg-white p-4 rounded-xl">
            <h3 className="text-sm mb-3">Evening</h3>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-gray-100 p-2 rounded">06:00<br /><span className="text-xm">₹400</span></div>
              <div className="bg-orange-500 text-white p-2 rounded">07:00<br /><span className="text-xs">₹400</span></div>
              <div className="bg-gray-100 p-2 rounded">08:00<br /><span className="text-xs">₹400</span></div>
              <div className="bg-gray-100 p-2 rounded">09:00<br /><span className="text-xm">₹400</span></div>
              <div className="bg-orange-500 text-white p-2 rounded">10:00<br /><span className="text-xm">₹400</span></div>
              <div className="bg-gray-100 p-2 rounded">11:00<br /><span className="text-xm">₹400</span></div>
            </div>
          </div> */}
          <div className="bg-white p-4 rounded-xl">
            <h3 className="text-sm mb-3">Evening</h3>
            <div
              className="grid grid-cols-3 gap-2 text-center text-sm">
              {['06', '07', '08', '09', "10", "11"].map((slot) => (<div
                onClick={() => {
                  setEveningSlotBgColor(slot)
                  const newSlot = {
                    time: `${slot}:00`,
                    price: 400,
                    session: "Evening"
                  }
                  setMatchData({ ...matchData, slots: [newSlot] })
                }
                }
                className={`${eveningslotBgColor === slot ? "bg-orange-500 text-white" : "bg-gray-100"} p-2 rounded`} key={slot}>{`${slot}:00`}<br /><span className="text-xm">₹400</span></div>
              ))}
            </div>
          </div>
        </div>

        {/* <!-- Game Type --> */}
        <div className="bg-white p-4 rounded-xl space-y-4">


          {/* <!-- Players --> */}
          <div className="flex items-center justify-around">
            <div className="flex gap-6 text-center text-sm">
              <div>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"><img src="https://i.pravatar.cc/40" alt="" /></div>
                <p className="text-xs mt-1">{team1.player1?.name}</p>
              </div>
              <div
                onClick={() => {
                  setSelectType("team1_player2");
                  setPlayerModal(true);
                }}              >
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">+</div>
                <p className="text-xs mt-1">{team1.player2?.name || "Available"}</p>
              </div>
            </div>
            <UserListModal
              isOpen={playerModal}
              setIsOpen={setPlayerModal}
              onSelect={handleSelectPlayer}
            />

            <div className="text-sm">vs</div>

            <div className="flex gap-6 text-center text-sm">
              <div>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"
                  onClick={() => {
                    setSelectType("team2_player1");
                    setPlayerModal(true);
                  }}                >+</div>
                <p className="text-xs mt-1">{team2.player1?.name || "Available"}</p>
              </div>
              <div>
                <div
                  onClick={() => {
                    setSelectType("team2_player2");
                    setPlayerModal(true);
                  }} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">+</div>
                <p className="text-xs mt-1">{team2.player2?.name || "Available"}</p>
              </div>
            </div>
          </div>


        </div>

        {/* <!-- Match Type --> */}



        {/* <!-- Continue Button --> */}
        <button
          onClick={() => {
            handlePayment()


          }}
          className="w-full bg-blue-900 text-white py-4 rounded-xl text-lg">
          Continue
        </button>

      </div>


      {section40 && <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-sm p-8 font-sans text-slate-800">

          <header className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">{section40Court?.name}</h1>
            <p className="text-gray-500 mt-1">{section40Court?.address}</p>
          </header>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">{section40Court?.description}</h2>
            <p className="text-gray-500 leading-relaxed text-sm">
              onsequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Opening Hours</h2>
            <div className="space-y-1">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Mon-Fri</span>
                <span>6:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Mon-Fri</span>
                <span>6:00 AM - 11:00 PM</span>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Facilities</h2>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-xs font-medium text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
                Special Access
              </div>
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-xs font-medium text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
                Equipment Rental
              </div>
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-xs font-medium text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
                Paid Parking
              </div>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 transition-colors py-3 rounded-xl">
              <div className="bg-[#0f3455] p-2 rounded-lg text-white">
                <svg className="w-5 h-5 transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </div>
              <span className="font-semibold text-gray-500">Directions</span>
            </button>

            <button className="flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 transition-colors py-3 rounded-xl">
              <div className="bg-[#0f3455] p-2 rounded-lg text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
              </div>
              <span className="font-semibold text-gray-500">Call Now</span>
            </button>
          </div>

        </div>
      </div>}
    </div>
  )

}



export default MatchCreationInVenue






