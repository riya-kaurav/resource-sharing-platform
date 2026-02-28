// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";

// export default function AppLayout({ children }) {
//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         <Navbar />

//         <main className="flex-1 p-6 md:p-10">
//           {children}
//         </main>
//       </div>

//     </div>
//   );
// }

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex" style={{
      background: "#fdf4ff",
      backgroundImage: "radial-gradient(at 20% 10%, #fce7f3 0px, transparent 50%), radial-gradient(at 80% 0%, #ede9fe 0px, transparent 50%), radial-gradient(at 0% 60%, #dbeafe 0px, transparent 50%)"
    }}>

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 md:p-10">
          {children}
        </main>
      </div>

    </div>
  );
}