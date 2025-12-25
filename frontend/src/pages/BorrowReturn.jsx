
import { useState, useEffect } from "react";
import axios from "axios";
import { FaMoneyBillWave, FaUndo, FaExclamationTriangle } from "react-icons/fa";

const API_BASE = "http://localhost:5000/api";

const BorrowReturn = () => {
  // Configurable Rules State
  const [loanPeriodDays, setLoanPeriodDays] = useState(5);
  const [dailyLateFee, setDailyLateFee] = useState(5);

  const [records, setRecords] = useState([]);
  const [books, setBooks] = useState([]);

  const [newStudentAdmission, setNewStudentAdmission] = useState("");
  const [newBookId, setNewBookId] = useState("");

  // Determine today's date for default input
  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const [newBorrowDate, setNewBorrowDate] = useState(getTodayDate());

  // Modal State
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [returnCondition, setReturnCondition] = useState("Good");
  const [damageCost, setDamageCost] = useState(0);
  const [calculatedPenalty, setCalculatedPenalty] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [transRes, bookRes, settingsRes] = await Promise.all([
        axios.get(`${API_BASE}/transactions`),
        axios.get(`${API_BASE}/books`),
        axios.get(`${API_BASE}/settings`)
      ]);
      setRecords(transRes.data);
      setBooks(bookRes.data.filter(b => b.status === 'Available'));
      setLoanPeriodDays(settingsRes.data.loanDuration);
      setDailyLateFee(settingsRes.data.penaltyRate);
    } catch (error) {
      console.error("Error fetching borrow data:", error);
    }
  };

  const calculateDueDate = (dateString, days) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
  };

  const handleAddRecord = async () => {
    if (!newStudentAdmission || !newBookId || !newBorrowDate) {
      alert("Please enter student admission number and select a book.");
      return;
    }

    const due = calculateDueDate(newBorrowDate, loanPeriodDays);

    try {
      await axios.post(`${API_BASE}/transactions/borrow`, {
        studentAdmission: newStudentAdmission,
        bookId: newBookId,
        borrowDate: newBorrowDate,
        dueDate: due
      });
      fetchData(); // Refresh
      setNewStudentAdmission("");
      setNewBookId("");
      setNewBorrowDate(getTodayDate());
    } catch (error) {
      alert(error.response?.data?.message || "Error issuing book");
    }
  };

  const openReturnModal = (record) => {
    setSelectedRecord(record);
    setReturnCondition("Good");
    setDamageCost(0);
    calculatePenaltyPreview(record, "Good", 0);
    setShowReturnModal(true);
  };

  const calculatePenaltyPreview = (record, condition, cost) => {
    const today = new Date();
    const due = new Date(record.dueDate);
    let penalty = 0;

    // 1. Late Fee
    if (today > due) {
      const diffTime = Math.abs(today - due);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      penalty += diffDays * dailyLateFee;
    }

    // 2. Condition Fee
    if (condition === "Lost" || condition === "Torn") {
      penalty += Number(cost);
    }

    setCalculatedPenalty(penalty);
  };

  useEffect(() => {
    if (selectedRecord) {
      calculatePenaltyPreview(selectedRecord, returnCondition, damageCost);
    }
  }, [returnCondition, damageCost, selectedRecord, dailyLateFee]);


  const confirmReturn = async () => {
    if (!selectedRecord) return;

    try {
      await axios.post(`${API_BASE}/transactions/return`, {
        transactionId: selectedRecord.id,
        returnDate: getTodayDate(),
        penalty: calculatedPenalty,
        condition: returnCondition
      });
      fetchData();
      setShowReturnModal(false);
      setSelectedRecord(null);
    } catch (error) {
      alert("Error returning book");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Borrow / Return</h1>

      {/* Add New Record Form */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">New Borrow Record</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Student Admission No.</label>
            <input
              type="text"
              placeholder="e.g. S2020/001"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={newStudentAdmission}
              onChange={(e) => setNewStudentAdmission(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Book</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={newBookId}
              onChange={(e) => setNewBookId(e.target.value)}
            >
              <option value="">-- Choose Available Book --</option>
              {books.map(b => (
                <option key={b.id} value={b.id}>{b.title} ({b.author})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Borrow Date</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={newBorrowDate}
              onChange={(e) => setNewBorrowDate(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
              Due Date: {calculateDueDate(newBorrowDate, loanPeriodDays)} ({loanPeriodDays} days)
            </p>
          </div>
        </div>
        <button onClick={handleAddRecord} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Issue Book
        </button>
      </div>

      {/* Records Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded shadow">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Book</th>
              <th className="p-3 text-left">Borrowed</th>
              <th className="p-3 text-left">Due Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Penalty (KES)</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => {
              const isOverdue = r.status === 'Borrowed' && new Date() > new Date(r.dueDate);
              return (
                <tr key={r.id} className="border-b border-gray-700">
                  <td className="p-3">
                    <p className="font-semibold">{r.Student?.name || "Unknown"}</p>
                    <p className="text-xs text-gray-500">{r.Student?.admissionNumber}</p>
                  </td>
                  <td className="p-3">{r.Book?.title}</td>
                  <td className="p-3">{r.borrowDate}</td>
                  <td className={`p-3 ${isOverdue ? "text-red-500 font-bold" : ""}`}>
                    {r.dueDate}
                    {isOverdue && <span className="block text-xs">Overdue</span>}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-sm rounded ${r.status === "Borrowed"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                        }`}
                    >
                      {r.status}
                    </span>
                    {r.status === 'Returned' && r.condition !== 'Good' && (
                      <span className="ml-2 text-xs bg-red-100 text-red-800 px-1 rounded">{r.condition}</span>
                    )}
                  </td>
                  <td className="p-3 font-mono">
                    {r.penalty > 0 ? (
                      <span className="text-red-600 font-bold flex items-center gap-1">
                        <FaMoneyBillWave /> {r.penalty}
                      </span>
                    ) : (
                      <span className="text-green-600">0</span>
                    )}
                  </td>
                  <td className="p-3">
                    {r.status === "Borrowed" && (
                      <button
                        onClick={() => openReturnModal(r)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center gap-1"
                      >
                        <FaUndo /> Return
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Return Modal */}
      {showReturnModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96 max-w-full shadow-2xl border dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Return Book</h2>
            <p className="mb-2 text-gray-600 dark:text-gray-400">Student: <span className="font-semibold text-gray-900 dark:text-white">{selectedRecord.Student?.name}</span></p>
            <p className="mb-4 text-gray-600 dark:text-gray-400">Book: <span className="font-semibold text-gray-900 dark:text-white">{selectedRecord.Book?.title}</span></p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Book Condition</label>
              <select
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={returnCondition}
                onChange={(e) => setReturnCondition(e.target.value)}
              >
                <option value="Good">Good</option>
                <option value="Torn">Torn / Damaged</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            {(returnCondition === "Torn" || returnCondition === "Lost") && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-red-600">
                  {returnCondition === "Lost" ? "Book Price (Replacement)" : "Repair Cost"}
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-red-300 rounded focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white"
                  value={damageCost}
                  onChange={(e) => setDamageCost(e.target.value)}
                  placeholder="Enter amount..."
                />
              </div>
            )}

            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded mb-6">
              <h3 className="font-semibold mb-2 dark:text-gray-200">Penalty Calculation</h3>
              <div className="flex justify-between text-sm mb-1 dark:text-gray-400">
                <span>Late Fee:</span>
                <span>{Math.max(0, calculatedPenalty - (Number(damageCost) || 0))}</span>
              </div>
              <div className="flex justify-between text-sm mb-1 dark:text-gray-400">
                <span>Damage/Lost Fee:</span>
                <span>{Number(damageCost) || 0}</span>
              </div>
              <div className="border-t border-gray-300 dark:border-gray-700 my-2"></div>
              <div className="flex justify-between font-bold text-lg text-red-600">
                <span>Total Penalty:</span>
                <span>KES {calculatedPenalty}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowReturnModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmReturn}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Confirm Return
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BorrowReturn;


