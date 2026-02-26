
import { Search } from "lucide-react";

export default function DashboardHeader({ search, setSearch }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

      <h1 className="text-2xl font-semibold tracking-tight">
        All Resources
      </h1>

      <div className="flex gap-4 items-center">

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 w-64"
          />
        </div>

        {/* Filter */}
        <select className="text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600">
          <option>Latest</option>
          <option>Most Upvoted</option>
        </select>

      </div>
    </div>
  );
}