export const Stats = ({ data }: any) => {
  const stats = [
    { label: "Total Matches", value: data.totalMatches },
    { label: "Pickleball Matches", value: data.pickleballMatches },
    { label: "Padel Matches", value: data.padelMatches },
    { label: "Ongoing Matches", value: data.ongoingMatches.length },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mt-6">
      {stats.map((item, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">{item.label}</p>
          <h2 className="text-xl font-bold">{item.value}</h2>
        </div>
      ))}
    </div>
  );
};