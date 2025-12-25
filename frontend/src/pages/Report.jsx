import { FaFilePdf, FaEye } from "react-icons/fa";

const Report = () => {
  const reports = [
    { id: 1, title: "All Books Report", description: "A complete list of all books in the library." },
    { id: 2, title: "Borrowed Books Report", description: "List of all currently borrowed books." },
    { id: 2, title: "Returned Books Report", description: "List of all currently returned books." },
    { id: 3, title: "Overdue Books Report", description: "List of all books that are overdue." },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{report.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{report.description}</p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                <FaEye /> View
              </button>
              <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                <FaFilePdf /> Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;