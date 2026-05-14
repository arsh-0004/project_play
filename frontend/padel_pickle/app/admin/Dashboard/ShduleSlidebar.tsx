export const Schedule = ({ data }: any) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Today's Schedule</h2>

      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="text-sm text-gray-500">No matches today</p>
        ) : (
          data.map((match: any) => (
            <div key={match._id} className="bg-gray-900 text-white p-3 rounded-lg">
              <p className="font-medium">{match.createdBy?.name}</p>
              <p className="text-sm text-gray-300">{match.gameType} Match</p>
              <p className="text-xs text-gray-400">{match.duration}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};