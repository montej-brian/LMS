import { useState, useEffect } from "react";
import axios from "axios";
import { FaAward, FaBookOpen, FaMoon, FaMicroscope, FaMedal, FaStar } from "react-icons/fa";

const API_BASE = "http://localhost:5000/api";

const Badges = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`${API_BASE}/students`);
                setStudents(response.data);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    const quests = [
        {
            id: 1,
            title: "Scientific Explorer",
            description: "Read 5 Science books",
            icon: <FaMicroscope className="text-4xl text-blue-500" />,
            progress: 0,
            goal: 5,
            reward: "Explorer Badge",
        },
        {
            id: 2,
            title: "Night Owl",
            description: "Check out books during holidays",
            icon: <FaMoon className="text-4xl text-purple-500" />,
            progress: 1,
            goal: 1,
            reward: "Owl Badge",
        },
        {
            id: 3,
            title: "Bookworm",
            description: "Borrow 10 books in a month",
            icon: <FaBookOpen className="text-4xl text-green-500" />,
            progress: 3,
            goal: 10,
            reward: "Worm Badge",
        },
    ];

    if (loading) return <div className="p-6">Loading Badges & Leaderboard...</div>;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold dark:text-white flex items-center gap-3">
                <FaAward className="text-yellow-500" /> Reading Quests & Badges
            </h1>

            {/* Active Quests */}
            <section>
                <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">Active Quests</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {quests.map((quest) => (
                        <div key={quest.id} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-t-4 border-blue-500 flex flex-col items-center text-center">
                            <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                                {quest.icon}
                            </div>
                            <h3 className="text-lg font-bold dark:text-white">{quest.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{quest.description}</p>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${(quest.progress / quest.goal) * 100}%` }}
                                ></div>
                            </div>
                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Reward: {quest.reward}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Leaderboard */}
            <section>
                <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">Student Leaderboard (Top Readers)</h2>
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="p-4 text-left">Rank</th>
                                <th className="p-4 text-left">Student</th>
                                <th className="p-4 text-left">Form & Stream</th>
                                <th className="p-4 text-left">XP Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student.id} className="border-b border-gray-200 dark:border-gray-700">
                                    <td className="p-4 font-bold text-gray-500 dark:text-gray-400">
                                        {index + 1 === 1 ? <FaMedal className="text-yellow-500 text-2xl" /> :
                                            index + 1 === 2 ? <FaMedal className="text-gray-400 text-xl" /> :
                                                index + 1 === 3 ? <FaMedal className="text-yellow-700 text-xl" /> :
                                                    `#${index + 1}`}
                                    </td>
                                    <td className="p-4">
                                        <div className="font-bold dark:text-white">{student.name}</div>
                                        <div className="text-xs text-gray-500 font-mono">{student.admissionNumber}</div>
                                    </td>
                                    <td className="p-4 dark:text-gray-300">
                                        {student.form} {student.stream}
                                    </td>
                                    <td className="p-4 font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                                        <FaStar className="text-yellow-400" /> {student.points}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Badges;
