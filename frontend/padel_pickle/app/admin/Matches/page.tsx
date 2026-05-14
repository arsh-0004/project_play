import Filters from "./FilterComponent";
import MatchDetails from "./MatchesDetailsPanel";
import MatchesTable from "./matchesTable";

export default function MatchesPage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">Matches</h1>

      {/* Filters */}
      <Filters />

      {/* Content */}
      <div className="grid grid-cols-12 gap-6 mt-4">
        {/* Table */}
        <div className="col-span-8">
          <MatchesTable />
        </div>

        {/* Right Panel */}
        <div className="col-span-4">
          <MatchDetails />
        </div>
      </div>
    </div>
  );
}