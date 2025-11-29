// import { useState } from "react";
// import "./Attendence.css"; // Make sure you updated the CSS file name here
// import { students } from "./studentData";
// import Header from "../../../Components/Header/Header";
// import Sidebar from "../../../Components/SideBar/SideBar"; // <-- added Sidebar import

// export default function Attendence() {
//   const [student, setStudent] = useState("Student Name");
//   const [className, setClassName] = useState("Select Class");
//   const [year, setYear] = useState("2024");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);

//   // Sidebar open state + handlers
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const toggleSidebar = (e) => {
//     if (e && e.stopPropagation) e.stopPropagation();
//     setSidebarOpen((s) => !s);
//   };
//   const closeSidebar = () => setSidebarOpen(false);

//   const filteredStudents =
//     year === "2024"
//       ? students.filter((s) => {
//           const matchStudent = student === "Student Name" || s.name === student;
//           const matchClass = className === "Select Class" || s.class === className;
//           return matchStudent && matchClass;
//         })
//       : [];

//   const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <>
//       {/* Sidebar toggled from this component (mobile) */}
//       <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

//       <Header />

//       <div className="page">
//         {/* Header */}
//         <div className="attendence-header">
//           <div className="attendence-left">
//             {/* Hamburger button added */}
//             <button
//               type="button"
//               className="hamburger"
//               aria-label={sidebarOpen ? "Close menu" : "Open menu"}
//               aria-expanded={sidebarOpen}
//               onClick={toggleSidebar}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="14"
//                 viewBox="0 0 20 14"
//                 fill="none"
//                 aria-hidden="true"
//                 focusable="false"
//               >
//                 <rect width="20" height="2" rx="1" fill="currentColor" />
//                 <rect y="6" width="12" height="2" rx="1" fill="currentColor" />
//                 <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
//               </svg>
//             </button>

//             <span className="attendence-title">Attendence</span>
//           </div>

//           <div className="attendence-filters">
//             <select
//               value={student}
//               onChange={(e) => {
//                 setStudent(e.target.value);
//                 setCurrentPage(1);
//               }}
//             >
//               <option>Student Name</option>
//               {students.map((s) => (
//                 <option key={s.id} value={s.name}>
//                   {s.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={className}
//               onChange={(e) => {
//                 setClassName(e.target.value);
//                 setCurrentPage(1);
//               }}
//             >
//               <option>Select Class</option>
//               <option>11th</option>
//               <option>12th</option>
//             </select>

//             <select
//               value={year}
//               onChange={(e) => {
//                 setYear(e.target.value);
//                 setCurrentPage(1);
//               }}
//             >
//               <option>2024</option>
//               <option>2023</option>
//               <option>2022</option>
//             </select>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="attendence-table-container">
//           {currentStudents.length > 0 ? (
//             <>
//               <table className="attendence-table">
//                 <thead>
//                   <tr>
//                     <th>Sr. No.</th>
//                     <th>Student Name</th>
//                     <th>Exam</th>
//                     <th>Class</th>
//                     <th>Parents Mobile Number</th>
//                     <th>Average Present</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentStudents.map((s) => (
//                     <tr key={s.id}>
//                       <td>{s.id}</td>
//                       <td>{s.name}</td>
//                       <td>{s.exam}</td>
//                       <td>{s.className}</td>
//                       <td>{s.parentMobile}</td>
//                       <td>{s.averagePresent}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {/* Pagination */}
//               <div className="pagination-container">
//                 <div className="pagination-controls">
//                   <button
//                     className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
//                     disabled={currentPage === 1}
//                     onClick={() => handlePageChange(currentPage - 1)}
//                   >
//                     Previous
//                   </button>

//                   {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => (
//                     <button
//                       key={i + 1}
//                       onClick={() => handlePageChange(i + 1)}
//                       className={`pagination-page ${currentPage === i + 1 ? "active" : ""}`}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}

//                   {totalPages > 3 && (
//                     <>
//                       <span className="pagination-dots">...</span>
//                       <button
//                         onClick={() => handlePageChange(totalPages)}
//                         className={`pagination-page ${currentPage === totalPages ? "active" : ""}`}
//                       >
//                         {totalPages}
//                       </button>
//                     </>
//                   )}

//                   <button
//                     className={`pagination-button ${currentPage === totalPages ? "disabled" : ""}`}
//                     disabled={currentPage === totalPages}
//                     onClick={() => handlePageChange(currentPage + 1)}
//                   >
//                     ... Next
//                   </button>
//                 </div>

//                 <div className="pagination-dropdown">
//                   <select
//                     className="pagination-select"
//                     value={itemsPerPage}
//                     onChange={(e) => {
//                       setItemsPerPage(Number(e.target.value));
//                       setCurrentPage(1);
//                     }}
//                   >
//                     {[5, 10, 20, 50].map((count) => (
//                       <option key={count} value={count}>
//                         {count}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="no-data">No data found</div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
import { useState } from "react";
import "./Attendence.css";
import { students } from "./studentData";
import Header from "../../../Components/Header/Header";
import Sidebar from "../../../Components/SideBar/SideBar";
 
export default function Attendence() {
  const [student, setStudent] = useState("Student Name");
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
          const matchStudent = student === "Student Name" || s.name === student;
          const matchClass = className === "Select Class" || s.class === className;
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
 
  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <Header />
 
      <div className="attendence-page">
        <div className="attendence-header">
          <div className="attendence-header-left">
            <button
              type="button"
              className="attendence-hamburger"
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
            <span className="attendence-title">Attendance</span>
          </div>
 
          <div className="attendence-filters">
            <select
              className="attendence-filter-select"
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
              className="attendence-filter-select"
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
 
            {/* <select
              className="attendence-filter-select"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
            </select> */}
          </div>
        </div>
 
        <div className="attendence-content">
          <div className="attendence-table-container">
            {currentStudents.length > 0 ? (
              <>
                <table className="attendence-table">
                  <thead className="attendence-table-head">
                    <tr className="attendence-table-row">
                      <th className="attendence-table-header">Sr. No.</th>
                      <th className="attendence-table-header">Student Name</th>
                      <th className="attendence-table-header">Exam</th>
                      <th className="attendence-table-header">Class</th>
                      <th className="attendence-table-header">Parents Mobile Number</th>
                      <th className="attendence-table-header">Average Present</th>
                    </tr>
                  </thead>
                  <tbody className="attendence-table-body">
                    {currentStudents.map((s) => (
                      <tr key={s.id} className="attendence-table-row">
                        <td className="attendence-table-cell" data-label="Sr. No.">{s.id}</td>
                        <td className="attendence-table-cell" data-label="Student Name">{s.name}</td>
                        <td className="attendence-table-cell" data-label="Exam">{s.exam}</td>
                        <td className="attendence-table-cell" data-label="Class">{s.className}</td>
                        <td className="attendence-table-cell" data-label="Parents Mobile">{s.parentMobile}</td>
                        <td className="attendence-table-cell" data-label="Average Present">{s.averagePresent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
 
                <div className="attendence-pagination">
                  <div className="attendence-pagination-controls">
                    <button
                      className={`attendence-pagination-button ${currentPage === 1 ? "attendence-pagination-button-disabled" : ""}`}
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
 
                    {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`attendence-pagination-page ${currentPage === i + 1 ? "attendence-pagination-page-active" : ""}`}
                      >
                        {i + 1}
                      </button>
                    ))}
 
                    {totalPages > 3 && (
                      <>
                        <span className="attendence-pagination-dots">...</span>
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className={`attendence-pagination-page ${currentPage === totalPages ? "attendence-pagination-page-active" : ""}`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
 
                    <button
                      className={`attendence-pagination-button ${currentPage === totalPages ? "attendence-pagination-button-disabled" : ""}`}
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </div>
 
                  <div className="attendence-pagination-dropdown">
                    <select
                      className="attendence-pagination-select"
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
              <div className="attendence-no-data">No data found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}