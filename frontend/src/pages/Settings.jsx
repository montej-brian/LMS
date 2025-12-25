import { useState, useEffect } from "react";
import axios from "axios";
import { FaSave } from "react-icons/fa";

const API_BASE = "http://localhost:5000/api";

const Settings = () => {
  const [schoolName, setSchoolName] = useState("Mwalimu Library");
  const [penaltyRate, setPenaltyRate] = useState(5);
  const [loanDuration, setLoanDuration] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${API_BASE}/settings`);
        if (response.data) {
          setSchoolName(response.data.schoolName || "Mwalimu Library");
          setPenaltyRate(response.data.penaltyRate);
          setLoanDuration(response.data.loanDuration);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSaveSettings = async () => {
    try {
      await axios.post(`${API_BASE}/settings`, {
        schoolName,
        penaltyRate: Number(penaltyRate),
        loanDuration: Number(loanDuration)
      });
      alert("Settings saved successfully!");
    } catch (error) {
      alert("Error saving settings");
    }
  };

  if (loading) return <div className="p-6">Loading settings...</div>;

  return (
    <div className="max-w-lg mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Settings</h1>

      {/* Admin Profile Section */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">Admin Profile</h2>
        <p className="mb-2 dark:text-gray-400">Name: Brian Chacha</p>
        <p className="mb-2 dark:text-gray-400">Role: System Administrator</p>
        <p className="mb-2 dark:text-gray-400">Email: chachabrian21@gmail.com</p>
        <div className="mb-2">
          <label htmlFor="schoolName" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            School Name:
          </label>
          <input
            type="text" id="schoolName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)} />
        </div>
      </div>

      {/* Library Rules Section */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">Library Rules & Penalties</h2>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Daily Penalty Rate (KES)
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
            value={penaltyRate}
            onChange={(e) => setPenaltyRate(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">Amount charged per day after due date.</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Loan Duration (Days)
          </label>
          <input
            type="number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
            value={loanDuration}
            onChange={(e) => setLoanDuration(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">Default number of days a student can keep a book.</p>
        </div>
        <button
          onClick={handleSaveSettings}
          className="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700 flex items-center gap-2"
        >
          <FaSave /> Save Rules
        </button>
      </div>

      {/* Data Management Section */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">Data Management</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Sync your institution's data with the backend database.
        </p>
        <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Sync Data
        </button>
      </div>
    </div>
  );
};

export default Settings;
