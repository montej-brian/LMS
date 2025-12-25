import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalStudents: 0,
    borrowedBooks: 0,
    overdueBooks: 0,
    lostBooks: 0, // Need to implement this in stats.js too
    returnedBooks: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stats/summary");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold dark:text-gray-200">Total Books</h2>
          <p className="text-3xl mt-2 font-bold text-blue-600">{stats.totalBooks}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold dark:text-gray-200">Students</h2>
          <p className="text-3xl mt-2 font-bold text-green-600">{stats.totalStudents}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold dark:text-gray-200">Borrowed Books</h2>
          <p className="text-3xl mt-2 font-bold text-yellow-600">{stats.borrowedBooks}</p>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold dark:text-gray-200">Overdue Books</h2>
          <p className="text-3xl mt-2 font-bold text-red-600">{stats.overdueBooks}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
