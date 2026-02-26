import { NavLink } from "react-router-dom";
import { LayoutDashboard, Upload, LogIn } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 p-6 hidden md:block">
      
      <h1 className="text-xl font-semibold tracking-tight mb-10">
        ResourceBox
      </h1>

      <nav className="flex flex-col gap-5 text-sm">
        
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 ${
              isActive ? "text-indigo-600" : "text-slate-600"
            } hover:text-indigo-600 transition`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `flex items-center gap-3 ${
              isActive ? "text-indigo-600" : "text-slate-600"
            } hover:text-indigo-600 transition`
          }
        >
          <Upload size={18} />
          Upload
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            `flex items-center gap-3 ${
              isActive ? "text-indigo-600" : "text-slate-600"
            } hover:text-indigo-600 transition`
          }
        >
          <LogIn size={18} />
          Login
        </NavLink>

      </nav>
    </aside>
  );
}