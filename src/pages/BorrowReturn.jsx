import { useState } from "react";

const BorrowReturn = () => {
  const [records, setRecords] = useState([
    {
      id: 1,
      studentName: "Brian Chacha",
      studentForm: "Form 4",
      studentStream: "East",
      admissionNumber: "S2020/001",
      bookTitle: "The Alchemist",
      status: "Borrowed",
    },
  ]);

  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentForm, setNewStudentForm] = useState("");
  const [newStudentStream, setNewStudentStream] = useState("");
  const [newAdmissionNumber, setNewAdmissionNumber] = useState("");
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newStatus, setNewStatus] = useState("Borrowed"); // Default to Borrowed

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

    const newId = records.length > 0 ? Math.max(...records.map((r) => r.id)) + 1 : 1;
    const newRecord = {
      id: newId,
      studentName: newStudentName,
      studentForm: newStudentForm,
      studentStream: newStudentStream,
      admissionNumber: newAdmissionNumber,
      bookTitle: newBookTitle,
      status: newStatus,
    };

    setRecords([...records, newRecord]);
    // Clear form fields
    setNewStudentName("");
    setNewStudentForm("");
    setNewStudentStream("");
    setNewAdmissionNumber("");
    setNewBookTitle("");
    setNewStatus("Borrowed");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Borrow / Return</h1>

      {/* Add New Record Form */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Record</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Student Name</label>
            <input type="text" id="studentName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="studentForm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Form (Class)</label>
            <input type="text" id="studentForm" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={newStudentForm} onChange={(e) => setNewStudentForm(e.target.value)} />
          </div>
          <div>
            <label htmlFor="studentStream" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stream</label>
            <input type="text" id="studentStream" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={newStudentStream} onChange={(e) => setNewStudentStream(e.target.value)} />
          </div>
          <div>
            <label htmlFor="admissionNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Admission Number</label>
            <input type="text" id="admissionNumber" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={newAdmissionNumber} onChange={(e) => setNewAdmissionNumber(e.target.value)} />
          </div>
          <div>
            <label htmlFor="bookTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Book Title</label>
            <input type="text" id="bookTitle" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={newBookTitle} onChange={(e) => setNewBookTitle(e.target.value)} />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Activity</label>
            <select id="status" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
              <option value="Borrowed">Borrowed</option>
              <option value="Returned">Returned</option>
            </select>
          </div>
        </div>
        <button onClick={handleAddRecord} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Record
        </button>
      </div>

      {/* Records Table */}
      <table className="min-w-full bg-white dark:bg-gray-900 rounded shadow">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Student Name</th>
            <th className="p-3 text-left">Form</th>
            <th className="p-3 text-left">Stream</th>
            <th className="p-3 text-left">Admission No.</th>
            <th className="p-3 text-left">Book Title</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id} className="border-b border-gray-700">
              <td className="p-3">{r.id}</td>
              <td className="p-3">{r.studentName}</td>
              <td className="p-3">{r.studentForm}</td>
              <td className="p-3">{r.studentStream}</td>
              <td className="p-3">{r.admissionNumber}</td>
              <td className="p-3">{r.bookTitle}</td>
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
