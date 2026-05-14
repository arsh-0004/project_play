const MatchDetails = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      {/* Image */}
      <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>

      {/* Title */}
      <h2 className="font-semibold text-lg">Padel Game</h2>

      <p className="text-sm text-gray-500">
        Sector 24, Chandigarh
      </p>

      {/* Info */}
      <div className="mt-4 space-y-2 text-sm">
        <p>📅 17 Sept 2024</p>
        <p>⏰ 09:00 AM</p>
        <p>👤 Alex Parker</p>
        <p>👥 Players: 3</p>
        <p>🎾 Equipment: None</p>
      </div>

      {/* Players */}
      <div className="mt-4 bg-gray-100 p-3 rounded-lg">
        <p className="text-sm mb-2">Players in the game</p>

        <div className="flex justify-between items-center text-xs">
          <span>Wren Lee</span>
          <span>VS</span>
          <span>Taylor Davis</span>
        </div>
      </div>

      {/* Button */}
      <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg">
        Cancel Game & Issue Refund
      </button>
    </div>
  );
};

export default MatchDetails;