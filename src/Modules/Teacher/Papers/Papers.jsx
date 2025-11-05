// import React, { useState } from "react";
// import "./Papers.css";
// import Header from "../../../Components/Header/Header";
// import Sidebar from "../../../Components/SideBar/SideBar";

// const teachers = ["Teacher Name", "Alice Johnson", "Bob Singh", "C. Rao"];
// const subjects = ["Select Subject", "Physics", "Chemistry", "Mathematics"];
// const classes = ["Select Class", "Class 11", "Class 12" ]; 
// const courses = [
//   "Fundamentals of Physics",
//   "Mechanics",
//   "Electromagnetism",
//   "Optics",
// ];

// const QUESTION_TEXT = `The de-Broglie wavelength of a neutron in thermal equilibrium with heavy water
// at a temperature T (kelvin) and mass m, is:`;

// export default function Papers() {
//   const questions = Array.from({ length: 20 }, (_, i) => ({
//     id: i + 1,
//     text: QUESTION_TEXT,
//   }));

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const toggleSidebar = () => setSidebarOpen((s) => !s);
//   const closeSidebar = () => setSidebarOpen(false);

//   return (
//     <>
//       <Header/>
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
//              <label className="select-wrap">
//               <select aria-label="Select class" defaultValue={classes[0]}>
//                 {classes.map((c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </select>
//             </label>
            
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
//              {/*  Added Select Class dropdown */}
           
//           </div>
//         </header>

//             {/* <label className="select-wrap">
//               <select aria-label="Select course" defaultValue={courses[0]}>
//                 {courses.map((c) => (
//                   <option key={c} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </select>
//             </label> */}
        

//         <main className="container">
//           <div className="wrapper">
//             <div className="top">
//               <h2 className="course">Fundamentals of Physics</h2>
//               <div className="meta">20 Questions</div>
//             </div>

//             <div className="divider" />

//             <div className="questions-grid">
//               {questions.map((q) => (
//                 <article
//                   key={q.id}
//                   className="question-card small-card"
//                   aria-labelledby={`q-${q.id}`}
//                 >
//                   <div className="q-header">
//                     <h3 id={`q-${q.id}`} className="q-number">
//                       Question {q.id}
//                     </h3>
//                     <div className="timer">00:50</div>
//                   </div>

//                   <hr className="q-sep" />

//                   <p className="q-text">{q.text}</p>

//                   <div className="choices-grid compact">
//                     <div className="choice-compact">
//                       <span className="choice-inline">A)</span>
//                       <div className="fraction">
//                         <span className="num">h</span>
//                         <span className="den">m k T</span>
//                       </div>
//                     </div>

//                     <div className="choice-compact">
//                       <span className="choice-inline">B)</span>
//                       <div className="fraction">
//                         <span className="num">h</span>
//                         <span className="den">&nbsp;</span>
//                       </div>
//                     </div>

//                     <div className="choice-compact">
//                       <span className="choice-inline">C)</span>
//                       <div className="fraction">
//                         <span className="num">2h</span>
//                         <span className="den">√(3 m k T)</span>
//                       </div>
//                     </div>

//                     <div className="choice-compact">
//                       <span className="choice-inline">D)</span>
//                       <div className="fraction">
//                         <span className="num">2h</span>
//                         <span className="den">√‾</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="bottom-row small">
//                     <label className="pill">
//                       <input type="radio" name={`pick${q.id}`} /> <span>1)</span>
//                     </label>
//                     <label className="pill">
//                       <input type="radio" name={`pick${q.id}`} /> <span>2)</span>
//                     </label>
//                     <label className="pill">
//                       <input type="radio" name={`pick${q.id}`} /> <span>3)</span>
//                     </label>
//                     <label className="pill">
//                       <input type="radio" name={`pick${q.id}`} /> <span>4)</span>
//                     </label>
//                   </div>
//                 </article>
//               ))}
//             </div>
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

const teachers = [ "Alice Johnson", "Bob Singh", "C. Rao"];
const subjects = [ "Physics", "Chemistry", "Mathematics"];
const classes = [ "Class 11", "Class 12"];
export default function Papers() {  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => setSidebarOpen((s) => !s);
  const closeSidebar = () => setSidebarOpen(false);

  // ✅ API call 
  const fetchPapers = async () => {
    // Avoid calling API if filters not selected
    if (!selectedClass || !selectedTeacher || !selectedSubject) return;

    setLoading(true);
    try {
      const response = await api.get("/dropdown/paper", {
        params: {
          studentClass: selectedClass,
          teacherId: selectedTeacher,
          subject: selectedSubject,
        },
      });
      setPapers(response.data);
    } catch (error) {
      console.error("Error fetching papers:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Call API whenever dropdowns change
  useEffect(() => {
    fetchPapers();
  }, [selectedClass, selectedTeacher, selectedSubject]);

  return (
    <>
      <Header />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        showFloating={false}
      />

      <div className="papers-root">
        <header className="header">
          <div className="title-wrap">
            <button
              type="button"
              className="menu-icon"
              aria-label={sidebarOpen ? "Close menu" : "Open menu"}
              title={sidebarOpen ? "Close menu" : "Open menu"}
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
                <rect y="6" width="14" height="2" rx="1" fill="currentColor" />
                <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>
            <span className="title">Papers</span>
          </div>

          {/* ✅ Dropdown Filters */}
          <div className="controls">
            <label className="select-wrap">
              <select
                aria-label="Select class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                {classes.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="select-wrap">
              <select
                aria-label="Select teacher"
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
              >
                <option value="">Select Teacher</option>
                {teachers.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className="select-wrap">
              <select
                aria-label=""
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </header>

        <main className="container">
          {loading ? (
            <p>Loading papers...</p>
          ) : papers.length > 0 ? (
            <div className="wrapper">
              <div className="top">
                <h2 className="course">{selectedSubject}</h2>
                <div className="meta">{papers.length} Papers Found</div>
              </div>

              <div className="divider" />

              <div className="questions-grid">
                {papers.map((p) => (
                  <article key={p.id} className="question-card small-card">
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No papers found.
            </p>
          )}
        </main>
      </div>
    </>
  );
}





