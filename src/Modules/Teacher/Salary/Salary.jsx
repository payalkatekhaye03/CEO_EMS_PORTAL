import { useState } from "react";
import Header from "../../../Components/Header/Header";
import Sidebar from "../../../Components/SideBar/SideBar";
import "./Salary.css";

const teachers = [
  { id: 1, name: "Seema Bhavsar", subject: "Mathematics", class: "11th", date: "05/01/2025", salary: "₹ 40,000" },
  { id: 2, name: "Vidya Gupta", subject: "Physics", class: "11th", date: "05/01/2025", salary: "₹ 40,000" },
  { id: 3, name: "Kavya Nair", subject: "Biology", class: "11th", date: "05/01/2025", salary: "₹ 40,000" },
  { id: 4, name: "Rajesh Khair", subject: "Mathematics", class: "11th", date: "05/01/2025", salary: "₹ 40,000" },
  { id: 5, name: "Meera Kapoor", subject: "Physics", class: "11th", date: "05/01/2025", salary: "₹ 40,000" },
  { id: 6, name: "Amit Kumar", subject: "Biology", class: "12th", date: "05/01/2025", salary: "₹ 40,000" },
  { id: 7, name: "Karan Desai", subject: "Physics", class: "12th", date: "05/01/2025", salary: "₹ 40,000" },
  { id: 8, name: "Meera Kapoor", subject: "Mathematics", class: "12th", date: "05/01/2025", salary: "₹ 40,000" },
  { id: 9, name: "Arjun Sharma", subject: "Physics", class: "12th", date: "05/01/2025", salary: "₹ 40,000" },
  { id: 10, name: "Meera Kapoor", subject: "Biology", class: "12th", date: "05/01/2025", salary: "₹ 40,000" },
];

export default function Salary() {
  // control sidebar open/close
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // handler to toggle
  const toggleSidebar = () => setSidebarOpen((s) => !s);

  return (
    <div className="salary-page">
      <Header />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="salary-root">
        <header className="salary-header">
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

          <h1 className="salary-title">Salary</h1>
        </header>

        <div className="salary-card">
          <div className="table-wrap">
            <table className="salary-table" role="table" aria-label="Salary table">
              <thead>
                <tr>
                  <th className="col-sm">Sr. No.</th>
                  <th>Teacher Name</th>
                  <th>Subject</th>
                  <th>Class</th>
                  <th>Dates</th>
                  <th className="col-sm">Salary</th>
                </tr>
              </thead>

              <tbody>
                {teachers.map((t) => (
                  <tr key={t.id}>
                    <td className="col-sm">{t.id}</td>
                    <td>{t.name}</td>
                    <td>{t.subject}</td>
                    <td>{t.class}</td>
                    <td>{t.date}</td>
                    <td className="col-sm salary-amount">{t.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
