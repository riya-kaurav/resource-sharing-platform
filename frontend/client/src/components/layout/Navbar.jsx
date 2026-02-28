// import { Menu } from "lucide-react";

// export default function Navbar() {
//   return (
//     <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      
//       <div className="flex items-center gap-3">
//         <Menu className="md:hidden text-slate-600" />
//         <h2 className="text-lg font-medium">
//           ResourceBox
//         </h2>
//       </div>

//       <button
//   onClick={() => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   }}
//   className="text-sm text-slate-600 hover:text-black"
// >
//   Logout
// </button>
//     </header>
//   );
// }

export default function Navbar() {
  const username = localStorage.getItem("username") || "Guest";

  return (
    <header className="h-16 flex items-center justify-between px-6" style={{background: "rgba(255,255,255,0.6)", backdropFilter: "blur(20px)", borderBottom: "1.5px solid rgba(255,255,255,0.9)"}}>

      <div className="flex items-center gap-3">
        <div>
          <p className="text-sm font-800 text-black-700">Hey there! </p>
          <p className="text-xs text-black-400 font-600">What are you studying today?</p>
        </div>
      </div>

      <button
        onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}
        className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-800 transition-all hover:scale-105"
        style={{background: "linear-gradient(135deg, #fce7f3, #ede9fe)", color: "#000001"}}
      >
        Logout 
      </button>

    </header>
  );
}