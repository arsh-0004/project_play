export const OngoingMatches = ({ data }: { data: any[] }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Ongoing Matches</h2>

      {data.length === 0 ? (
        <p className="text-sm text-gray-500">No ongoing matches</p>
      ) : (
        <div className="space-y-3">
          {data.map((match) => (
            <div key={match._id} className="bg-gray-100 p-3 rounded-lg">
              <p className="font-medium">{match.gameType}</p>
              <p className="text-sm text-gray-500">
                {match.venue?.name || "No venue"}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(match.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};