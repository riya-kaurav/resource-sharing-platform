import { useEffect, useState } from "react";
import axios from "../services/axios";
import AppLayout from "../components/layout/AppLayout";
import ResourceGrid from "../components/resource/ResourceGrid";
import { Search } from "lucide-react";

const filters = [
  { label: "All", value: "" },
  { label: "📝 Notes", value: "notes" },
  { label: "📄 PYQs", value: "pyqs" },
  { label: "💻 Coding", value: "coding" },
  { label: "🎯 Interview", value: "interview" },
];

export default function Dashboard() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => fetchResources(search, activeFilter), 400);
    return () => clearTimeout(delay);
  }, [search, activeFilter]);

  const fetchResources = async (query = "", type = "") => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (query) params.append("search", query);
      if (type) params.append("type", type);
      const res = await axios.get(`/resources?${params.toString()}`);
      setResources(res.data.data);
    } catch {
      console.error("Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 fade-up">

        {/* Hero */}
        <div className="genz-card p-6" style={{background: "linear-gradient(135deg, rgba(237,233,254,0.8), rgba(252,231,243,0.8))"}}>
          <h1 className="text-2xl font-black text-slate-800 mb-1">Explore Resources </h1>
          <p className="text-sm text-slate-800 font-600">Discover notes, PYQs, coding resources & more!</p>

          {/* Search */}
          <div className="relative mt-4">
            {/* <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" /> */}
            <input
              type="text"
              placeholder="Search anything..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="genz-input pl-10"
            />
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className="px-4 py-2 rounded-2xl text-sm font-800 transition-all hover:scale-105"
              style={activeFilter === f.value
                ? { background: "linear-gradient(135deg, #c4b5fd, #f9a8d4)", color: "white", boxShadow: "0 4px 15px rgba(196,181,253,0.4)" }
                : { background: "rgba(255,255,255,0.7)", color: "#885dd3", border: "1.5px solid #e9d5ff" }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="text-4xl float">📚</div>
            <p className="text-sm font-800 text-slate-400">Loading resources...</p>
          </div>
        ) : (
          <ResourceGrid resources={resources} />
        )}

      </div>
    </AppLayout>
  );
}