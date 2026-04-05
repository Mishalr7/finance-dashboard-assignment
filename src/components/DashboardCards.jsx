function DashboardCards({ transactions, dark }) {

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="grid md:grid-cols-3 gap-6">

      <div className={`
  p-5 rounded-2xl shadow transition
  ${dark
    ? "bg-white/5 backdrop-blur-md border border-white/10"
    : "bg-white"}
`}>
        <p className="text-gray-500">Total Balance</p>
        <h2 className="text-2xl font-semibold mt-2">₹{income - expense}</h2>
      </div>

      <div className={`
  p-5 rounded-2xl shadow transition
  ${dark
    ? "bg-white/5 backdrop-blur-md border border-white/10"
    : "bg-white"}
`}>
        <p className="text-gray-500">Income</p>
        <h2 className="text-green-600 text-2xl font-semibold mt-2">₹{income}</h2>
      </div>

      <div className={`
  p-5 rounded-2xl shadow transition
  ${dark
    ? "bg-white/5 backdrop-blur-md border border-white/10"
    : "bg-white"}
`}>
        <p className="text-gray-500">Expenses</p>
        <h2 className="text-red-500 text-2xl font-semibold mt-2">₹{expense}</h2>
      </div>

    </div>
  );
}

export default DashboardCards;