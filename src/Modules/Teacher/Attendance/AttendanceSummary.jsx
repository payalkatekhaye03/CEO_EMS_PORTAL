import React, { useState } from "react";
import Sidebar from "../../../Components/SideBar/SideBar";
import Header from "../../../Components/Header/Header";
import "./AttendanceSummary.css";
 
const AttendanceSummary = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((s) => !s);
 
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
 
  const years = [2023, 2024, 2025];
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const teacherIds = [1, 2, 3, 4];
 
  const attendanceData = [
    {
      id: 1,
      name: "Mr. Sharma",
      year: 2024,
      month: "November",
      totalDays: 10,
      fullDays: 4,
      halfDays: 1,
      absentDays: 5,
    },
    {
      id: 2,
      name: "Mrs. Riya",
      year: 2024,
      month: "November",
      totalDays: 10,
      fullDays: 7,
      halfDays: 1,
      absentDays: 2,
    },
      {
      id: 3,
      name: "Mr. Raja",
      year: 2024,
      month: "Oct",
      totalDays: 10,
      fullDays: 7,
      halfDays: 1,
      absentDays: 2,
    },
  ];
 
  const filtered = attendanceData.filter((it) => {
    return (
      (selectedYear === "" || it.year.toString() === selectedYear) &&
      (selectedMonth === "" || it.month === selectedMonth) &&
      (selectedTeacher === "" || it.id.toString() === selectedTeacher)
    );
  });
 
  return (
    <>
      <Header />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
 
      <div className="attendance-summary-header">
        <div className="attendance-summary-header-root">
          <div className="attendance-summary-left">
            <button
            className="hamburger"
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
            onClick={toggleSidebar}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <rect width="20" height="2" rx="1" fill="currentColor" />
              <rect y="6" width="12" height="2" rx="1" fill="currentColor" />
              <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
            </svg>
          </button>
 
            <h1 className="attendance-summary-title">Attendance Summary</h1>
          </div>
 
          <div className="attendance-summary-filter-box">
 
            <div className="pill-select-wrapper">
              <select
                className="pill-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Select Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <span className="pill-select-icon">▼</span>
            </div>
 
            <div className="pill-select-wrapper">
              <select
                className="pill-select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">Select Month</option>
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <span className="pill-select-icon">▼</span>
            </div>
 
            <div className="pill-select-wrapper">
              <select
                className="pill-select"
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
              >
                <option value="">Select Teacher ID</option>
                {teacherIds.map((id) => (
                  <option key={id} value={id}>{id}</option>
                ))}
              </select>
              <span className="pill-select-icon">▼</span>
            </div>
 
          </div>
        </div>
 
        <div className="attendance-summary-card">
          <table className="attendance-summary-table">
            <thead>
              <tr>
                <th>Teacher ID</th>
                <th>Teacher Name</th>
                <th>Year</th>
                <th>Month</th>
                <th>Total Days</th>
                <th>Full Days</th>
                <th>Half Days</th>
                <th>Absent Days</th>
                <th>Attendance</th>
              </tr>
            </thead>
 
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    No records found
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const percentage =
                    ((item.fullDays + item.halfDays * 0.5) / item.totalDays) * 100;
 
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.year}</td>
                      <td>{item.month}</td>
                      <td>{item.totalDays}</td>
                      <td>{item.fullDays}</td>
                      <td>{item.halfDays}</td>
                      <td>{item.absentDays}</td>
                      <td>{percentage.toFixed(2)}%</td>
                    </tr>
                  );
                })
              )}
            </tbody>
 
          </table>
        </div>
      </div>
    </>
  );
};
 
export default AttendanceSummary;