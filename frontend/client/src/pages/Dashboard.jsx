import { useEffect, useState } from "react";
import axios from "../services/axios";
import AppLayout from "../components/layout/AppLayout";
import ResourceGrid from "../components/resource/ResourceGrid";

export default function Dashboard() {

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
  const delayDebounce = setTimeout(() => {
    fetchResources(search);
  }, 500);

  return () => clearTimeout(delayDebounce);
}, [search]);

  const fetchResources = async (query = "") => {
    try {
      setLoading(true);

      const res = await axios.get(`/resource?search=${query}`);

      setResources(res.data.data);

    } catch (error) {
      console.error("Failed to fetch resources");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>

      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <h1 className="text-2xl font-semibold">
            Explore Resources
          </h1>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            //   fetchResources(e.target.value);
            }}
            className="border border-slate-300 rounded-lg px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />

        </div>

        {/* Content */}
        {loading ? (
          <p className="text-slate-500">Loading resources...</p>
        ) : (
          <ResourceGrid resources={resources} />
        )}

      </div>

    </AppLayout>
  );
}