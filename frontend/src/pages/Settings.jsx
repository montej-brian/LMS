import { useState } from "react";

const Settings = () => {
  const [schoolName, setSchoolName] = useState("Mwalimu Library");
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      {/* Admin Profile Section */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Admin Profile</h2>
        <p className="mb-2">Name: Brian Chacha</p>
        <p className="mb-2">Role: System Administrator</p>
        <p className="mb-2">Email: chachabrian21@gmail.com</p>
        <div className="mb-2">
          <label htmlFor="schoolName" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            School Name:
          </label>
          <input
            type="text" id="schoolName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-800 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)} />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
          Edit Profile
        </button>
      </div>

      {/* Data Management Section */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Data Management</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Backup your institution's data or recover it in case of application re-installation. Backups are automatically pushed to the database.
        </p>
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Backup/Recover Data
        </button>
      </div>
    </div>
  );
};

export default Settings;
