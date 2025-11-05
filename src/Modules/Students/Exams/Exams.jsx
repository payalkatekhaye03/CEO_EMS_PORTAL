import { useState } from "react";
import "../Exams/Exams.css";
import { students } from "./studData";
import Header from "../../../Components/Header/Header";
import Sidebar from "../../../Components/SideBar/SideBar";
 
export default function Exam() {
  const [student, setStudent] = useState("Student Count");
  const [className, setClassName] = useState("Select Class");
  const [year, setYear] = useState("2024");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  const toggleSidebar = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setSidebarOpen((s) => !s);
  };
  const closeSidebar = () => setSidebarOpen(false);
 
  const filteredStudents =
    year === "2024"
      ? students.filter((s) => {
          const matchStudent = student === "Student Count" || s.name === student;
          const matchClass = className === "Select Class" || s.exam === className;
          return matchStudent && matchClass;
        })
      : [];
 
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + itemsPerPage
  );
 
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
 
  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <Header />
 
      <div className="exam-page">
        <div className="exam-header">
          <div className="exam-header-left">
            <button
              type="button"
              className="exam-hamburger"
              aria-label={sidebarOpen ? "Close menu" : "Open menu"}
              aria-expanded={sidebarOpen}
              onClick={toggleSidebar}
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
            <span className="exam-title">Exams</span>
          </div>
 
          <div className="exam-filters">
            <select
              className="exam-filter-select"
              value={student}
              onChange={(e) => {
                setStudent(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>Student Count</option>
              {students.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
 
            <select
              className="exam-filter-select"
              value={className}
              onChange={(e) => {
                setClassName(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>Select Class</option>
              <option>JEE</option>
              <option>NEET</option>
            </select>
 
            <select
              className="exam-filter-select"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
        </div>
 
        <div className="exam-content">
          <div className="exam-table-container">
            {currentStudents.length > 0 ? (
              <>
                <table className="exam-table">
                  <thead className="exam-table-head">
                    <tr className="exam-table-row">
                      <th className="exam-table-header">Sr. No.</th>
                      <th className="exam-table-header">Student Name</th>
                      <th className="exam-table-header">Exam</th>
                      <th className="exam-table-header">Date</th>
                    </tr>
                  </thead>
                  <tbody className="exam-table-body">
                    {currentStudents.map((s, index) => (
                      <tr key={s.id} className="exam-table-row">
                        <td className="exam-table-cell" data-label="Sr. No.">
                          {startIndex + index + 1}
                        </td>
                        <td className="exam-table-cell" data-label="Student Name">
                          {s.name}
                        </td>
                        <td className="exam-table-cell" data-label="Exam">
                          {s.exam}
                        </td>
                        <td className="exam-table-cell" data-label="Date">
                          {s.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
 
                <div className="exam-pagination">
                  <div className="exam-pagination-controls">
                    <button
                      className={`exam-pagination-button ${
                        currentPage === 1 ? "exam-pagination-button-disabled" : ""
                      }`}
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
 
                    {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`exam-pagination-page ${
                          currentPage === i + 1 ? "exam-pagination-page-active" : ""
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
 
                    {totalPages > 3 && (
                      <>
                        <span className="exam-pagination-dots">...</span>
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className={`exam-pagination-page ${
                            currentPage === totalPages ? "exam-pagination-page-active" : ""
                          }`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
 
                    <button
                      className={`exam-pagination-button ${
                        currentPage === totalPages ? "exam-pagination-button-disabled" : ""
                      }`}
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </div>
 
                  <div className="exam-pagination-dropdown">
                    <select
                      className="exam-pagination-select"
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      {[5, 10, 20, 50].map((count) => (
                        <option key={count} value={count}>
                          {count}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <div className="exam-no-data">No exams found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}