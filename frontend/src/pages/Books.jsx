import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const API_BASE = "http://localhost:5000/api";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", author: "", subject: "", status: "Available" });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_BASE}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async () => {
    if (!form.title || !form.author || !form.subject) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await axios.post(`${API_BASE}/books`, form);
      fetchBooks();
      setForm({ title: "", author: "", subject: "", status: "Available" });
      setShowModal(false);
    } catch (error) {
      alert("Error adding book");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading books...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Books</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FaPlus /> Add Book
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded shadow">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Author</th>
              <th className="text-left p-3">Subject</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b border-gray-700">
                <td className="p-3 font-semibold">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-100">
                    {book.subject}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-sm rounded ${book.status === "Available"
                        ? "bg-green-200 text-green-800"
                        : book.status === "Borrowed"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                  >
                    {book.status}
                  </span>
                </td>
                <td className="p-3 flex gap-3 text-lg">
                  <button className="text-blue-500 hover:text-blue-700"><FaEdit /></button>
                  <button className="text-red-500 hover:text-red-700"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96 border dark:border-gray-800">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Add New Book</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <input
                type="text"
                placeholder="Author"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <input
                type="text"
                placeholder="Subject (e.g. Mathematics)"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBook}
                className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
              >
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
