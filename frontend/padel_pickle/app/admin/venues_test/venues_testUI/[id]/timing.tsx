"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

type timingData = {
  day: string;
  open: string;
  close: string;
};

export default function TimingsUI({ data }: { data: string }) {
  const [timings, setTimings] = useState<timingData[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Handle input change (edit timings)
  const handleChange = (
    index: number,
    field: "open" | "close",
    value: string
  ) => {
    const updated = [...timings];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setTimings(updated);
  };

  // ✅ Fetch data once
  useEffect(() => {
    const fetchTimings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/Timing/${data}`);
        const result = await res.json();

        // assuming API returns: { data: timingData[] }
        setTimings(result.data || []);
      } catch (error) {
        console.error("Error fetching timings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimings();
  }, []);

  // ✅ Save handler (optional API call)
  const handleSave = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/updateTiming/${data}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( timings ),
      });

      alert("Timings saved!");
    } catch (error) {
      console.error("Error saving timings:", error);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Timings</h2>

        {/* Header */}
        <div className="grid grid-cols-3 text-sm font-medium text-gray-500 border-b pb-3">
          <span>Days</span>
          <span>Opening Hours</span>
          <span>Closing Hours</span>
        </div>

        {/* Rows */}
        <div className="space-y-4 mt-4">
          {timings.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 items-center gap-4"
            >
              {/* Day */}
              <div className="text-gray-700 font-medium">
                {item.day}
              </div>

              {/* Open Time */}
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  value={item.open}
                  onChange={(e) =>
                    handleChange(index, "open", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 rounded-full border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Close Time */}
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="time"
                  value={item.close}
                  onChange={(e) =>
                    handleChange(index, "close", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 rounded-full border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Save Timings
      </button>
    </div>
  );
}