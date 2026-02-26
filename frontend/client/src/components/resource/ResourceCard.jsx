import { useState } from "react";
import axios from "../../services/axios";
import { ThumbsUp } from "lucide-react";

export default function ResourceCard({ resource }) {

  const [upvotes, setUpvotes] = useState(resource.upvoteCount || 0);
  const [loading, setLoading] = useState(false);

  const handleUpvote = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await axios.post(`/upvote/${resource._id}`);

      setUpvotes((prev) => prev + 1);

    } catch (err) {
      alert(err.response?.data?.message || "Already upvoted");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition space-y-4">

      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-800">
        {resource.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-600 line-clamp-3">
        {resource.description || "No description provided."}
      </p>

      {/* Tags */}
      {resource.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {resource.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-slate-100 px-2 py-1 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom Section */}
      <div className="flex justify-between items-center pt-2">

        <span className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600">
          {resource.type}
        </span>

        <button
          onClick={handleUpvote}
          disabled={loading}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition font-medium"
        >
          <ThumbsUp size={16} />
          {upvotes}
        </button>

      </div>

    </div>
  );
}