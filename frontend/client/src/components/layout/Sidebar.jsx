// import { NavLink } from "react-router-dom";
// import { LayoutDashboard, Upload, LogIn } from "lucide-react";

// export default function Sidebar() {
//   return (
//     <aside className="w-64 h-screen bg-white border-r border-slate-200 p-6 hidden md:block">
      
//       <h1 className="text-xl font-semibold tracking-tight mb-10">
//         ResourceBox
//       </h1>

//       <nav className="flex flex-col gap-5 text-sm">
        
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             `flex items-center gap-3 ${
//               isActive ? "text-indigo-600" : "text-slate-600"
//             } hover:text-indigo-600 transition`
//           }
//         >
//           <LayoutDashboard size={18} />
//           Dashboard
//         </NavLink>

//         <NavLink
//           to="/upload"
//           className={({ isActive }) =>
//             `flex items-center gap-3 ${
//               isActive ? "text-indigo-600" : "text-slate-600"
//             } hover:text-indigo-600 transition`
//           }
//         >
//           <Upload size={18} />
//           Upload
//         </NavLink>

//         <NavLink
//           to="/login"
//           className={({ isActive }) =>
//             `flex items-center gap-3 ${
//               isActive ? "text-indigo-600" : "text-slate-600"
//             } hover:text-indigo-600 transition`
//           }
//         >
//           <LogIn size={18} />
//           Login
//         </NavLink>

//       </nav>
//     </aside>
//   );
// }

import { NavLink } from "react-router-dom";
import { LayoutDashboard, Upload, LogIn } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen p-6 flex flex-col shrink-0" style={{background: "rgba(245, 231, 244, 0.6)", backdropFilter: "blur(20px)", borderRight: "1.5px solid rgba(255,255,255,0.9)"}}>

      <div className="mb-10">
        <div className="flex items-center gap-2">
          {/* <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm" style={{background: "linear-gradient(135deg, #c4b5fd, #f9a8d4)"}}>R</div> */}
          <h1 className="text-lg font-black tracking-tight text-slate-800">
            ResourceBox
          </h1>
        </div>
        <p className="text-xs font-600 text-black-800 mt-1 ml-10">Your Study Hub </p>
      </div>

      <nav className="flex flex-col gap-2">
        {[
          { to: "/", icon: <LayoutDashboard size={17}/>, label: "Dashboard" },
          { to: "/upload", icon: <Upload size={17}/>, label: "Upload" },
          { to: "/login", icon: <LogIn size={17}/>, label: "Login" },
        ].map(({ to, icon, label, emoji }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-700 transition-all ${
                isActive
                  ? "text-purple-700 font-800"
                  : "text-slate-500 hover:text-purple-600"
              }`
            }
            style={({ isActive }) => isActive ? {background: "linear-gradient(135deg, #ede9fe, #fce7f3)"} : {}}
          >
            <span>{icon}</span>
            <span className="font-bold">{label}</span>
            <span className="ml-auto text-base">{emoji}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="rounded-2xl p-4 text-center" style={{background: "linear-gradient(135deg, #f1f0f0, #f3f0ff)"}}>
          <div className="text-2xl mb-1">📚</div>
          <p className="text-xs font-800 text-purple-700">Share knowledge,</p>
          <p className="text-xs font-800 text-pink-600">grow together!</p>
        </div>
      </div>

    </aside>
  );
}