export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{
      background: "#fdf4ff",
      backgroundImage: "radial-gradient(at 20% 10%, #fce7f3 0px, transparent 50%), radial-gradient(at 80% 0%, #ede9fe 0px, transparent 50%), radial-gradient(at 0% 60%, #dbeafe 0px, transparent 50%)"
    }}>

      {/* floating blobs */}
      <div className="fixed top-10 left-10 w-32 h-32 rounded-full opacity-30 float" style={{background: "linear-gradient(135deg, #f9a8d4, #c4b5fd)", filter: "blur(20px)"}} />
      <div className="fixed bottom-20 right-10 w-40 h-40 rounded-full opacity-20 float" style={{background: "linear-gradient(135deg, #93c5fd, #6ee7b7)", filter: "blur(25px)", animationDelay: "1s"}} />
      <div className="fixed top-1/2 right-1/4 w-20 h-20 rounded-full opacity-25 float" style={{background: "#fde68a", filter: "blur(15px)", animationDelay: "2s"}} />

      <div className="w-full max-w-md relative fade-up">
        {/* logo */}
        <div className="text-center mb-6">
          {/* <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-white text-2xl mb-3 shadow-lg" style={{background: "linear-gradient(135deg, #c4b5fd, #f9a8d4)"}}>
            
          </div> */}
          <h1 className="text-4xl font-black tracking-tight text-black-800">
            ResourceBox
          </h1>
          <p className="text-xl text-slate-700 font-600">your ultimate study hub </p>
        </div>

        <div className="genz-card p-8">
          {children}
        </div>
      </div>

    </div>
  );
}