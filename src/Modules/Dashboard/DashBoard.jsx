// import React, { useState } from "react";
// import "../../Modules/Dashboard/DashBoard.css";
// import Sidebar from "../../Components/SideBar/SideBar";
// import Header from "../../Components/Header/Header";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
//   ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid
// } from "recharts";
// import { FaBars } from "react-icons/fa";
 
// // Icons
// import TopperIcon from "../../assets/Icons/Topper_Student_Dash.svg";
// import AverageIcon from "../../assets/Icons/Average_Student_Dash.svg";
// import BelowAverageIcon from "../../assets/Icons/Below_Average_Student_Dash.svg";
 
// const Dashboard = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [activeModal, setActiveModal] = useState(null);
//   const [selectedStd, setSelectedStd] = useState("11th");
//   const [selectedExam, setSelectedExam] = useState("NEET");
 
//   const toggleSidebar = () => setSidebarOpen((s) => !s);
//   const closeSidebar = () => setSidebarOpen(false);
 
//   const data = [
//     { month: "Jan", class11: 55, class12: 30 },
//     { month: "Feb", class11: 48, class12: 28 },
//     { month: "Mar", class11: 36, class12: 22 },
//     { month: "Apr", class11: 68, class12: 52 },
//     { month: "May", class11: 40, class12: 26 },
//     { month: "Jun", class11: 46, class12: 30 },
//     { month: "Jul", class11: 52, class12: 34 },
//     { month: "Aug", class11: 46, class12: 32 },
//     { month: "Sep", class11: 38, class12: 30 },
//     { month: "Oct", class11: 28, class12: 18 },
//     { month: "Nov", class11: 48, class12: 30 },
//     { month: "Dec", class11: 58, class12: 36 },
//   ];
 
//   const pieData = [
//     { name: "11th Class", value: 45 },
//     { name: "12th Class", value: 55 },
//   ];
//   const COLORS = ["#C77DFF", "#5A189A"];
 
//   const topperStudents = [
//     { name: "Rahul Wagh", percentage: "98%" },
//     { name: "Rohan Singh", percentage: "98%" },
//     { name: "Priya Sharma", percentage: "97%" },
//     { name: "Aditya Desai", percentage: "95%" },
//     { name: "Vihaan Rao", percentage: "94%" },
//   ];
//   const averageStudents = [
//     { name: "Student A", percentage: "72%" },
//     { name: "Student B", percentage: "70%" },
//     { name: "Student C", percentage: "68%" },
//   ];
//   const belowAverageStudents = [
//     { name: "Student X", percentage: "45%" },
//     { name: "Student Y", percentage: "42%" },
//     { name: "Student Z", percentage: "39%" },
//   ];
 
//   const renderTable = (students, title, range) => (
//     <div className="modal" onClick={() => setActiveModal(null)}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <h3 style={{ marginBottom: 6 }}>{title}</h3>
//         <p style={{ margin: 0, color: "#6b7280", marginBottom: 12 }}>{range}</p>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr>
//               <th style={{ textAlign: "left", padding: "8px 6px" }}>Student Name</th>
//               <th style={{ textAlign: "left", padding: "8px 6px" }}>Percentage</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((s, i) => (
//               <tr key={i}>
//                 <td style={{ padding: "8px 6px" }}>{s.name}</td>
//                 <td style={{ padding: "8px 6px" }}>{s.percentage}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div style={{ textAlign: "center", marginTop: 12 }}>
//           <button className="close-btn" onClick={() => setActiveModal(null)}>Close</button>
//         </div>
//       </div>
//     </div>
//   );
 
//   // Custom tooltip to match screenshot
//   const CustomTooltip = ({ active, payload, label }) => {
//     if (!active || !payload || payload.length === 0) return null;
//     return (
//       <div className="custom-tooltip" role="tooltip">
//         <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
//         {payload.map((pl, i) => {
//           // pl.name is "11th Class" or "12th Class" — map to short label to match screenshot
//           const short = pl.name.includes("11") ? "11th Std" : "12th Std";
//           return (
//             <div key={i} style={{ color: pl.fill, fontWeight: 600 }}>
//               {short} - {pl.value}%
//             </div>
//           );
//         })}
//       </div>
//     );
//   };
 
//   return (
//     <div className="dashboard-container">
//       <Sidebar isOpen={isSidebarOpen} />
//       <div className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`} onClick={closeSidebar} />
 
//       <div className="main-content">
//         <Header />
 
//         <div className="page-wrap">
//           <div className="dashboard-header">
//             <button
//   className="hamburger"
//   aria-label="menu"
//   onClick={toggleSidebar}
// >
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="20"
//     height="14"
//     viewBox="0 0 20 14"
//     fill="none"
//   >
//     <rect width="20" height="2" rx="1" fill="currentColor" />
//     <rect y="6" width="12" height="2" rx="1" fill="currentColor" />
//     <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
//   </svg>
// </button>

//             <h2>Dashboard</h2>
//           </div>
 
//           <div className="cards">
//             <div className="card topper">
//               <h3>Topper Student</h3>
//               <p>100% to 75%</p>
//               <button onClick={() => setActiveModal("topper")}>View All</button>
//               <div className="card-icon-wrap">
//                 <img src={TopperIcon} alt="topper" />
//               </div>
//             </div>
 
//             <div className="card average">
//               <h3>Average Student</h3>
//               <p>75% to 50%</p>
//               <button onClick={() => setActiveModal("average")}>View All</button>
//               <div className="card-icon-wrap">
//                 <img src={AverageIcon} alt="average" />
//               </div>
//             </div>
 
//             <div className="card below-average">
//               <h3>Below Average Student</h3>
//               <p>Below 50%</p>
//               <button onClick={() => setActiveModal("below")}>View All</button>
//               <div className="card-icon-wrap">
//                 <img src={BelowAverageIcon} alt="below" />
//               </div>
//             </div>
//           </div>
 
//           {activeModal === "topper" && renderTable(topperStudents, "Topper Students", "100% to 75%")}
//           {activeModal === "average" && renderTable(averageStudents, "Average Students", "75% to 50%")}
//           {activeModal === "below" && renderTable(belowAverageStudents, "Below Average Students", "Below 50%")}
 
//           <div className="stats-header">
//             <div className="section-title">Statistics</div>
 
//             <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
//               <div className="filters">
//                 <select value={selectedStd} onChange={(e) => setSelectedStd(e.target.value)} aria-label="Select Class">
//                   <option>11th</option>
//                   <option>12th</option>
//                 </select>
//               </div>
 
//               <div className="filters">
//                 <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} aria-label="Select Exam">
//                   <option>NEET</option>
//                   <option>JEE</option>
//                 </select>
//               </div>
//             </div>
//           </div>
 
//           <div className="stats">
//             <div className="chart-card" aria-label="performance chart">
//               <ResponsiveContainer width="100%" height={320}>
//                 <BarChart
//                   data={data}
//                   margin={{ top: 40, right: 10, left: 10, bottom: 10 }}
//                   barCategoryGap="30%"
//                 >
//                   <CartesianGrid stroke="#f1f1f1" vertical={false} />
//                   <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
//                   <YAxis
//                     axisLine={false}
//                     tickLine={false}
//                     tick={{ fontSize: 12, fill: "#6b7280" }}
//                     domain={[0, 100]}
//                     ticks={[0, 25, 50, 75, 100]}
//                   />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Legend verticalAlign="top" align="right" />
//                   <Bar dataKey="class11" fill={COLORS[0]} name="11th Class" radius={[6, 6, 0, 0]} barSize={18} />
//                   <Bar dataKey="class12" fill={COLORS[1]} name="12th Class" radius={[6, 6, 0, 0]} barSize={18} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
 
//             <div className="chart-card small" style={{ position: "relative" }}>
//               <div className="chart-header">Pie Chart</div>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} dataKey="value" paddingAngle={2}>
//                     {pieData.map((entry, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
//                   </Pie>
//                   <Legend layout="vertical" verticalAlign="top" align="right" />
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
 
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default Dashboard;


import React, { useState } from "react";
import axios from "axios";
import "../../Modules/Dashboard/DashBoard.css";
import Sidebar from "../../Components/SideBar/SideBar";
import Header from "../../Components/Header/Header";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid
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

  const toggleSidebar = () => setSidebarOpen((s) => !s);
  const closeSidebar = () => setSidebarOpen(false);

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
    try {
      const response = await axios.get("http://localhost:8080/api/ceo/batchToppers", {
        params: { studentClass: "12", batch: "2025" },
      });
      setTopperData(response.data || []); // store API response
      setActiveModal("topper");
    } catch (error) {
      console.error("Error fetching topper data:", error);
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

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading data...</p>
        ) : students.length === 0 ? (
          <p style={{ textAlign: "center" }}>No data available.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px 6px" }}>Student Name</th>
                <th style={{ textAlign: "left", padding: "8px 6px" }}>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i}>
                  <td style={{ padding: "8px 6px" }}>{s.name}</td>
                  <td style={{ padding: "8px 6px" }}>{s.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button className="close-btn" onClick={() => setActiveModal(null)}>Close</button>
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
      <div className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`} onClick={closeSidebar} />

      <div className="main-content">
        <Header />

        <div className="page-wrap">
          <div className="dashboard-header">
            <button className="hamburger" aria-label="menu" onClick={toggleSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14" fill="none">
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
              <button onClick={handleTopperViewAll}>View All</button>
              <div className="card-icon-wrap">
                <img src={TopperIcon} alt="topper" />
              </div>
            </div>

            <div className="card average">
              <h3>Average Student</h3>
              <p>75% to 50%</p>
              <button onClick={() => setActiveModal("average")}>View All</button>
              <div className="card-icon-wrap">
                <img src={AverageIcon} alt="average" />
              </div>
            </div>

            <div className="card below-average">
              <h3>Below Average Student</h3>
              <p>Below 50%</p>
              <button onClick={() => setActiveModal("below")}>View All</button>
              <div className="card-icon-wrap">
                <img src={BelowAverageIcon} alt="below" />
              </div>
            </div>
          </div>

          {/* 🔹 Modal Rendering */}
          {activeModal === "topper" && renderTable(topperData, "Topper Students", "100% to 75%")}
          {activeModal === "average" && renderTable(averageStudents, "Average Students", "75% to 50%")}
          {activeModal === "below" && renderTable(belowAverageStudents, "Below Average Students", "Below 50%")}

          {/* 🔹 Statistics Section */}
          <div className="stats-header">
            <div className="section-title">Statistics</div>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div className="filters">
                <select value={selectedStd} onChange={(e) => setSelectedStd(e.target.value)} aria-label="Select Class">
                  <option>11th</option>
                  <option>12th</option>
                </select>
              </div>

              <div className="filters">
                <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} aria-label="Select Exam">
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
                <BarChart data={data} margin={{ top: 40, right: 10, left: 10, bottom: 10 }} barCategoryGap="30%">
                  <CartesianGrid stroke="#f1f1f1" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" align="right" />
                  <Bar dataKey="class11" fill={COLORS[0]} name="11th Class" radius={[6, 6, 0, 0]} barSize={18} />
                  <Bar dataKey="class12" fill={COLORS[1]} name="12th Class" radius={[6, 6, 0, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card small" style={{ position: "relative" }}>
              <div className="chart-header">Pie Chart</div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} dataKey="value" paddingAngle={2}>
                    {pieData.map((entry, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
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
