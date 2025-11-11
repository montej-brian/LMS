import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Students from "./pages/Students";
import BorrowReturn from "./pages/BorrowReturn";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="flex bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white min-h-screen">
        <Sidebar />
        <div className="ml-60 flex-1 p-6">
          <div className="flex justify-end mb-4">
            <ThemeSwitcher />
          </div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
            <Route path="/students" element={<Students />} />
            <Route path="/borrow" element={<BorrowReturn />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
