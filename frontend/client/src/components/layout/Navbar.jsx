import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      
      <div className="flex items-center gap-3">
        <Menu className="md:hidden text-slate-600" />
        <h2 className="text-lg font-medium">
          ResourceBox
        </h2>
      </div>

      <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
  className="text-sm text-slate-600 hover:text-black"
>
  Logout
</button>
    </header>
  );
}