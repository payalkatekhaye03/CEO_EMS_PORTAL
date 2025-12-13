import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../../../Components/Header/Header";
import Sidebar from "../../../Components/SideBar/SideBar";
import "./SalaryStructure.css";
import api from "../../../api/api";

export default function SalaryStructure() {
  const [form, setForm] = useState({
    teacherId: "",
    teacherName: "",
    perDaySalary: "",
    annualSalary: "",
  });

  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleToggle = () => setSidebarOpen(!sidebarOpen);

  
  // Fetch Teachers (Corrected API)
  // ------------------------------
  const fetchTeachers = async () => {
    try {
      const res = await api.get("/teachers/allTeacher");
      console.log("Teacher API:", res.data);

      setTeachers(res.data.data || []); // CORRECT PATH
    } catch (err) {
      console.log("Teacher fetch failed", err);
    }
  };

  
  // Fetch Salary Structure List
  // ------------------------------
  const fetchSalaryStructures = async () => {
    try {
      const res = await api.get("/teacherSalary/structures");
      setRecords(res.data.data || []);
    } catch (error) {
      alert("Failed to load salary structures");
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchSalaryStructures();
  }, []);

  // ------------------------------
  // When Teacher Dropdown Changes
  // ------------------------------
  const handleTeacherSelect = (e) => {
    const selectedName = e.target.value;

    const teacher = teachers.find((t) => t.name === selectedName);

    setForm((prev) => ({
      ...prev,
      teacherName: selectedName,
      teacherId: teacher ? teacher.teacherId : "",
    }));
  };

  // ------------------------------
  // Handle Input Change
  // ------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ------------------------------
  // SAVE Salary Structure
  // ------------------------------
  const handleSave = async () => {
    if (!form.teacherId || !form.perDaySalary || !form.annualSalary) {
      return alert("Please fill all required fields");
    }

    const payload = {
      teacherId: Number(form.teacherId),
      perDaySalary: Number(form.perDaySalary),
      annualSalary: Number(form.annualSalary),
    };

    try {
      await api.post("/teacherSalary/structure", payload);

      alert("Salary Structure Added Successfully!");

      setForm({
        teacherId: "",
        teacherName: "",
        perDaySalary: "",
        annualSalary: "",
      });

      fetchSalaryStructures();
    } catch (error) {
      alert("Failed to save salary structure");
    }
  };

  // ------------------------------
  // EDIT Handler
  // ------------------------------
  const handleEdit = (item) => {
    setForm({
      teacherId: item.teacherId ?? "",
      teacherName: item.teacherName ?? "",
      perDaySalary: item.perDaySalary ?? "",
      annualSalary: item.annualSalary ?? "",
    });

    setIsEditMode(true); // 🔥 Enable update mode
  };
  const handleUpdate = async () => {
    if (!form.teacherId) return alert("Teacher ID missing!");

    const payload = {
      perDaySalary: Number(form.perDaySalary),
      annualSalary: Number(form.annualSalary),
    };

    try {
      const res = await api.patch(
        `/teacherSalary/update?teacherId=${form.teacherId}`,
        payload
      );

      alert("Salary Updated Successfully!");

      // Clear form
      setForm({
        teacherId: "",
        teacherName: "",
        perDaySalary: "",
        annualSalary: "",
      });

      setIsEditMode(false);

      fetchSalaryStructures();
    } catch (error) {
      alert("Failed to update salary");
      console.log(error);
    }
  };

  // ------------------------------
  // DELETE Salary Structure (Professional Version)
  // ------------------------------
  const handleDelete = async (teacherId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this salary structure?"
      );
      if (!confirmDelete) return;

      console.log("Deleting Salary Structure for Teacher ID:", teacherId);

      // Backend DELETE API call
      const response = await api.delete(
        `/teacherSalary/deleteStructure?teacherId=${teacherId}`
      );

      console.log("Delete Response:", response.data);

      alert("Salary structure deleted successfully!");

      // Refresh table after delete
      fetchSalaryStructures();
    } catch (error) {
      console.error("Delete Error:", error);

      if (error.code === "ERR_NETWORK" || error.message.includes("Network")) {
        alert("Network error! Please try again.");
      } else {
        alert(
          error?.response?.data?.message || "Failed to delete salary structure."
        );
      }
    }
  };

  return (
    <div className="salarystructure-layout">
      <Header onToggle={handleToggle} />

      <div className="salarystructure-content">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="salarystructure-page-container">
          <h2 className="salarystructure-title">Add Salary Structure</h2>

          {/* ---------------- FORM ---------------- */}
          <div className="salarystructure-form">
            {/* Teacher ID (AUTO FILLED) */}
            <div className="salarystructure-field">
              <label className="salarystructure-label">Teacher ID *</label>
              <input
                className="salarystructure-input"
                type="text"
                name="teacherId"
                value={form.teacherId}
                readOnly
              />
            </div>

            {/* Teacher Name Dropdown */}
            <div className="salarystructure-field">
              <label className="salarystructure-label">Teacher Name *</label>
              <select
                className="salarystructure-input"
                name="teacherName"
                value={form.teacherName}
                onChange={handleTeacherSelect}
              >
                <option value="">Select Teacher</option>

                {teachers.map((t) => (
                  <option key={t.teacherId} value={t.teacherName}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Per Day Salary */}
            <div className="salarystructure-field">
              <label className="salarystructure-label">
                Per Day Salary (₹) *
              </label>
              <input
                className="salarystructure-input"
                type="number"
                name="perDaySalary"
                value={form.perDaySalary}
                onChange={handleChange}
              />
            </div>

            {/* Annual Salary */}
            <div className="salarystructure-field">
              <label className="salarystructure-label">
                Annual Salary (₹) *
              </label>
              <input
                className="salarystructure-input"
                type="number"
                name="annualSalary"
                value={form.annualSalary}
                onChange={handleChange}
              />
            </div>

            {/* BUTTONS */}
            <div className="salarystructure-btnrow">
              <button
                className="salarystructure-backbtn"
                onClick={() => navigate("/teacher/salary")}
              >
                Back to List
              </button>

              <button
                className="salarystructure-savebtn"
                onClick={isEditMode ? handleUpdate : handleSave}
              >
                {isEditMode ? "Update" : "Save"}
              </button>
            </div>
          </div>

          {/* ---------------- TABLE ---------------- */}
          <div className="salarystructure-table">
            <table className="salarystructure-tablebox">
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Teacher ID</th>
                  <th>Teacher Name</th>
                  <th>Per Day Salary</th>
                  <th>Annual Salary</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="salarystructure-nodata">
                      No records found
                    </td>
                  </tr>
                ) : (
                  records.map((item, index) => (
                    <tr key={item.teacherId}>
                      <td>{index + 1}</td>
                      <td>{item.teacherId}</td>
                      <td>{item.teacherName}</td>
                      <td>₹{item.perDaySalary}</td>
                      <td>₹{item.annualSalary}</td>
                      <td>
                        <span
                          className={
                            item.status === "ACTIVE"
                              ? "status-active"
                              : "status-inactive"
                          }
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>{new Date(item.createdAt).toLocaleString()}</td>
                      <td>{new Date(item.updatedAt).toLocaleString()}</td>

                      <td>
                        <div className="salarystructure-actions">
                          <button
                            className="salarystructure-editbtn"
                            onClick={() => handleEdit(item)}
                          >
                            <FaEdit />
                          </button>

                          <button
                            className="salarystructure-deletebtn"
                            onClick={() => handleDelete(item.teacherId)}
                          >
                            <FaTrash />
                          </button>
                        </div>
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
  );
}
