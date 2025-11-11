const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Total Books</h2>
          <p className="text-3xl mt-2">254</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Students</h2>
          <p className="text-3xl mt-2">134</p>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Borrowed Books</h2>
          <p className="text-3xl mt-2">67</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
