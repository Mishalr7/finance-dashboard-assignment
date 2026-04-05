function Header({ role, setRole, setSidebarOpen, dark, setDark }) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      

      <div className="flex items-center gap-3">
        <button
          className="md:hidden text-xl"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <h1 className="text-xl md:text-2xl font-semibold">
          Dashboard Overview
        </h1>
      </div>


      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        
        {/* DARK MODE BUTTON */}
        <button
          onClick={() => setDark(!dark)}
          className={`px-3 md:px-4 py-2 rounded-lg border transition text-sm md:text-base
          ${
            dark
              ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {dark ? "Light" : "Dark"}
        </button>

        <select
          className={`px-2 md:px-3 py-2 rounded-lg border text-sm md:text-base
          ${
            dark
              ? "bg-gray-800 border-gray-600"
              : "bg-white border-gray-300"
          }`}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
  );
}

export default Header;