const Students = () => {
  const data = [
    { id: 1, name: "Brian Chacha", regNo: "S2020/001", borrowed: 2 },
    { id: 2, name: "Grace Mwangi", regNo: "S2021/002", borrowed: 0 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Students</h1>
      <table className="min-w-full bg-white dark:bg-gray-900 rounded shadow">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Reg No</th>
            <th className="p-3 text-left">Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s) => (
            <tr key={s.id} className="border-b border-gray-700">
              <td className="p-3">{s.id}</td>
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.regNo}</td>
              <td className="p-3">{s.borrowed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
