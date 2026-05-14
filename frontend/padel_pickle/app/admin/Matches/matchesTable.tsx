const MatchesTable = () => {
  const rows = Array.from({ length: 10 });

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Upcoming Matches</h2>

        <input
          placeholder="Search"
          className="px-3 py-2 border rounded-lg text-sm"
        />
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="text-left py-2">Team 1</th>
            <th className="text-left py-2">Team 2</th>
            <th>Game</th>
            <th>Venue</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {rows.map((_, i) => (
            <tr
              key={i}
              className={`border-b hover:bg-gray-50`}
            >
              <td className="py-3">Alex Parker</td>
              <td>Alex Parker</td>
              <td>Padel</td>
              <td>Game Zone</td>
              <td>22-01-2024</td>
              <td className="text-center">👁</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <p className="text-gray-500">
          Showing 12 results of 12,408
        </p>

        <div className="flex gap-2">
          {["Prev", "1", "2", "3", "...", "10", "Next"].map(
            (item, i) => (
              <button
                key={i}
                className="px-3 py-1 bg-gray-100 rounded"
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchesTable;