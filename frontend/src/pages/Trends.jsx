import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, Treemap
} from 'recharts';

const API_BASE = "http://localhost:5000/api";

const CustomizedContent = (props) => {
    const { root, depth, x, y, width, height, index, colors, name, size } = props;

    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                    fill: depth < 2 ? colors[Math.floor((index / (root.children?.length || 1)) * 6)] : 'none',
                    stroke: '#fff',
                    strokeWidth: 2 / (depth + 1e-10),
                    strokeOpacity: 1 / (depth + 1e-10),
                }}
            />
            {depth === 1 ? (
                <text
                    x={x + width / 2}
                    y={y + height / 2 + 7}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={14}
                >
                    {name} ({size})
                </text>
            ) : null}
        </g>
    );
};

const Trends = () => {
    const [activeTab, setActiveTab] = useState('Week');
    const [summary, setSummary] = useState({ totalBorrows: 0, activeStudents: 0, overdueBooks: 0 });
    const [trendData, setTrendData] = useState({ weekly: [], subjects: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sumRes, trendRes] = await Promise.all([
                    axios.get(`${API_BASE}/stats/summary`),
                    axios.get(`${API_BASE}/stats/trends`)
                ]);

                setSummary({
                    totalBorrows: sumRes.data.borrowedBooks + sumRes.data.returnedBooks,
                    activeStudents: sumRes.data.totalStudents,
                    overdueBooks: sumRes.data.overdueBooks
                });

                // Format weekly data for BarChart
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const formattedWeekly = days.map((day, idx) => {
                    const match = trendRes.data.weekly.find(w => parseInt(w.day) === idx);
                    return { name: day, borrows: match ? match.count : 0 };
                });

                setTrendData({
                    weekly: formattedWeekly,
                    subjects: [{ name: 'Subjects', children: trendRes.data.subjects }]
                });

            } catch (error) {
                console.error("Error fetching trends:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

    if (loading) return <div className="p-6">Loading Analytics...</div>;

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold dark:text-white">Borrowing Trends</h1>

                <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
                    {['Week', 'Subjects'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-md transition-all ${activeTab === tab
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm uppercase">Total Borrows</h3>
                    <p className="text-3xl font-bold dark:text-white mt-2">{summary.totalBorrows}</p>
                    <span className="text-blue-500 text-sm font-semibold">Historical Lifetime</span>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm uppercase">Active Students</h3>
                    <p className="text-3xl font-bold dark:text-white mt-2">{summary.activeStudents}</p>
                    <span className="text-gray-500 text-sm">Registered</span>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm uppercase">Overdue Books</h3>
                    <p className="text-3xl font-bold dark:text-white mt-2">{summary.overdueBooks}</p>
                    <span className="text-red-500 text-sm font-semibold">Requires Action</span>
                </div>
            </div>

            {/* Charts Area */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6 dark:text-white">
                    {activeTab === 'Week' && 'Weekly Borrowing Activity'}
                    {activeTab === 'Subjects' && 'Subject Popularity Heatmap'}
                </h2>

                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        {activeTab === 'Week' && (
                            <BarChart data={trendData.weekly} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', color: '#fff', borderRadius: '8px', border: 'none' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend />
                                <Bar dataKey="borrows" name="Total Borrows" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        )}

                        {activeTab === 'Subjects' && (
                            <Treemap
                                data={trendData.subjects}
                                dataKey="size"
                                ratio={4 / 3}
                                stroke="#fff"
                                fill="#8884d8"
                                content={<CustomizedContent colors={COLORS} />}
                            >
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', color: '#fff', borderRadius: '8px', border: 'none' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </Treemap>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Trends;

