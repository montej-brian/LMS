const Profile = () => {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Profile</h1>
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Brian Chacha</h2>
        <p className="mb-2">Role: System Administrator</p>
        <p className="mb-2">Email: chachabrian21@gmail.com</p>
        <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
