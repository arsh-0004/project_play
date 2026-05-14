export const GameComposition = ({ data }: { data: any }) => {
  const padel = data?.padelMatches || 0;
  const pickleball = data?.pickleballMatches || 0;
  const total = data?.totalMatches || 0;

  const padelPercent = total ? Math.round((padel / total) * 100) : 0;
  const pickleballPercent = total ? Math.round((pickleball / total) * 100) : 0;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Game Composition</h2>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm">
            <span>Padel</span>
            <span>{padelPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-blue-900 h-2 rounded"
              style={{ width: `${padelPercent}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm">
            <span>Pickleball</span>
            <span>{pickleballPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-orange-500 h-2 rounded"
              style={{ width: `${pickleballPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};