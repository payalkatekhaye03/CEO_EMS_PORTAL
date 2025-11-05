
import React, { useState } from "react";
import Header from "../../../Components/Header/Header";
import "./QuestionBank.css";
import Sidebar from "../../../Components/SideBar/SideBar";

const teachers = ["Teacher Name", "Alice Johnson", "Bob Singh", "C. Rao"];
const subjects = ["Select Subject", "Physics", "Chemistry", "Mathematics"];
const courses = [
  "Fundamentals of Physics",
  "Mechanics",
  "Electromagnetism",
  "Optics",
];

const sampleQuestions = new Array(5).fill({
  text: "When light from some sources enters to the earth's atmosphere, it gets scattered. Which among the following is a reason behind scattering?",
  options: ["Option 1", "Option 2", "Option 3", "Option 4"],
  difficulty: "Easy",
});

export default function QuestionBank() {
  // Manage sidebar state locally
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
   
    <div className="qbank-root">
      <Header />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Toolbar / Page header */}
      <header
        className="qb-header"
        role="banner"
        aria-label="Question bank toolbar"
      >
        <div className="qb-title-wrap">
          <button
            type="button"
            className="qb-menu-icon"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            aria-expanded={sidebarOpen}
            onClick={handleToggle}
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

          <span className="qb-title">Question Bank</span>
        </div>

        <div className="qb-controls" role="region" aria-label="filters">
          <label className="qb-select-wrap" aria-label="Select teacher">
            <select aria-label="Select teacher" defaultValue={teachers[0]}>
              {teachers.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="qb-select-wrap" aria-label="Select subject">
            <select aria-label="Select subject" defaultValue={subjects[0]}>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="qb-select-wrap" aria-label="Select course">
            <select aria-label="Select course" defaultValue={courses[0]}>
              {courses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      {/* Main content */}
      <main className="qb-container" role="main">
        <div className="qb-wrapper">
          <div className="qb-top">
            <h2 className="qb-course">Fundamentals of Physics</h2>
            <div className="qb-meta">{sampleQuestions.length} Questions</div>
          </div>

          <div className="qb-divider" />

          <div className="qb-cards" aria-live="polite">
            {sampleQuestions.map((q, i) => (
              <article
                className="qb-card"
                key={`q-${i}`}
                aria-labelledby={`q-${i}-title`}
              >
                <div className="qb-card-content">
                  <div className="qb-index" id={`q-${i}-title`}>
                    {i + 1}.
                  </div>

                  <div className="qb-body">
                    <div className="qb-text">{q.text}</div>

                    <div className="qb-divider" />

                    <form
                      className="qb-options"
                      aria-label={`question-${i + 1}-options`}
                      onSubmit={(e) => e.preventDefault()}
                    >
                      {q.options.map((opt, j) => (
                        <label className="qb-option" key={`q-${i}-opt-${j}`}>
                          <input
                            type="radio"
                            name={`q-${i}`}
                            aria-label={`option ${j + 1}`}
                            value={opt}
                          />
                          <span className="qb-option-text">{opt}</span>
                        </label>
                      ))}
                    </form>

                    <div className="qb-divider" />

                    <div className="qb-pill-row">
                      <span className="qb-difficulty">{q.difficulty}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
