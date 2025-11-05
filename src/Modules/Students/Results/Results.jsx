import { useState } from "react";
import "./Results.css";
import { students } from "./studentData";
import DetailedResult from "./DetailedResult";
import Header from "../../../Components/Header/Header";
import Sidebar from "../../../Components/SideBar/SideBar";
 
export default function Results() {
  const [student, setStudent] = useState("Student Name");
  const [className, setClassName] = useState("Select Class");
  const [year, setYear] = useState("2024");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  const toggleSidebar = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setSidebarOpen((s) => !s);
  };
  const closeSidebar = () => setSidebarOpen(false);
 
  const filteredStudents =
    year === "2024"
      ? students.filter((s) => {
          const matchStudent = student === "Student Name" || s.name === student;
          const matchClass = className === "Select Class" || s.exam === className;
          return matchStudent && matchClass;
        })
      : [];
 
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);
 
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
 
  const handleStudentClick = (studentData) => {
    setSelectedStudent(studentData);
  };
 
  const handleBackClick = () => {
    setSelectedStudent(null);
  };
 
  if (selectedStudent) {
    return <DetailedResult student={selectedStudent} onBackClick={handleBackClick} />;
  }
 
  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <Header />
 
      <div className="results-page">
        <div className="results-header">
          <div className="results-header-left">
            <button
              type="button"
              className="results-hamburger"
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
            <span className="results-title">Results</span>
          </div>
 
          <div className="results-filters">
            <select
              className="results-filter-select"
              value={student}
              onChange={(e) => {
                setStudent(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>Student Name</option>
              {students.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
 
            <select
              className="results-filter-select"
              value={className}
              onChange={(e) => {
                setClassName(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>Select Class</option>
              <option>11th</option>
              <option>12th</option>
            </select>
 
            <select
              className="results-filter-select"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
            </select>
          </div>
        </div>
 
        <div className="results-content">
          <div className="results-table-container">
            {currentStudents.length > 0 ? (
              <>
                <table className="results-table">
                  <thead className="results-table-head">
                    <tr className="results-table-row">
                      <th className="results-table-header">Sr. No.</th>
                      <th className="results-table-header">Student Name</th>
                      <th className="results-table-header">Exam</th>
                      <th className="results-table-header">Date</th>
                      <th className="results-table-header">Marks</th>
                    </tr>
                  </thead>
                  <tbody className="results-table-body">
                    {currentStudents.map((s, idx) => (
                      <tr key={s.id} className="results-table-row">
                        <td className="results-table-cell" data-label="Sr. No.">{startIndex + idx + 1}</td>
                        <td className="results-table-cell" data-label="Student Name">
                          <button
                            className="results-student-link"
                            onClick={() => handleStudentClick(s)}
                          >
                            {s.name}
                          </button>
                        </td>
                        <td className="results-table-cell" data-label="Exam">{s.exam}</td>
                        <td className="results-table-cell" data-label="Date">{s.date}</td>
                        <td className="results-table-cell" data-label="Marks">{s.marks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
 
                <div className="results-pagination">
                  <div className="results-pagination-controls">
                    <button
                      className={`results-pagination-button ${currentPage === 1 ? "results-pagination-button-disabled" : ""}`}
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
 
                    {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`results-pagination-page ${currentPage === i + 1 ? "results-pagination-page-active" : ""}`}
                      >
                        {i + 1}
                      </button>
                    ))}
 
                    {totalPages > 3 && (
                      <>
                        <span className="results-pagination-dots">...</span>
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className={`results-pagination-page ${currentPage === totalPages ? "results-pagination-page-active" : ""}`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
 
                    <button
                      className={`results-pagination-button ${currentPage === totalPages ? "results-pagination-button-disabled" : ""}`}
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </div>
 
                  <div className="results-pagination-dropdown">
                    <select
                      className="results-pagination-select"
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
              <div className="results-no-data">No data found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}