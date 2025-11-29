import React, { useState, useEffect } from "react";
import api from "../../api/api.js";

import "../../Modules/Dashboard/DashBoard.css";
import Sidebar from "../../Components/SideBar/SideBar";
import Header from "../../Components/Header/Header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import TopperIcon from "../../assets/Icons/Topper_Student_Dash.svg";
import AverageIcon from "../../assets/Icons/Average_Student_Dash.svg";
import BelowAverageIcon from "../../assets/Icons/Below_Average_Student_Dash.svg";

const Dashboard = () => {
  // 🔹 Sidebar + modal controls
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  // 🔹 Filter states
  const [selectedStd, setSelectedStd] = useState("11th");
  const [selectedExam, setSelectedExam] = useState("NEET");

  // 🔹 Dynamic topper data states
  const [topperData, setTopperData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleSidebar = () => setSidebarOpen((s) => !s);
  const closeSidebar = () => setSidebarOpen(false);

  //average
  const [averageData, setAverageData] = useState([]);

  // Below avg student
  const [belowAverageData, setBelowAverageData] = useState([]);


  // 🔹 Chart data (static for now)
  const data = [
    { month: "Jan", class11: 55, class12: 30 },
    { month: "Feb", class11: 48, class12: 28 },
    { month: "Mar", class11: 36, class12: 22 },
    { month: "Apr", class11: 68, class12: 52 },
    { month: "May", class11: 40, class12: 26 },
    { month: "Jun", class11: 46, class12: 30 },
    { month: "Jul", class11: 52, class12: 34 },
    { month: "Aug", class11: 46, class12: 32 },
    { month: "Sep", class11: 38, class12: 30 },
    { month: "Oct", class11: 28, class12: 18 },
    { month: "Nov", class11: 48, class12: 30 },
    { month: "Dec", class11: 58, class12: 36 },
  ];

  const pieData = [
    { name: "11th Class", value: 45 },
    { name: "12th Class", value: 55 },
  ];
  const COLORS = ["#C77DFF", "#5A189A"];

  // 🔹 Hardcoded data for Average and Below Average
  const averageStudents = [
    { name: "Student A", percentage: "72%" },
    { name: "Student B", percentage: "70%" },
    { name: "Student C", percentage: "68%" },
  ];

  const belowAverageStudents = [
    { name: "Student X", percentage: "45%" },
    { name: "Student Y", percentage: "42%" },
    { name: "Student Z", percentage: "39%" },
  ];

  // 🔹 Fetch API data for Topper Students dynamically
  const handleTopperViewAll = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching topper data...");

      const response = await api.get("/ceo/batchToppers", {
        params: {
          studentClass: "11",
          batch: "2025",
        },
      });

      console.log("Full API Response:", response);
      console.log("Response data:", response.data);

      // Check if response structure is correct
      if (response.data && response.data.success) {
        const apiList = response.data.data || [];
        console.log("API List:", apiList);

        // Normalize format
        const normalized = apiList.map((s) => ({
          name: `${s.name} ${s.lastName || ""}`.trim(),
          percentage: `${s.percentage}%`,
        }));

        setTopperData(normalized);
        setActiveModal("topper");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching topper data:", error);
      setError(`Failed to load data: ${error.message}`);

      // Fallback to mock data for development
     
      setTopperData(mockData);
      setActiveModal("topper");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Load topper data on component mount (optional)
  useEffect(() => {
    // You can pre-load data here if needed
    // handleTopperViewAll();
  }, []);


  // Average student

  const handleAverageViewAll = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching average student data...");

      const response = await api.get("/ceo/batchAverage", {
        params: {
          studentClass: "11",
          batch: "2025",
        },
      });

      console.log("Average API Response:", response.data);

      if (response.data && response.data.success) {
        const apiList = response.data.data || [];

        const normalized = apiList.map((s) => ({
          name: `${s.name} ${s.lastName || ""}`.trim(),
          percentage: `${s.percentage}%`,  
          aq12
        }));

        setAverageData(normalized);
        setActiveModal("average");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching average data:", error);
      setError(`Failed to load data: ${error.message}`);

   

      setAverageData(mockData);
      setActiveModal("average");
    } finally {
      setLoading(false);
    }
  };



// Below Avg student

const handleBelowAverageViewAll = async () => {
  setLoading(true);
  setError(null);

  try {
    console.log("Fetching below average student data...");

    const response = await api.get("/ceo/batchBelowAverage", {
      params: {
        studentClass: "12",
        batch: "2025",
      },
    });

    console.log("Below Average API Response:", response.data);

    if (response.data && response.data.success) {
      const apiList = response.data.data || [];

      const normalized = apiList.map((s) => ({
        name: `${s.name} ${s.lastName || ""}`.trim(),
        percentage: `${s.percentage}%`,
      }));

      setBelowAverageData(normalized);
      setActiveModal("below");
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching below average data:", error);
    setError(`Failed to load data: ${error.message}`);

  

    setBelowAverageData(mockData);
    setActiveModal("below");
  } finally {
    setLoading(false);
  }
};


  // 🔹 Common modal for all student categories
  const renderTable = (students, title, range) => (
    <div className="modal" onClick={() => setActiveModal(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginBottom: 6 }}>{title}</h3>
        <p style={{ margin: 0, color: "#6b7280", marginBottom: 12 }}>{range}</p>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "8px 12px",
              borderRadius: "4px",
              marginBottom: "12px",
              fontSize: "14px",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading data...</p>
        ) : !Array.isArray(students) || students.length === 0 ? (
          <p style={{ textAlign: "center" }}>No data available.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: "8px 6px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Student Name
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "8px 6px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i}>
                  <td
                    style={{
                      padding: "8px 6px",
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    {s.name}
                  </td>
                  <td
                    style={{
                      padding: "8px 6px",
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    {s.percentage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button
            className="close-btn"
            onClick={() => {
              setActiveModal(null);
              setError(null);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // 🔹 Tooltip customization for bar chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;
    return (
      <div className="custom-tooltip" role="tooltip">
        <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
        {payload.map((pl, i) => {
          const short = pl.name.includes("11") ? "11th Std" : "12th Std";
          return (
            <div key={i} style={{ color: pl.fill, fontWeight: 600 }}>
              {short} - {pl.value}%
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={closeSidebar}
      />

      <div className="main-content">
        <Header />

        <div className="page-wrap">
          <div className="dashboard-header">
            <button
              className="hamburger"
              aria-label="menu"
              onClick={toggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
              >
                <rect width="20" height="2" rx="1" fill="currentColor" />
                <rect y="6" width="12" height="2" rx="1" fill="currentColor" />
                <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>
            <h2>Dashboard</h2>
          </div>

          {/* 🔹 Cards Section */}
          <div className="cards">
            <div className="card topper">
              <h3>Topper Student</h3>
              <p>100% to 75%</p>
              <button onClick={handleTopperViewAll} disabled={loading}>
                {loading ? "Loading..." : "View All"}
              </button>
              <div className="card-icon-wrap">
                <img src={TopperIcon} alt="topper" />
              </div>
            </div>

            <div className="card average">
              <h3>Average Student</h3>
              <p>75% to 50%</p>

              <button onClick={handleAverageViewAll} disabled={loading}>
                {loading ? "Loading..." : "View All"}
              </button>

              <div className="card-icon-wrap">
                <img src={AverageIcon} alt="average" />
              </div>
            </div>

            <div className="card below-average">
              <h3>Below Average Student</h3>
              <p>Below 50%</p>
              <button onClick={handleBelowAverageViewAll} disabled={loading}>
  {loading ? "Loading..." : "View All"}
</button>

              <div className="card-icon-wrap">
                <img src={BelowAverageIcon} alt="below" />
              </div>
            </div>
          </div>

          {/* 🔹 Modal Rendering */}
          {activeModal === "topper" &&
            renderTable(topperData, "Topper Students", "100% to 75%")}

          {activeModal === "average" &&
            renderTable(averageData, "Average Students", "75% to 50%")}

          {/* {activeModal === "below" &&
            renderTable(
              belowAverageStudents,
              "Below Average Students",
              "Below 50%"
            )} */}
            {activeModal === "below" &&
  renderTable(belowAverageData, "Below Average Students", "Below 50%")}


          {/* 🔹 Statistics Section */}
          <div className="stats-header">
            <div className="section-title">Statistics</div>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div className="filters">
                <select
                  value={selectedStd}
                  onChange={(e) => setSelectedStd(e.target.value)}
                  aria-label="Select Class"
                >
                  <option>11th</option>
                  <option>12th</option>
                </select>
              </div>

              <div className="filters">
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  aria-label="Select Exam"
                >
                  <option>NEET</option>
                  <option>JEE</option>
                </select>
              </div>
            </div>
          </div>

          {/* 🔹 Charts Section */}
          <div className="stats">
            <div className="chart-card" aria-label="performance chart">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={data}
                  margin={{ top: 40, right: 10, left: 10, bottom: 10 }}
                  barCategoryGap="30%"
                >
                  <CartesianGrid stroke="#f1f1f1" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" align="right" />
                  <Bar
                    dataKey="class11"
                    fill={COLORS[0]}
                    name="11th Class"
                    radius={[6, 6, 0, 0]}
                    barSize={18}
                  />
                  <Bar
                    dataKey="class12"
                    fill={COLORS[1]}
                    name="12th Class"
                    radius={[6, 6, 0, 0]}
                    barSize={18}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card small" style={{ position: "relative" }}>
              <div className="chart-header">Pie Chart</div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend layout="vertical" verticalAlign="top" align="right" />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
