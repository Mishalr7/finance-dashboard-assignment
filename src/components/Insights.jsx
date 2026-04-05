function Insights({ transactions, dark }) {

  const categoryMap = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      if (!categoryMap[t.category]) {
        categoryMap[t.category] = 0;
      }
      categoryMap[t.category] += t.amount;
    }
  });

  const highestCategory = Object.keys(categoryMap).length
    ? Object.keys(categoryMap).reduce((a, b) =>
        categoryMap[a] > categoryMap[b] ? a : b
      )
    : "N/A";

  const monthly = {};

  transactions.forEach((t) => {
    const month = t.date.slice(0, 7);

    if (!monthly[month]) {
      monthly[month] = { income: 0, expense: 0 };
    }

    if (t.type === "income") {
      monthly[month].income += t.amount;
    } else {
      monthly[month].expense += t.amount;
    }
  });

  const months = Object.keys(monthly);

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") totalIncome += t.amount;
    else totalExpense += t.amount;
  });

  const savings = totalIncome - totalExpense;

  const mostActiveMonth = months.length
    ? months.reduce((a, b) => {
        const totalA = monthly[a].income + monthly[a].expense;
        const totalB = monthly[b].income + monthly[b].expense;
        return totalA > totalB ? a : b;
      })
    : "N/A";

  const expenseRatio =
    totalIncome > 0
      ? ((totalExpense / totalIncome) * 100).toFixed(1)
      : 0;

  return (
    <div
      className={`p-6 rounded-2xl shadow space-y-6 ${
        dark
          ? "bg-white/5 backdrop-blur-md border border-white/10"
          : "bg-white"
      }`}
    >
      <h2 className="text-xl font-semibold">Insights</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <div
          className={`p-4 rounded-xl ${
            dark ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <p className="text-sm opacity-70">Highest Spending</p>
          <p className="font-semibold text-red-500">
            {highestCategory} (₹{categoryMap[highestCategory] || 0})
          </p>
        </div>

        <div
          className={`p-4 rounded-xl ${
            dark ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <p className="text-sm opacity-70">Net Savings</p>
          <p
            className={`font-semibold ${
              savings >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            ₹{savings}
          </p>
        </div>

        <div
          className={`p-4 rounded-xl ${
            dark ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <p className="text-sm opacity-70">Expense Ratio</p>
          <p className="font-semibold">{expenseRatio}%</p>
        </div>
      </div>


      <div>
        <h3 className="text-lg font-medium mb-3">
          Monthly Breakdown
        </h3>

        <div className="space-y-2">
          {months.map((m) => (
            <div
              key={m}
              className={`p-3 rounded-lg flex justify-between items-center ${
                dark ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <p className="font-medium">{m}</p>

              <div className="flex gap-6 text-sm">
                <span className="text-green-500">
                  Income: ₹{monthly[m].income}
                </span>
                <span className="text-red-500">
                  Expense: ₹{monthly[m].expense}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm opacity-70">Most Active Month</p>
        <p className="font-semibold">{mostActiveMonth}</p>
      </div>
    </div>
  );
}

export default Insights;