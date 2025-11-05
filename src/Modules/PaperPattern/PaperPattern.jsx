// import React, { useState } from "react";
// import "./PaperPattern.css";
// import Header from "../../Components/Header/Header";
// import Sidebar from "../../Components/SideBar/SideBar";

// export default function PaperPattern() {
//   const [form, setForm] = useState({
//     subject: "",
//     type: "",
//     patternName: "",
//     noOfQuestions: "",
//     requiredQuestions: "",
//     negativeMarks: "",
//     marks: "",
//     mcq: "",
//     descriptive: ""
//   });

//   const [patterns, setPatterns] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => setSidebarOpen((s) => !s);

//   function handleChange(e) {
//     const { name, value } = e.target;

//     // Handle auto-fill logic
//     if (name === "type") {
//       setForm((s) => {
//         let mcq = s.mcq;
//         let desc = s.descriptive;

//         if (value === "MCQ") {
//           mcq = s.noOfQuestions;
//           desc = 0;
//         } else if (value === "DESCRIPTIVE") {
//           desc = s.noOfQuestions;
//           mcq = 0;
//         } else if (value === "MCQ_DESCRIPTIVE") {
//           const total = Number(s.noOfQuestions) || 0;
//           mcq = Math.floor(total / 2);
//           desc = total - mcq;
//         }

//         return { ...s, type: value, mcq, descriptive: desc };
//       });
//     } else if (name === "noOfQuestions") {
//       setForm((s) => {
//         let mcq = s.mcq;
//         let desc = s.descriptive;
//         const total = Number(value) || 0;

//         if (s.type === "MCQ") {
//           mcq = total;
//           desc = 0;
//         } else if (s.type === "DESCRIPTIVE") {
//           desc = total;
//           mcq = 0;
//         } else if (s.type === "MCQ_DESCRIPTIVE") {
//           mcq = Math.floor(total / 2);
//           desc = total - mcq;
//         }

//         return { ...s, noOfQuestions: value, mcq, descriptive: desc };
//       });
//     } else {
//       setForm((s) => ({ ...s, [name]: value }));
//     }
//   }

//   function handleSubmit(e) {
//     e.preventDefault();

//     const newId = patterns.length > 0 ? patterns[0].id + 1 : 1;

//     const newPattern = {
//       id: newId,
//       subject: form.subject || "Subject",
//       type: form.type || "MCQ_DESCRIPTIVE",
//       name: form.patternName || "Pattern",
//       noQ: Number(form.noOfQuestions) || 0,
//       required: Number(form.requiredQuestions) || 0,
//       negative: Number(form.negativeMarks) || 0,
//       marks: Number(form.marks) || 0,
//       mcq: Number(form.mcq) || 0,
//       desc: Number(form.descriptive) || 0
//     };

//     setPatterns((p) => [...p, newPattern]);

//     setForm({
//       subject: "",
//       type: "",
//       patternName: "",
//       noOfQuestions: "",
//       requiredQuestions: "",
//       negativeMarks: "",
//       marks: "",
//       mcq: "",
//       descriptive: ""
//     });
//   }

//   return (
//     <div className="pp-root">
//       <Header />
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className="pp-page">
//         <div className="pp-container">
//           <header className="pp-header">
//             <button
//               className="pp-hamburger"
//               aria-label="Toggle menu"
//               aria-expanded={sidebarOpen}
//               onClick={toggleSidebar}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="14"
//                 viewBox="0 0 20 14"
//                 fill="none"
//               >
//                 <rect width="20" height="2" rx="1" fill="currentColor" />
//                 <rect y="6" width="12" height="2" rx="1" fill="currentColor" />
//                 <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
//               </svg>
//             </button>
//             <h1 className="pp-title">Create Paper Patterns</h1>
//           </header>

//           {/* Form */}
//           <div className="pp-card pp-form-card">
//             <form className="pp-form-grid" onSubmit={handleSubmit}>
//               <div className="pp-field">
//                 <label>Subject</label>
//                 <select name="subject" value={form.subject} onChange={handleChange}>
//                   <option value="">Select Subject</option>
//                   <option>Physics</option>
//                   <option>Math</option>
//                   <option>Biology</option>
//                   <option>Chemistry</option>
//                 </select>
//               </div>

//               <div className="pp-field">
//                 <label>Type</label>
//                 <select name="type" value={form.type} onChange={handleChange}>
//                   <option value="">Select Type</option>
//                   <option value="MCQ">MCQ</option>
//                   <option value="DESCRIPTIVE">DESCRIPTIVE</option>
//                   <option value="MCQ_DESCRIPTIVE">MCQ_DESCRIPTIVE</option>
//                 </select>
//               </div>

//               <div className="pp-field">
//                 <label>Pattern Name</label>
//                 <input
//                   name="patternName"
//                   value={form.patternName}
//                   onChange={handleChange}
//                   placeholder="Pattern Name"
//                 />
//               </div>

//               <div className="pp-field">
//                 <label>No of Questions</label>
//                 <input
//                   name="noOfQuestions"
//                   type="number"
//                   value={form.noOfQuestions}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="pp-field">
//                 <label>Required Questions</label>
//                 <input
//                   name="requiredQuestions"
//                   type="number"
//                   value={form.requiredQuestions}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="pp-field">
//                 <label>Negative Marks</label>
//                 <input
//                   name="negativeMarks"
//                   type="number"
//                   value={form.negativeMarks}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="pp-field">
//                 <label>Marks</label>
//                 <input
//                   name="marks"
//                   type="number"
//                   value={form.marks}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="pp-field">
//                 <label>MCQ</label>
//                 <input
//                   name="mcq"
//                   type="number"
//                   value={form.mcq}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="pp-field">
//                 <label>Descriptive</label>
//                 <input
//                   name="descriptive"
//                   type="number"
//                   value={form.descriptive}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="pp-submit-wrap">
//                 <button type="submit" className="pp-submit">
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Table */}
//           <div className="pp-card pp-table-card">
//             <div className="pp-table-wrap">
//               <table className="pp-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Subject</th>
//                     <th>Type</th>
//                     <th>Pattern Name</th>
//                     <th>No. of Questions</th>
//                     <th>Required Questions</th>
//                     <th>Negative Marks</th>
//                     <th>Marks</th>
//                     <th>MCQ</th>
//                     <th>Descriptive</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {patterns.length === 0 ? (
//                     <tr>
//                       <td colSpan="10" style={{ textAlign: "center" }}>
//                         No data yet. Add a pattern.
//                       </td>
//                     </tr>
//                   ) : (
//                     patterns.map((p) => (
//                       <tr key={p.id}>
//                         <td>{p.id}</td>
//                         <td>{p.subject}</td>
//                         <td>{p.type}</td>
//                         <td>{p.name}</td>
//                         <td>{p.noQ}</td>
//                         <td>{p.required}</td>
//                         <td>{p.negative}</td>
//                         <td>{p.marks}</td>
//                         <td>{p.mcq}</td>
//                         <td>{p.desc}</td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "./PaperPattern.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/SideBar";
//import api from "../../api"; // ✅ Import your base URL file
import api from "../../api//api";
export default function PaperPattern() {
  const [form, setForm] = useState({
    subject: "",
    type: "",
    patternName: "",
    noOfQuestions: "",
    requiredQuestions: "",
    negativeMarks: "",
    marks: "",
    mcq: "",
    descriptive: "",
  });

  const [patterns, setPatterns] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  // ✅ GET API - Fetch existing paper patterns
  useEffect(() => {
    async function fetchPatterns() {
      try {
        const response = await api.get("/paper-patterns");
        setPatterns(response.data || []);
      } catch (error) {
        console.error("Error fetching paper patterns:", error);
      }
    }
    fetchPatterns();
  }, []);

  // ✅ Handle input change
  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "type") {
      setForm((s) => {
        let mcq = s.mcq;
        let desc = s.descriptive;

        if (value === "MCQ") {
          mcq = s.noOfQuestions;
          desc = 0;
        } else if (value === "DESCRIPTIVE") {
          desc = s.noOfQuestions;
          mcq = 0;
        } else if (value === "MCQ_DESCRIPTIVE") {
          const total = Number(s.noOfQuestions) || 0;
          mcq = Math.floor(total / 2);
          desc = total - mcq;
        }

        return { ...s, type: value, mcq, descriptive: desc };
      });
    } else if (name === "noOfQuestions") {
      setForm((s) => {
        let mcq = s.mcq;
        let desc = s.descriptive;
        const total = Number(value) || 0;

        if (s.type === "MCQ") {
          mcq = total;
          desc = 0;
        } else if (s.type === "DESCRIPTIVE") {
          desc = total;
          mcq = 0;
        } else if (s.type === "MCQ_DESCRIPTIVE") {
          mcq = Math.floor(total / 2);
          desc = total - mcq;
        }

        return { ...s, noOfQuestions: value, mcq, descriptive: desc };
      });
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  }

  // ✅ POST API - Submit paper pattern
  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      subject: form.subject,
      type: form.type,
      patternName: form.patternName,
      noOfQuestion: Number(form.noOfQuestions),
      requiredQuestion: Number(form.requiredQuestions),
      negativeMarks: Number(form.negativeMarks),
      marks: Number(form.marks),
      mcq: Number(form.mcq),
      descriptive: Number(form.descriptive),
    };

    try {
      const response = await api.post("/paper-patterns/add", payload);
      alert("Paper Pattern Added Successfully!");

      // Refresh list after adding
      const getResponse = await api.get("/paper-patterns");
      setPatterns(getResponse.data || []);

      // Clear form
      setForm({
        subject: "",
        type: "",
        patternName: "",
        noOfQuestions: "",
        requiredQuestions: "",
        negativeMarks: "",
        marks: "",
        mcq: "",
        descriptive: "",
      });
    } catch (error) {
      console.error("Error adding paper pattern:", error);
      alert("Failed to add paper pattern. Check console for details.");
    }
  }

  return (
    <div className="pp-root">
      <Header />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="pp-page">
        <div className="pp-container">
          <header className="pp-header">
            <button
              className="pp-hamburger"
              aria-label="Toggle menu"
              aria-expanded={sidebarOpen}
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
                <rect y="6" width="12" height="2" rx="1" fill="currentColor" />
                <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>
            <h1 className="pp-title">Create Paper Patterns</h1>
          </header>

          {/* Form */}
          <div className="pp-card pp-form-card">
            <form className="pp-form-grid" onSubmit={handleSubmit}>
              <div className="pp-field">
                <label>Subject</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                >
                  <option value="">Select Subject</option>
                  <option>Physics</option>
                  <option>Math</option>
                  <option>Biology</option>
                  <option>Chemistry</option>
                </select>
              </div>

              <div className="pp-field">
                <label>Type</label>
                <select name="type" value={form.type} onChange={handleChange}>
                  <option value="">Select Type</option>
                  <option value="MCQ">MCQ</option>
                  <option value="DESCRIPTIVE">DESCRIPTIVE</option>
                  <option value="MCQ_DESCRIPTIVE">MCQ_DESCRIPTIVE</option>
                </select>
              </div>

              <div className="pp-field">
                <label>Pattern Name</label>
                <input
                  name="patternName"
                  value={form.patternName}
                  onChange={handleChange}
                  placeholder="Pattern Name"
                />
              </div>

              <div className="pp-field">
                <label>No of Questions</label>
                <input
                  name="noOfQuestions"
                  type="number"
                  value={form.noOfQuestions}
                  onChange={handleChange}
                />
              </div>

              <div className="pp-field">
                <label>Required Questions</label>
                <input
                  name="requiredQuestions"
                  type="number"
                  value={form.requiredQuestions}
                  onChange={handleChange}
                />
              </div>

              <div className="pp-field">
                <label>Negative Marks</label>
                <input
                  name="negativeMarks"
                  type="number"
                  value={form.negativeMarks}
                  onChange={handleChange}
                />
              </div>

              <div className="pp-field">
                <label>Marks</label>
                <input
                  name="marks"
                  type="number"
                  value={form.marks}
                  onChange={handleChange}
                />
              </div>

              {form.type === "MCQ_DESCRIPTIVE" ?
                <>
               <div className="pp-field">
                  <label>MCQ</label>
                  <input
                    name="mcq"
                    type="number"
                    value={form.mcq}
                    onChange={handleChange}
                  />
                </div> 
                     <div className="pp-field">
                  <label>Descriptive</label>
                  <input
                    name="descriptive"
                    type="number"
                    value={form.descriptive}
                    onChange={handleChange}
                  />
                </div>
                </>
                : ("") }  
                
              {form.type === "MCQ" ? (
                <div className="pp-field">
                  <label>MCQ</label>
                  <input
                    name="mcq"
                    type="number"
                    value={form.mcq}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                ""
              )}

              {form.type === "DESCRIPTIVE" ? (
                <div className="pp-field">
                  <label>Descriptive</label>
                  <input
                    name="descriptive"
                    type="number"
                    value={form.descriptive}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                ""
              )}


              <div className="pp-submit-wrap">
                <button type="submit" className="pp-submit">
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Table */}
          <div className="pp-card pp-table-card">
            <div className="pp-table-wrap">
              <table className="pp-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Subject</th>
                    <th>Type</th>
                    <th>Pattern Name</th>
                    <th>No. of Questions</th>
                    <th>Required Questions</th>
                    <th>Negative Marks</th>
                    <th>Marks</th>
                    <th>MCQ</th>
                    <th>Descriptive</th>
                  </tr>
                </thead>
                <tbody>
                  {patterns.length === 0 ? (
                    <tr>
                      <td colSpan="10" style={{ textAlign: "center" }}>
                        No data yet. Add a pattern.
                      </td>
                    </tr>
                  ) : (
                    patterns.map((p) => (
                      <tr key={p.paperPatternId}>
                        <td>{p.paperPatternId}</td>
                        <td>{p.subject}</td>
                        <td>{p.type}</td>
                        <td>{p.patternName}</td>
                        <td>{p.noOfQuestion}</td>
                        <td>{p.requiredQuestion}</td>
                        <td>{p.negativeMarks}</td>
                        <td>{p.marks}</td>
                        <td>{p.mcq}</td>
                        <td>{p.descriptive}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
