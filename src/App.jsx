import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardCards from "./components/DashboardCards";
import ChartsSection from "./components/ChartsSection";
import TransactionsTable from "./components/TransactionsTable";
import Insights from "./components/Insights";
import data from "./data/data.js";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : data;
  });

  const [role, setRole] = useState("viewer");
  const [active, setActive] = useState("dashboard");
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(dark));
  }, [dark]);

  return (
<div className={`flex h-screen overflow-hidden ${
  dark
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "bg-gray-50 text-black"
}`}>
      {/* Sidebar */}
      <Sidebar
        active={active}
        setActive={setActive}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        dark={dark}
      />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 space-y-6 overflow-x-hidden">
        <Header
          role={role}
          setRole={setRole}
          dark={dark}
          setDark={setDark}
          setSidebarOpen={setSidebarOpen}
        />

        {active === "dashboard" && (
          <>
            <DashboardCards transactions={transactions} dark={dark} />
            <ChartsSection transactions={transactions} dark={dark} />
          </>
        )}

        {active === "transactions" && (
          <TransactionsTable
            transactions={transactions}
            setTransactions={setTransactions}
            role={role}
            dark={dark}
          />
        )}

        {active === "insights" && (
          <Insights transactions={transactions} dark={dark} />
        )}
      </div>
    </div>
  );
}

export default App;