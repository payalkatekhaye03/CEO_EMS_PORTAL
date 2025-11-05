import { useState, useEffect } from "react";
import "../../Modules/Fees/Fees.css";
import { data, classes, years } from "../../Modules/Fees/StudentData";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/SideBar";
 
export default function Fees() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("Student Name");
  const [selectedClass, setSelectedClass] = useState("Select Class");
  const [selectedYear, setSelectedYear] = useState("Select Year");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
 
  const toggleSidebar = () => {
    setSidebarOpen((s) => !s);
  };
 
  const closeSidebar = () => setSidebarOpen(false);
 
  // Filter logic
  const filteredData =
    selectedYear !== "2024" && selectedYear !== "Select Year"
      ? []
      : data.filter((student) => {
          const studentMatch =
            selectedStudent === "Student Name" ||
            student.name === selectedStudent;
          const classMatch =
            selectedClass === "Select Class" || student.class === selectedClass;
          return studentMatch && classMatch;
        });
 
  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
 
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
 
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
 
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
 
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStudent, selectedClass, selectedYear, rowsPerPage]);
 
  // Generate pagination numbers with ellipsis
  const getPaginationNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "ellipsis", totalPages);
      } else if (currentPage > totalPages - 4) {
        pages.push(1, "ellipsis");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(
          1,
          "ellipsis",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "ellipsis",
          totalPages
        );
      }
    }
    return pages;
  };
 
  return (
    <>
      <Header />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
 
      <div className="fees-page">
        <div className="fees-header">
          <div className="fees-header-left">
            <button
              className="fees-hamburger"
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
            <h2 className="fees-title">Fees</h2>
          </div>
 
          <div className="fees-header-right">
            <div className="fees-custom-select">
              <select
                className="fees-select"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option>Student Name</option>
                {data.map((student) => (
                  <option key={student.id} value={student.name}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
 
            <div className="fees-custom-select">
              <select
                className="fees-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option>Select Class</option>
                {classes.map((cls, index) => (
                  <option key={index} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
 
            <div className="fees-custom-select">
              <select
                className="fees-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option>Select Year</option>
                {years.map((yr, index) => (
                  <option key={index} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
 
        <div className="fees-content">
          <div className="fees-table-container">
            <table className="fees-table">
              <thead className="fees-table-head">
                <tr className="fees-table-row">
                  <th className="fees-table-header">Sr. No.</th>
                  <th className="fees-table-header">Student Name</th>
                  <th className="fees-table-header">Class</th>
                  <th className="fees-table-header">Total Fees</th>
                  <th className="fees-table-header">Fees Credit</th>
                  <th className="fees-table-header">Pending Fees</th>
                </tr>
              </thead>
              <tbody className="fees-table-body">
                {paginatedData.map((row) => (
                  <tr key={row.id} className="fees-table-row">
                    <td className="fees-table-cell" data-label="Sr. No.">{row.id}</td>
                    <td className="fees-table-cell" data-label="Student Name">{row.name}</td>
                    <td className="fees-table-cell" data-label="Class">{row.class}</td>
                    <td className="fees-table-cell" data-label="Total Fees">{row.total}</td>
                    <td className="fees-table-cell" data-label="Fees Credit">{row.credit}</td>
                    <td className="fees-table-cell" data-label="Pending Fees">{row.pending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
 
            {paginatedData.length === 0 && (
              <div className="fees-no-data">No records found</div>
            )}
          </div>
 
          <div className="fees-pagination">
            <div className="fees-pagination-controls">
              <button
                className={`fees-pagination-button ${currentPage === 1 ? "fees-pagination-button-disabled" : ""}`}
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                Previous
              </button>
 
              <div className="fees-pagination-numbers">
                {getPaginationNumbers().map((page, idx) => {
                  if (page === "ellipsis") {
                    return (
                      <span key={`ellipsis-${idx}`} className="fees-pagination-ellipsis">
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={page}
                      className={`fees-pagination-page ${currentPage === page ? "fees-pagination-page-active" : ""}`}
                      onClick={() => handlePageClick(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
 
              <button
                className={`fees-pagination-button ${currentPage === totalPages || totalPages === 0 ? "fees-pagination-button-disabled" : ""}`}
                onClick={handleNext}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </button>
            </div>
 
            <div className="fees-rows-dropdown">
              <select
                className="fees-rows-select"
                value={rowsPerPage}
                onChange={(e) => {
                  setCurrentPage(1);
                  setRowsPerPage(Number(e.target.value));
                }}
              >
                <option value={5}>5 rows</option>
                <option value={10}>10 rows</option>
                <option value={20}>20 rows</option>
                <option value={50}>50 rows</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}