import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axios";
import AppLayout from "../components/layout/AppLayout";

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

    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("tags", tags);
    formData.append("pdf", file); // field name must match multer

    try {
      setLoading(true);

      await axios.post("/resource", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Resource uploaded successfully 🎉");
      navigate("/");

    } catch (error) {
      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">

        <h2 className="text-2xl font-semibold mb-6">
          Upload Resource
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Title"
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Type (Notes, PYQ, Book...)"
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="w-full border border-slate-300 rounded-lg px-4 py-2"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

        </form>

      </div>
    </AppLayout>
  );
}