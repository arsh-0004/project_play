export const RecentBookings = ({ data }: any) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Recent Bookings</h2>

      <table className="w-full text-sm">
        <thead className="text-gray-500">
          <tr>
            <th>Name</th>
            <th>Game</th>
            <th>Venue</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map((match: any) => (
            <tr key={match._id} className="border-t">
              <td className="py-2">{match.createdBy?.name}</td>
              <td>{match.gameType}</td>
              <td>{match.venue?.name}</td>
              <td>{new Date(match.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};