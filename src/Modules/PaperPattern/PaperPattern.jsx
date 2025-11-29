import React, { useState, useEffect } from "react";
import "./PaperPattern.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/SideBar";
import api from "../../api/api";
import { FaEdit, FaTrash } from "react-icons/fa";

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
  const [editId, setEditId] = useState(null);

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  //  Fetch all paper patterns
  useEffect(() => {
    fetchPatterns();
  }, []);

  async function fetchPatterns() {
    try {
      const response = await api.get("/paper-patterns");
      setPatterns(response.data || []);
    } catch (error) {
      console.error("Error fetching paper patterns:", error);
    }
  }

  //  Handle form input changes
  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "type") {
      setForm((s) => {
        const total = Number(s.noOfQuestions) || 0;
        let mcq = 0,
          desc = 0;
        if (value === "MCQ") mcq = total;
        else if (value === "DESCRIPTIVE") desc = total;
        else if (value === "MCQ_DESCRIPTIVE") {
          mcq = Math.floor(total / 2);
          desc = total - mcq;
        }
        return { ...s, type: value, mcq, descriptive: desc };
      });
    } else if (name === "noOfQuestions") {
      setForm((s) => {
        const total = Number(value) || 0;
        let mcq = 0,
          desc = 0;
        if (s.type === "MCQ") mcq = total;
        else if (s.type === "DESCRIPTIVE") desc = total;
        else if (s.type === "MCQ_DESCRIPTIVE") {
          mcq = Math.floor(total / 2);
          desc = total - mcq;
        }
        return { ...s, noOfQuestions: value, mcq, descriptive: desc };
      });
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  }

  // Submit / Update form
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
      if (editId) {
        await api.put(`/paper-patterns/${editId}`, payload);
        alert("Paper Pattern Updated Successfully!");
      } else {
        await api.post("/paper-patterns/add", payload);
        alert("Paper Pattern Added Successfully!");
      }
      fetchPatterns();
      resetForm();
    } catch (error) {
      console.error("Error saving paper pattern:", error);
      alert("Failed to save paper pattern. Check console for details.");
    }
  }

  // Edit record
  function handleEditClick(pattern) {
    setEditId(pattern.paperPatternId);
    setForm({
      subject: pattern.subject,
      type: pattern.type,
      patternName: pattern.patternName,
      noOfQuestions: pattern.noOfQuestion,
      requiredQuestions: pattern.requiredQuestion,
      negativeMarks: pattern.negativeMarks,
      marks: pattern.marks,
      mcq: pattern.mcq,
      descriptive: pattern.descriptive,
    });
  }

  // Delete record
  async function handleDeleteClick(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/paper-patterns/${id}`);
      alert("Paper Pattern Deleted Successfully!");
      fetchPatterns();
    } catch (error) {
      console.error("Error deleting paper pattern:", error);
      alert("Failed to delete paper pattern.");
    }
  }

  // Reset form
  function resetForm() {
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
    setEditId(null);
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
            <h1 className="pp-title">
              {editId ? "Edit Paper Pattern" : "Create Paper Pattern"}
            </h1>
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

              {form.type === "MCQ_DESCRIPTIVE" && (
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
              )}

              {form.type === "MCQ" && (
                <div className="pp-field">
                  <label>MCQ</label>
                  <input
                    name="mcq"
                    type="number"
                    value={form.mcq}
                    onChange={handleChange}
                  />
                </div>
              )}

              {form.type === "DESCRIPTIVE" && (
                <div className="pp-field">
                  <label>Descriptive</label>
                  <input
                    name="descriptive"
                    type="number"
                    value={form.descriptive}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="pp-submit-wrap">
                <button type="submit" className="pp-submit">
                  {editId ? "Update" : "Submit"}
                </button>
                {editId && (
                  <button
                    type="button"
                    className="pp-cancel"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patterns.length === 0 ? (
                    <tr>
                      <td colSpan="11" style={{ textAlign: "center" }}>
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
                        <td className="action-buttons">
                          <button
                            className="edit-icon-btn"
                            type="button"
                            onClick={() => handleEditClick(p)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="delete-icon-btn"
                            type="button"
                            onClick={() => handleDeleteClick(p.paperPatternId)}
                          >
                            <FaTrash />
                          </button>
                        </td>
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
