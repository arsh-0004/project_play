export const Statistics = ({ data }: { data: any }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Statistics</h2>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Total</p>
          <h3 className="text-xl font-bold">{data.totalMatches || 0}</h3>
        </div>

        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Padel</p>
          <h3 className="text-xl font-bold">{data.padelMatches || 0}</h3>
        </div>

        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm text-gray-500">Pickleball</p>
          <h3 className="text-xl font-bold">
            {data.pickleballMatches || 0}
          </h3>
        </div>
      </div>
    </div>
  );
};