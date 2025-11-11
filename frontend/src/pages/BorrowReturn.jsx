import { useState } from "react";

const BorrowReturn = () => {
  const [records, setRecords] = useState([
    { id: 1, student: "Brian Chacha", book: "The Alchemist", status: "Borrowed" },
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Borrow / Return</h1>
      <table className="min-w-full bg-white dark:bg-gray-900 rounded shadow">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Student</th>
            <th className="p-3 text-left">Book</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id} className="border-b border-gray-700">
              <td className="p-3">{r.id}</td>
              <td className="p-3">{r.student}</td>
              <td className="p-3">{r.book}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    r.status === "Borrowed"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowReturn;
