"use client";

import { useEffect, useState } from "react";
import { GameComposition } from "./GameComposition";
import { LoyaltyCard } from "./LoyaltyCard";
import { OngoingMatches } from "./OngoingMatchesCard";
import { RecentBookings } from "./RecendBookingTable";
import { Schedule } from "./ShduleSlidebar";
import { Stats } from "./StartsCard";
import { Statistics } from "./Statics";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/dashboard-stats`)
      .then((res) => res.json())
      .then((data) => setDashboard(data.data));
  }, []);

  if (!dashboard) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mt-6">
        Welcome to Play Padel Pickle
      </h1>

      <Stats data={dashboard} />

      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-3">
          <Schedule data={dashboard.todaySchedule} />
        </div>

        <div className="col-span-6 space-y-6">
          <RecentBookings data={dashboard.recentBookings} />
          <Statistics data={dashboard} />
        </div>

        <div className="col-span-3 space-y-6">
          <OngoingMatches data={dashboard.ongoingMatches} />
          <LoyaltyCard />
          <GameComposition data={dashboard} />
        </div>
      </div>
    </div>
  );
}