import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

function ChartsSection({ transactions, dark }) {
  const grouped = {};

  transactions.forEach((t) => {
    if (!grouped[t.date]) {
      grouped[t.date] = {
        date: t.date,
        income: 0,
        expense: 0,
      };
    }

    if (t.type === "income") {
      grouped[t.date].income += t.amount;
    } else {
      grouped[t.date].expense += t.amount;
    }
  });

  const chartData = Object.values(grouped).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

const categoryMap = {};

transactions.forEach((t) => {
  if (t.type === "expense") {
    if (!categoryMap[t.category]) {
      categoryMap[t.category] = 0;
    }
    categoryMap[t.category] += t.amount;
  }
});

const categoryData = Object.keys(categoryMap).map((key) => ({
  category: key,
  amount: categoryMap[key],
}));

  // CUSTOM TOOLTIP
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;

    const unique = {};
    payload.forEach((p) => {
      unique[p.dataKey] = p.value;
    });

    return (
      <div
        className={`p-3 rounded-lg shadow ${
          dark ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <p className="mb-2 font-medium">Date: {label}</p>
        <p className="text-green-500">Income: ₹{unique.income || 0}</p>
        <p className="text-red-500">Expense: ₹{unique.expense || 0}</p>
      </div>
    );
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow transition ${
        dark
          ? "bg-white/5 backdrop-blur-md border border-white/10"
          : "bg-white"
      }`}
    >
      {/* CHART 1*/}
      <h2 className="text-lg font-semibold mb-4">
        Income vs Expense Trend
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={chartData}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke={dark ? "#374151" : "#e5e7eb"}
          />

          <XAxis dataKey="date" stroke={dark ? "#9ca3af" : "#374151"} />
          <YAxis stroke={dark ? "#9ca3af" : "#374151"} />

          <Tooltip content={<CustomTooltip />} />
          <Legend />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            fill="url(#incomeGradient)"
            legendType="none"
          />

          <Area
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            fill="url(#expenseGradient)"
            legendType="none"
          />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 4 }}
            name="Income"
          />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 4 }}
            name="Expense"
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* CHART 2 */}
      <h2 className="text-lg font-semibold mt-8 mb-4">
        Spending by Category
      </h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={categoryData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={dark ? "#374151" : "#e5e7eb"}
          />

          <XAxis dataKey="category" stroke={dark ? "#9ca3af" : "#374151"} />
          <YAxis stroke={dark ? "#9ca3af" : "#374151"} />

          <Tooltip />

          <Bar
            dataKey="amount"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartsSection;