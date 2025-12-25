import { NavLink } from "react-router-dom";
import { FaBook, FaUserGraduate, FaExchangeAlt, FaChartPie, FaUserCog, FaFileAlt, FaChartLine, FaMedal } from "react-icons/fa";
import { useState } from 'react';

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-60 bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold text-center border-b border-gray-700"> LMS</div>
      <nav className="flex-1 p-4 space-y-4">
        <NavLink to="/" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <FaChartPie /> Dashboard
        </NavLink>
        <NavLink to="/books" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <FaBook /> Books
        </NavLink>
        <NavLink to="/students" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <FaUserGraduate /> Students
        </NavLink>
        <NavLink to="/borrow" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <FaExchangeAlt /> Borrow/Return
        </NavLink>
        <NavLink to="/trends" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <FaChartLine /> Trends
        </NavLink>
        <NavLink to="/badges" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <FaMedal /> Quests & Badges
        </NavLink>
        <NavLink to="/report" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <FaFileAlt /> Report
        </NavLink>
        <NavLink to="/settings" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <FaUserCog /> Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
