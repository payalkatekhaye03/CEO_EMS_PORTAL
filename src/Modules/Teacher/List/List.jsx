import React, { useState } from "react";
import "./List.css";
import Header from "../../../Components/Header/Header";
import Sidebar from "../../../Components/SideBar/SideBar";

const teachers = [
  { id: 1, name: "Seema Bhavsar", subject: "Mathematics", class: "11th", MobileNumber: "8767657645", AveragePresent: "89%", exam: "NEET", year: "2024" },
  { id: 2, name: "Vidya Gupta", subject: "Physics", class: "11th", MobileNumber: "8767657645", AveragePresent: "90%", exam: "JEE", year: "2024" },
  { id: 3, name: "Kavya Nair", subject: "Biology", class: "11th", MobileNumber: "8767657645", AveragePresent: "85%", exam: "NEET", year: "2024" },
  { id: 4, name: "Rajesh Khair", subject: "Mathematics", class: "11th", MobileNumber: "8767657645", AveragePresent: "91%", exam: "JEE", year: "2024" },
  { id: 5, name: "Meera Kapoor", subject: "Physics", class: "11th", MobileNumber: "8767657645", AveragePresent: "92%", exam: "NEET", year: "2024" },
  { id: 6, name: "Amit Kumar", subject: "Biology", class: "12th", MobileNumber: "8767657645", AveragePresent: "91%", exam: "JEE", year: "2024" },
  { id: 7, name: "Karan Desai", subject: "Physics", class: "12th", MobileNumber: "8767657645", AveragePresent: "89%", exam: "NEET", year: "2024" },
  { id: 8, name: "Meera Kapoor", subject: "Mathematics", class: "12th", MobileNumber: "8767657645", AveragePresent: "92%", exam: "JEE", year: "2024" },
  { id: 9, name: "Arjun Sharma", subject: "Physics", class: "12th", MobileNumber: "8767657645", AveragePresent: "89%", exam: "NEET", year: "2024" },
  { id: 10, name: "Meera Kapoor", subject: "Biology", class: "12th", MobileNumber: "8767657645", AveragePresent: "85%", exam: "JEE", year: "2024" },
];

export default function List() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  return (
    <>
      <Header />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="list-page">
        <div className="list-root">
          <header className="list-header">
            <button className="hamburger" aria-label="menu" onClick={toggleSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14" fill="none">
                <rect width="20" height="2" rx="1" fill="currentColor" />
                <rect y="6" width="12" height="2" rx="1" fill="currentColor" />
                <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>

            <h1 className="list-title">List</h1>
          </header>

          <div className="list-card">
            <div className="table-wrap">
              <table className="list-table" role="table" aria-label="list table">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Teacher Name</th>
                    <th>Exam</th>
                    <th>Subject</th>
                    <th>Class</th>
                    <th>Mobile Number</th>
                    <th>Average Present</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((t, index) => (
                    <tr key={t.id}>
                      <td>{index + 1}</td>
                      <td>{t.name}</td>
                      <td>{t.exam}</td>
                      <td>{t.subject}</td>
                      <td>{t.class}</td>
                      <td>{t.MobileNumber}</td>
                      <td>{t.AveragePresent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
