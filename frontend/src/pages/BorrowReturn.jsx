import { useState, useEffect } from "react";
import { FaMoneyBillWave, FaUndo, FaExclamationTriangle } from "react-icons/fa";

const LOAN_PERIOD_DAYS = 14;
const DAILY_LATE_FEE = 5; // KES

const BorrowReturn = () => {
  const [records, setRecords] = useState([
    {
      id: 1,
      studentName: "Brian Chacha",
      studentForm: "Form 4",
      studentStream: "East",
      admissionNumber: "S2020/001",
      bookTitle: "The Alchemist",
      borrowDate: "2023-10-01",
      dueDate: "2023-10-15",
      returnDate: null,
      status: "Borrowed",
      penalty: 0,
      condition: "Good",
    },
    {
      id: 2,
      studentName: "Jane Doe",
      studentForm: "Form 3",
      studentStream: "West",
      admissionNumber: "S2021/055",
      bookTitle: "Atomic Habits",
      borrowDate: "2023-09-01",
      dueDate: "2023-09-15",
      returnDate: null, // Overdue
      status: "Borrowed",
      penalty: 0,
      condition: "Good",
    }
  ]);

  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentForm, setNewStudentForm] = useState("");
  const [newStudentStream, setNewStudentStream] = useState("");
  const [newAdmissionNumber, setNewAdmissionNumber] = useState("");
  const [newBookTitle, setNewBookTitle] = useState("");

  // Modal State
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [returnCondition, setReturnCondition] = useState("Good");
  const [damageCost, setDamageCost] = useState(0);
  const [calculatedPenalty, setCalculatedPenalty] = useState(0);

  // Calculate today's date in YYYY-MM-DD format
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const calculateDueDate = (dateString, days) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
  };

  const handleAddRecord = () => {
    if (
      !newStudentName ||
      !newStudentForm ||
      !newStudentStream ||
      !newAdmissionNumber ||
      !newBookTitle
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const today = getTodayDate();
    const due = calculateDueDate(today, LOAN_PERIOD_DAYS);
    const newId = records.length > 0 ? Math.max(...records.map((r) => r.id)) + 1 : 1;

    const newRecord = {
      id: newId,
      studentName: newStudentName,
      studentForm: newStudentForm,
      studentStream: newStudentStream,
      admissionNumber: newAdmissionNumber,
      bookTitle: newBookTitle,
      borrowDate: today,
      dueDate: due,
      returnDate: null,
      status: "Borrowed",
      penalty: 0,
      condition: "Good",
    };

    setRecords([...records, newRecord]);
    // Clear form fields
    setNewStudentName("");
    setNewStudentForm("");
    setNewStudentStream("");
    setNewAdmissionNumber("");
    setNewBookTitle("");
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
      penalty += diffDays * DAILY_LATE_FEE;
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
  }, [returnCondition, damageCost, selectedRecord]);


  const confirmReturn = () => {
    if (!selectedRecord) return;

    const updatedRecords = records.map((r) => {
      if (r.id === selectedRecord.id) {
        return {
          ...r,
          returnDate: getTodayDate(),
          status: "Returned",
          condition: returnCondition,
          penalty: calculatedPenalty,
        };
      }
      return r;
    });

    setRecords(updatedRecords);
    setShowReturnModal(false);
    setSelectedRecord(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Borrow / Return</h1>

      {/* Add New Record Form */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">New Borrow Record</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Student Name</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Form (Class)</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={newStudentForm} onChange={(e) => setNewStudentForm(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stream</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={newStudentStream} onChange={(e) => setNewStudentStream(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Admission Number</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={newAdmissionNumber} onChange={(e) => setNewAdmissionNumber(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Book Title</label>
            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={newBookTitle} onChange={(e) => setNewBookTitle(e.target.value)} />
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
                    <p className="font-semibold">{r.studentName}</p>
                    <p className="text-xs text-gray-500">{r.admissionNumber}</p>
                  </td>
                  <td className="p-3">{r.bookTitle}</td>
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
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96 max-w-full">
            <h2 className="text-2xl font-bold mb-4">Return Book</h2>
            <p className="mb-2 text-gray-600 dark:text-gray-400">Student: <span className="font-semibold text-gray-900 dark:text-white">{selectedRecord.studentName}</span></p>
            <p className="mb-4 text-gray-600 dark:text-gray-400">Book: <span className="font-semibold text-gray-900 dark:text-white">{selectedRecord.bookTitle}</span></p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Book Condition</label>
              <select
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
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
                  className="w-full p-2 border border-red-300 rounded focus:ring-red-500 focus:border-red-500"
                  value={damageCost}
                  onChange={(e) => setDamageCost(e.target.value)}
                  placeholder="Enter amount..."
                />
              </div>
            )}

            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded mb-6">
              <h3 className="font-semibold mb-2 dark:text-gray-200">Penalty Calculation</h3>
              <div className="flex justify-between text-sm mb-1">
                <span>Late Fee:</span>
                <span>{Math.max(0, calculatedPenalty - (Number(damageCost) || 0))}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
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
