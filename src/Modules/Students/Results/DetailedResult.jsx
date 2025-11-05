import React, { useState } from "react";
import "./DetailedResult.css";
import resultImg from "../../../assets/Images/result.png";
import Header from "../../../Components/Header/Header";
import Sidebar from "../../../Components/SideBar/SideBar";

function DetailedResult({ student = { name: "Priya Patel", exam: "NEET", marks: "180/200" } }) {
  
    // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((s) => !s);
  const closeSidebar = () => setSidebarOpen(false);
  const resultData = {
    candidateName: student.name,
    examName: student.exam,
    subjectName: "Physics",
    className: "11th",
    rollNumber: 89,
    totalQuestion: 45,
    totalAttempted: 40,
    totalUnattempted: 5,
    correctAnswers: 40,
    incorrectAnswers: 5,
    score: student.marks,
  };

  return (
    <>
      <Header />
      {/* Page root */}
      <div className="detailed-result-page">
  <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        {/* Top toolbar: menu icon + title left, selects right */}
        <div className="result-toolbar">
          <div className="toolbar-left">
                   {/* ✅ Hamburger button */}
            <button
              className="hamburger"
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
            <div className="page-title">Result</div>
          </div>

          <div className="toolbar-controls">
            <select className="pill-select" defaultValue="Student Name" aria-label="Student Name">
              <option>Student Name</option>
              <option>Priya Patel</option>
              <option>Ananya Desai</option>
              <option>Kavya Nair</option>
            </select>

            <select className="pill-select" defaultValue="Select Class" aria-label="Select Class">
              <option>Select Class</option>
              <option>11th</option>
              <option>12th</option>
            </select>

            <select className="pill-select" defaultValue="2024" aria-label="Year">
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
            </select>
          </div>
        </div>

        {/* Blue stat cards area */}
        <div className="result-header-details">
          <div className="card-box">
            <div className="card-item">
              <span className="card-label">Candidate Name -</span>
              <span className="card-value">{resultData.candidateName}</span>
            </div>
            <div className="card-item">
              <span className="card-label">Exam Name -</span>
              <span className="card-value">{resultData.examName}</span>
            </div>
            <div className="card-item">
              <span className="card-label">Subject Name -</span>
              <span className="card-value">{resultData.subjectName}</span>
            </div>
          </div>

          <div className="card-box">
            <div className="card-item">
              <span className="card-label">Class -</span>
              <span className="card-value">{resultData.className}</span>
            </div>
            <div className="card-item">
              <span className="card-label">Roll Number -</span>
              <span className="card-value">{resultData.rollNumber}</span>
            </div>
          </div>
        </div>

        {/* Chart / illustration card */}
        <div className="score-image-wrapper">
          <img src={resultImg} alt="Girl with flag" className="score-image" />
          <div className="score-axis">
            <div className="score-axis-line"></div>
            <div className="score-axis-labels">
              {Array.from({ length: 11 }, (_, i) => (
                <span key={i} className="score-axis-label">{i * 10}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Score card */}
        <div className="score-card">
          <h3>Score Card</h3>
          <div className="score-details">
            <div className="score-item">
              <span className="score-label">Total Questions:</span>
              <span className="score-value">{resultData.totalQuestion}</span>
            </div>
            <div className="score-item">
              <span className="score-label">Total Attempted:</span>
              <span className="score-value">{resultData.totalAttempted}</span>
            </div>
            <div className="score-item">
              <span className="score-label">Total Unattempted:</span>
              <span className="score-value">{resultData.totalUnattempted}</span>
            </div>
            <div className="score-item">
              <span className="score-label">Correct Answers:</span>
              <span className="score-value">{resultData.correctAnswers}</span>
            </div>
            <div className="score-item">
              <span className="score-label">Incorrect Answers:</span>
              <span className="score-value">{resultData.incorrectAnswers}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailedResult;
