import { useState } from "react";

function TransactionsTable({
  transactions,
  setTransactions,
  role,
  dark,
}) {
  const [search, setSearch] = useState("");

  // delete function
  const handleDelete = (index) => {
    const updated = transactions.filter((_, i) => i !== index);
    setTransactions(updated);
  };

  //  add function
  const handleAdd = () => {
    const amount = prompt("Enter amount:");
    const category = prompt("Enter category:");
    const type = prompt("income or expense:");

    if (!amount || !category || !type) return;

    const newTx = {
      date: new Date().toISOString().split("T")[0],
      amount: Number(amount),
      category,
      type: type.toLowerCase(),
    };

    setTransactions([...transactions, newTx]);
  };

  // search filter
  const filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`p-6 rounded-2xl shadow transition ${
        dark
          ? "bg-white/5 backdrop-blur-md border border-white/10"
          : "bg-white"
      }`}
    >
      {/* Header */}
      <h2 className="text-lg font-semibold mb-4">Transactions</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`w-full p-2 mb-4 rounded-lg border outline-none ${
          dark
            ? "bg-gray-900 border-gray-700 text-white"
            : "bg-white border-gray-300"
        }`}
      />

      {/* Add Button for admin */}
      {role === "admin" && (
        <button
          onClick={handleAdd}
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Transaction
        </button>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              {role === "admin" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {filtered.map((t, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{t.date}</td>
                <td>₹{t.amount}</td>
                <td>{t.category}</td>
                <td
                  className={
                    t.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {t.type}
                </td>

                {/* Delete for admin */}
                {role === "admin" && (
                  <td>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>


        {filtered.length === 0 && (
          <p className="text-center mt-4 opacity-70">
            No transactions found
          </p>
        )}
      </div>
    </div>
  );
}

export default TransactionsTable;