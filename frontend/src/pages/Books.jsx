import { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Books = () => {
  const [books, setBooks] = useState([
    { id: 1, title: "The Alchemist", author: "Paulo Coelho", status: "Available" },
    { id: 2, title: "Atomic Habits", author: "James Clear", status: "Borrowed" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", author: "", status: "Available" });

  const handleAddBook = () => {
    setBooks([...books, { id: books.length + 1, ...form }]);
    setForm({ title: "", author: "", status: "Available" });
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Books</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add Book
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded shadow">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th className="text-left p-3">#</th>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Author</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b border-gray-700">
                <td className="p-3">{book.id}</td>
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      book.status === "Available"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
                <td className="p-3 flex gap-3">
                  <button className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
                  <button className="text-red-500 hover:text-red-700"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 mb-3 border rounded dark:bg-gray-800"
            />
            <input
              type="text"
              placeholder="Author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="w-full p-2 mb-3 border rounded dark:bg-gray-800"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-3 py-2">Cancel</button>
              <button
                onClick={handleAddBook}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
