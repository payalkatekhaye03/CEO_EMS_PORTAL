// import React, { useState, useEffect } from "react";
// import "./Papers.css";
// import Header from "../../../Components/Header/Header";
// import Sidebar from "../../../Components/SideBar/SideBar";
// import api from "../../../api/api"; 

// const teachers = ["Teacher Name", "Alice Johnson", "Bob Singh", "C. Rao"];
// const subjects = ["Select Subject", "Physics", "Chemistry", "Mathematics"];
// const courses = [
//   "Fundamentals of Physics",
//   "Mechanics",
//   "Electromagnetism",
//   "Optics",
// ];

// export default function Papers() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [papers, setPapers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const toggleSidebar = () => setSidebarOpen((s) => !s);
//   const closeSidebar = () => setSidebarOpen(false);

//   useEffect(() => {
//     const fetchPapers = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get("/papers/papers?page=0&size=10");
//         // console.log(response.data);
//         setPapers(response.data.content || response.data); 
//         console.error("Error fetching papers:", err);
//         setError("Failed to load papers. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPapers();
//   }, []);

//   return (
//     <>
//       <Header />
//       <Sidebar
//         isOpen={sidebarOpen}
//         onClose={closeSidebar}
//         showFloating={false}
//       />

//       <div className="papers-root">
//         <header className="header">
//           <div className="title-wrap">
//             <button
//               type="button"
//               className="menu-icon"
//               aria-label={sidebarOpen ? "Close menu" : "Open menu"}
//               title={sidebarOpen ? "Close menu" : "Open menu"}
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
//                 <rect y="6" width="14" height="2" rx="1" fill="currentColor" />
//                 <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
//               </svg>
//             </button>
//             <span className="title">Papers</span>
//           </div>

//           <div className="controls">
//             <label className="select-wrap">
//               <select aria-label="Select teacher" defaultValue={teachers[0]}>
//                 {teachers.map((t) => (
//                   <option key={t} value={t}>
//                     {t}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <label className="select-wrap">
//               <select aria-label="Select subject" defaultValue={subjects[0]}>
//                 {subjects.map((s) => (
//                   <option key={s} value={s}>
//                     {s}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <label className="select-wrap">
//               <select aria-label="Select course" defaultValue={courses[0]}>
//                 {courses.map((c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </select>
//             </label>
//           </div>
//         </header>

//         <main className="container">
//           <div className="wrapper">
//             {loading ? (
//               <p style={{ textAlign: "center", marginTop: "50px" }}>
//                 Loading papers...
//               </p>
//             ) : error ? (
//               <p style={{ color: "red", textAlign: "center" }}>{error}</p>
//             ) : papers.length === 0 ? (
//               <p style={{ textAlign: "center" }}>No papers found.</p>
//             ) : (
//               <>
//                 <div className="top">
//                   <h2 className="course">Available Papers</h2>
//                   <div className="meta">{papers.length} Papers</div>
//                 </div>

//                 <div className="divider" />

//                 <div className="questions-grid">
//                   {papers.map((paper, index) => (
//                     <article
//                       key={paper.id || index}
//                       className="question-card small-card"
//                     >
//                       <div className="q-header">
//                         <h3 className="q-number">{paper.paperName || `Paper ${index + 1}`}</h3>
//                         <div className="timer">{paper.duration || "00:50"}</div>
//                       </div>

//                       <hr className="q-sep" />

//                       <p className="q-text">
//                         {paper.description || "No description available."}
//                       </p>

//                       <div className="bottom-row small">
//                         <span>Subject: {paper.subject || "N/A"}</span>
//                         <span>Marks: {paper.totalMarks || "N/A"}</span>
//                       </div>
//                     </article>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import "./Papers.css";
import Header from "../../../Components/Header/Header";
import Sidebar from "../../../Components/SideBar/SideBar";
import api from "../../../api/api";

export default function Papers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [subject, setSubject] = useState("All");
  const [classFilter, setClassFilter] = useState("All");
  const [status, setStatus] = useState("All");

  const toggleSidebar = () => setSidebarOpen((s) => !s);
  const closeSidebar = () => setSidebarOpen(false);

  //  Fetch papers
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        setLoading(true);
        const response = await api.get("/papers/papers?page=0&size=10");
        const data = response.data.content || response.data;
        setPapers(data);
        setFilteredPapers(data);
      } catch (err) {
        console.error("Error fetching papers:", err);
        setError("Failed to load papers. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchPapers();
  }, []);

  // Apply filters (client-side)
  useEffect(() => {
    let filtered = [...papers];

    // Filter by subject (matches in title or pattern name)
    if (subject !== "All") {
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(subject.toLowerCase()) ||
          p.patternName?.toLowerCase().includes(subject.toLowerCase())
      );
    }

    // Filter by class
    if (classFilter !== "All") {
      filtered = filtered.filter((p) => p.studentClass === classFilter);
    }

    // Filter by live/past
    if (status !== "All") {
      filtered = filtered.filter((p) =>
        status === "Live" ? p.isLive : !p.isLive
      );
    }

    setFilteredPapers(filtered);
  }, [subject, classFilter, status, papers]);

  return (
    <>
      <Header />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} showFloating={false} />

      <div className="papers-root">
        <header className="header">
          <div className="title-wrap">
            <button
              type="button"
              className="menu-icon"
              onClick={toggleSidebar}
              aria-label={sidebarOpen ? "Close menu" : "Open menu"}
              title={sidebarOpen ? "Close menu" : "Open menu"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
              >
                <rect width="20" height="2" rx="1" fill="currentColor" />
                <rect y="6" width="14" height="2" rx="1" fill="currentColor" />
                <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>
            <span className="title">Papers</span>
          </div>

          {/*  Dropdown filters */}
          <div className="controls">
            <label className="select-wrap">
              <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="All">All Subjects</option>
                <option value="Physics">Physics</option>
                <option value="Maths">Maths</option>
                <option value="Chemistry">Chemistry</option>
              </select>
            </label>

            <label className="select-wrap">
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
              >
                <option value="All">All Classes</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </label>

            <label className="select-wrap">
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="All">All</option>
                <option value="Live">Live</option>
                <option value="Past">Past</option>
              </select>
            </label>
          </div>
        </header>

        <main className="container">
          <div className="wrapper">
            {loading ? (
              <p style={{ textAlign: "center", marginTop: "50px" }}>
                Loading papers...
              </p>
            ) : error ? (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            ) : filteredPapers.length === 0 ? (
              <p style={{ textAlign: "center" }}>No papers found.</p>
            ) : (
              <>
                <div className="top">
                  <h2 className="course">Available Papers</h2>
                  <div className="meta">{filteredPapers.length} Papers</div>
                </div>

                <div className="divider" />

                <div className="questions-grid">
                  {filteredPapers.map((paper, index) => (
                    <article key={paper.paperId || index} className="question-card small-card">
                      <div className="q-header">
                        <h3 className="q-number">{paper.title}</h3>
                        <div className="timer">
                          {paper.isLive ? "LIVE" : "00:50"}
                        </div>
                      </div>

                      <hr className="q-sep" />

                      <p className="q-text">{paper.description}</p>

                      <div className="bottom-row small">
                        <span>Class: {paper.studentClass}</span>
                        <span>Pattern: {paper.patternName}</span>
                        <span>Questions: {paper.questions?.length || 0}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
