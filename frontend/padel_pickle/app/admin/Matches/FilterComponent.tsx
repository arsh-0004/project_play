const Filters = () => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
      {/* Tabs */}
      <div className="flex gap-2">
        {["Upcoming", "Previous", "Cancelled"].map((tab, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-full text-sm ${
              i === 0
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dropdowns */}
      <div className="flex gap-3">
        <select className="px-4 py-2 rounded-full bg-gray-100 text-sm">
          <option>Game</option>
        </select>

        <select className="px-4 py-2 rounded-full bg-gray-100 text-sm">
          <option>Select a date</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;