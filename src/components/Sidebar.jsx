import { useEffect } from "react";

function Sidebar({ active, setActive, sidebarOpen, setSidebarOpen, dark }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:relative z-50
          top-0 left-0
          h-screen w-60 p-5
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${
            dark
              ? "bg-[#0f172a] border-r border-gray-800"
              : "bg-white shadow"
          }
        `}
      >
        <h2 className="text-lg font-semibold mb-6">Finance</h2>

        <ul className="space-y-3">
          {["dashboard", "transactions", "insights"].map((item) => (
            <li
              key={item}
              onClick={() => {
                setActive(item);
                setSidebarOpen(false);
              }}
              className={`cursor-pointer p-2 rounded-lg capitalize transition
              ${
                active === item
                  ? dark
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;