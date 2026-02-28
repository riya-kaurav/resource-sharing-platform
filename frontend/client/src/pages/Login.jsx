// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "../services/axios";
// import AuthLayout from "../components/layout/AuthLayout";

// export default function Login() {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("/auth/login", {
//         email,
//         password
//       });

//       const token = res.data.data.accessToken;

//       localStorage.setItem("token", token);

//       navigate("/");

//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <AuthLayout>
//       <h2 className="text-2xl font-semibold mb-6 text-center">
//         Login to ResourceBox
//       </h2>

//       <form className="space-y-5" onSubmit={handleSubmit}>

//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium"
//         >
//           Login
//         </button>

//       </form>

//       <p className="text-sm text-slate-500 text-center mt-6">
//         Don't have an account?{" "}
//         <Link to="/register" className="text-indigo-600 hover:underline">
//           Register
//         </Link>
//       </p>
//     </AuthLayout>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../services/axios";
import AuthLayout from "../components/layout/AuthLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/auth/login", { email, password });
      const token = res.data.data.accessToken;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-black mb-1 text-slate-800">Welcome back! </h2>
      <p className="text-sm text-slate-400 font-600 mb-6">Log in to access your resources</p>

      <form className="space-y-4" onSubmit={handleSubmit}>

        <div>
          <label className="block text-sm font-800 text-slate-600 mb-2">Email </label>
          <input
            type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="genz-input"
          />
        </div>

        <div>
          <label className="block text-sm font-800 text-slate-600 mb-2">Password </label>
          <input
            type="password" required value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="genz-input"
          />
        </div>

        <div className="pt-2">
          <button type="submit" disabled={loading} className="genz-btn">
            {loading ? "Logging in... " : "Login →"}
          </button>
        </div>

      </form>

      <p className="text-sm text-slate-400 font-600 text-center mt-5">
        No account?{" "}
        <Link to="/register" className="font-800" style={{color: "#7c3aed"}}>
          Register here 
        </Link>
      </p>
    </AuthLayout>
  );
}