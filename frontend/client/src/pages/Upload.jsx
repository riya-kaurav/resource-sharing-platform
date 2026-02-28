// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../services/axios";
// import AppLayout from "../components/layout/AppLayout";

// export default function Upload() {

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [type, setType] = useState("");
//   const [tags, setTags] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       alert("Please select a PDF file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("type", type);
//     formData.append("tags", tags);
//     formData.append("pdf", file); 

//     try {
//       setLoading(true);

//       await axios.post("/resources", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data"
//         }
//       });

//       alert("Resource uploaded successfully !");
//       navigate("/");

//     } catch (error) {
//       alert(error.response?.data?.message || "Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AppLayout>
//       <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">

//         <h2 className="text-2xl font-semibold mb-6">
//           Upload Resource
//         </h2>

//         <form className="space-y-5" onSubmit={handleSubmit}>

//           <input
//             type="text"
//             placeholder="Title"
//             className="w-full border border-slate-300 rounded-lg px-4 py-2"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />

//           <textarea
//             placeholder="Description"
//             className="w-full border border-slate-300 rounded-lg px-4 py-2"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />


//           <select
//   className="w-full border border-slate-300 rounded-lg px-4 py-2"
//   value={type}
//   onChange={(e) => setType(e.target.value)}
//   required
// >
//   <option value="">Select Type</option>
//   <option value="notes">Notes</option>
//   <option value="pyqs">PYQs</option>
//   <option value="coding">Coding</option>
//   <option value="interview">Interview</option>
// </select>

//           <input
//             type="text"
//             placeholder="Tags (comma separated)"
//             className="w-full border border-slate-300 rounded-lg px-4 py-2"
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//           />

//           <input
//             type="file"
//             accept="application/pdf"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="w-full"
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium"
//           >
//             {loading ? "Uploading..." : "Upload"}
//           </button>

//         </form>

//       </div>
//     </AppLayout>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axios";
import AppLayout from "../components/layout/AppLayout";
import { Upload as UploadIcon } from "lucide-react";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { alert("Please select a PDF file "); return; }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("tags", tags);
    formData.append("pdf", file);
    try {
      setLoading(true);
      await axios.post("/resources", formData, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Resource uploaded! 🎉");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto fade-up">

        {/* Header */}
        <div className="genz-card p-6 mb-6" style={{background: "linear-gradient(135deg, rgba(237,233,254,0.8), rgba(252,231,243,0.8))"}}>
          <h2 className="text-2xl font-black text-slate-800">Upload Resource </h2>
          <p className="text-sm text-slate-500 font-600 mt-1">Share your notes, PYQs or anything useful!</p>
        </div>

        <div className="genz-card p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>

            <div>
              <label className="block text-sm font-800 text-slate-600 mb-2">Title </label>
              <input type="text" placeholder="e.g. Operating System Notes" required
                value={title} onChange={(e) => setTitle(e.target.value)} className="genz-input" />
            </div>

            <div>
              <label className="block text-sm font-800 text-slate-600 mb-2">Description 📝</label>
              <textarea placeholder="What's inside this resource?"
                value={description} onChange={(e) => setDescription(e.target.value)}
                className="genz-input resize-none" rows={3} />
            </div>

            <div>
              <label className="block text-sm font-800 text-slate-600 mb-2">Type </label>
              <select required value={type} onChange={(e) => setType(e.target.value)} className="genz-input">
                <option value="">Select a type...</option>
                <option value="notes"> Notes</option>
                <option value="pyqs">PYQs</option>
                <option value="coding"> Coding</option>
                <option value="interview"> Interview</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-800 text-slate-600 mb-2">Tags  <span className="text-slate-400 font-600">(comma separated)</span></label>
              <input type="text" placeholder="e.g. OS, GATE, Semester 4"
                value={tags} onChange={(e) => setTags(e.target.value)} className="genz-input" />
            </div>

            <div>
              <label className="block text-sm font-800 text-slate-600 mb-2">PDF File 📄</label>
              <div className="border-2 border-dashed border-purple-200 rounded-2xl p-6 text-center cursor-pointer hover:border-purple-400 transition-all"
                style={{background: "rgba(237,233,254,0.3)"}}>
                <input type="file" accept="application/pdf" required
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden" id="pdf-upload" />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  <div className="text-3xl mb-2">{file ? "✅" : "📂"}</div>
                  <p className="text-sm font-800 text-purple-600">
                    {file ? file.name : "Click to choose PDF"}
                  </p>
                  <p className="text-xs text-slate-400 font-600 mt-1">Max 10MB</p>
                </label>
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" disabled={loading} className="genz-btn flex items-center justify-center gap-2">
                <UploadIcon size={16} />
                {loading ? "Uploading... " : "Upload Resource "}
              </button>
            </div>

          </form>
        </div>
      </div>
    </AppLayout>
  );
}