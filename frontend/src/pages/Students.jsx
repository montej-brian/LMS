import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaUserPlus } from "react-icons/fa";

const API_BASE = "http://localhost:5000/api";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", admissionNumber: "", form: "1", stream: "A" });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async () => {
    if (!form.name || !form.admissionNumber) {
      alert("Please provide name and admission number.");
      return;
    }
    try {
      await axios.post(`${API_BASE}/students`, form);
      fetchStudents();
      setForm({ name: "", admissionNumber: "", form: "1", stream: "A" });
      setShowModal(false);
    } catch (error) {
      alert(error.response?.data?.message || "Error adding student");
    }
  }

  if (loading) return <div className="p-6">Loading students...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Students</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 shadow-md"
        >
          <FaUserPlus /> Register Student
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded shadow">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 border-b dark:border-gray-700">
              <th className="p-3 text-left">Reg No</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Class (Form)</th>
              <th className="p-3 text-left">Stream</th>
              <th className="p-3 text-left">Points</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <td className="p-3 font-mono text-blue-600">{s.admissionNumber}</td>
                <td className="p-3 font-semibold dark:text-gray-200">{s.name}</td>
                <td className="p-3 dark:text-gray-400">{s.form}</td>
                <td className="p-3 dark:text-gray-400">{s.stream}</td>
                <td className="p-3 text-blue-500 font-bold">{s.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-2xl w-[400px] border dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Register New Student</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Brian Chacha"
                  className="w-full p-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Admission Number</label>
                <input
                  type="text"
                  placeholder="e.g. S2023/101"
                  className="w-full p-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.admissionNumber}
                  onChange={e => setForm({ ...form, admissionNumber: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Form/Class</label>
                  <select
                    className="w-full p-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    value={form.form}
                    onChange={e => setForm({ ...form, form: e.target.value })}
                  >
                    <option value="1">Form 1</option>
                    <option value="2">Form 2</option>
                    <option value="3">Form 3</option>
                    <option value="4">Form 4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stream</label>
                  <input
                    type="text"
                    placeholder="e.g. A"
                    className="w-full p-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    value={form.stream}
                    onChange={e => setForm({ ...form, stream: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStudent}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg"
              >
                Save Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
