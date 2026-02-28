// import { useState } from "react";
// import axios from "../../services/axios";
// import { ThumbsUp } from "lucide-react";

// export default function ResourceCard({ resource }) {

//   const [upvotes, setUpvotes] = useState(resource.upvoteCount || 0);
//   const [loading, setLoading] = useState(false);

//   const handleUpvote = async () => {
//     if (loading) return;

//     try {
//       setLoading(true);

//       await axios.post(`/upvotes/${resource._id}`);

//       setUpvotes((prev) => prev + 1);

//     } catch (err) {
//       alert(err.response?.data?.message || "Already upvoted");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition space-y-4">

//       <h3 className="text-lg font-semibold text-slate-800">
//         {resource.title}
//       </h3>

//       <p className="text-sm text-slate-600 line-clamp-3">
//         {resource.description || "No description provided."}
//       </p>

//       {resource.tags?.length > 0 && (
//         <div className="flex flex-wrap gap-2">
//           {resource.tags.map((tag, index) => (
//             <span
//               key={index}
//               className="text-xs bg-slate-100 px-2 py-1 rounded-md"
//             >
//               #{tag}
//             </span>
//           ))}
//         </div>
//       )}

//       <div className="flex justify-between items-center pt-2">

//         <span className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600">
//           {resource.type}
//         </span>

//         <button
//           onClick={handleUpvote}
//           disabled={loading}
//           className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition font-medium"
//         >
//           <ThumbsUp size={16} />
//           {upvotes}
//         </button>

//       </div>

//     </div>
//   );
// }



// import { useState } from "react";
// import axios from "../../services/axios";
// import { ThumbsUp } from "lucide-react";

// export default function ResourceCard({ resource }) {

//   const [upvotes, setUpvotes] = useState(resource.upvoteCount || 0);
//   const [loading, setLoading] = useState(false);

//   const handleUpvote = async () => {
//     if (loading) return;

//     try {
//       setLoading(true);
//       await axios.post(`/upvotes/${resource._id}`);
//       setUpvotes((prev) => prev + 1);
//     } catch (err) {
//       alert(err.response?.data?.message || "Already upvoted");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition space-y-4">

//       <h3 className="text-lg font-semibold text-slate-800">
//         {resource.title}
//       </h3>

//       <p className="text-sm text-slate-600 line-clamp-3">
//         {resource.description || "No description provided."}
//       </p>

//       {resource.tags?.length > 0 && (
//         <div className="flex flex-wrap gap-2">
//           {resource.tags.map((tag, index) => (
//             <span key={index} className="text-xs bg-slate-100 px-2 py-1 rounded-md">
//               #{tag}
//             </span>
//           ))}
//         </div>
//       )}

//       <div className="flex justify-between items-center pt-2">

//         <span className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600">
//           {resource.type}
//         </span>

//         <div className="flex items-center gap-3">

//           <a
//             href={resource.pdfUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-sm text-indigo-600 hover:underline font-medium"
//           >
//             View PDF
//           </a>

//           <button
//             onClick={handleUpvote}
//             disabled={loading}
//             className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 transition font-medium"
//           >
//             <ThumbsUp size={16} />
//             {upvotes}
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }

import { useState } from "react";
import axios from "../../services/axios";
import { ThumbsUp, FileText } from "lucide-react";

const typeConfig = {
  notes:     {  label: "Notes",     cls: "type-notes" },
  pyqs:      {  label: "PYQs",      cls: "type-pyqs" },
  coding:    {  label: "Coding",    cls: "type-coding" },
  interview: {  label: "Interview", cls: "type-interview" },
};

export default function ResourceCard({ resource }) {
  const [upvotes, setUpvotes] = useState(resource.upvoteCount || 0);
  const [upvoted, setUpvoted] = useState(false);
  const [loading, setLoading] = useState(false);

  const tc = typeConfig[resource.type] || {  label: resource.type, cls: "type-notes" };

  const handleUpvote = async () => {
    if (loading || upvoted) return;
    try {
      setLoading(true);
      await axios.post(`/upvotes/${resource._id}`);
      setUpvotes((p) => p + 1);
      setUpvoted(true);
    } catch (err) {
      alert(err.response?.data?.message || "Already upvoted");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="genz-card p-5 fade-up space-y-3">

      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-800 text-slate-800 leading-snug">{resource.title}</h3>
        <span className={`type-badge ${tc.cls} shrink-0`}>{tc.emoji} {tc.label}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500 font-600 line-clamp-2">
        {resource.description || "No description provided."}
      </p>

      {/* Tags */}
      {resource.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {resource.tags.map((tag, i) => (
            <span key={i} className="tag-pill">#{tag}</span>
          ))}
        </div>
      )}

      {/* Bottom */}
      <div className="flex items-center justify-between pt-1 border-t border-purple-50">

        <a
          href={resource.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-800 transition-all hover:scale-105"
          style={{color: "#7c3aed"}}
        >
          <FileText size={15} />
          View PDF
        </a>

        <button
          onClick={handleUpvote}
          disabled={loading || upvoted}
          className="flex items-center gap-1.5 text-sm font-800 px-3 py-1.5 rounded-xl transition-all hover:scale-105"
          style={{
            background: upvoted ? "linear-gradient(135deg, #c4b5fd, #f9a8d4)" : "rgba(196,181,253,0.15)",
            color: upvoted ? "white" : "#7c3aed"
          }}
        >
          <ThumbsUp size={14} />
          {upvotes}
        </button>

      </div>
    </div>
  );
}