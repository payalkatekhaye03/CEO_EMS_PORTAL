import React, { useState } from "react";
import "./EditFees.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/SideBar";
import api from "../../api/api";

const EditFees = () => {
  const [formData, setFormData] = useState({
    feesId: "",
    name: "",
    feeAmount: "0",
    type: "",
    className: "",
    status: "",
    date: "",
    batch: "",
    userId: "",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feesData, setFeesData] = useState(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  // Filters states
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //  API Integration - Update Fees
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      if (!formData.feesId) {
        alert("Please enter Fees ID before updating.");
        return;
      }

      const payload = {
        feesId: parseInt(formData.feesId),
        name: formData.name,
        fee: parseFloat(formData.feeAmount),
        type: formData.type,
        studentClass: formData.className,
        status: formData.status,
        date: formData.date,
        batch: formData.batch,
      };

      // const response = await api.patch(`/fees/update?feesId=${formData.feesId}`, payload);
      // const response = await api.patch(`/fees/update?feesId=1`, payload);
  // CORRECT - Just the endpoint path
const response = await api.patch(`/fees/update?feesId=${formData.feesId}`, payload);
  console.log(" Fees updated successfully:", response.data);
      alert("Fees updated successfully!");
    } catch (error) {
      console.error(" Error updating fees:", error);
      alert("Failed to update fees. Please check console for details.");
    }
  };

  const handleGetFees = () => {
    console.log("Fetching fees for UserID:", formData.userId);
    alert(`Get Fees for User ID: ${formData.userId}`);
  };

  return (
    <div className="edit-fees-page">
      <Header />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Top Header */}
      <div className="edit-fees-header">
        <div className="edit-fees-header-left">
          <button
            className="edit-fees-hamburger"
            aria-label="Open menu"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((s) => !s)}
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
          <h2>Edit Fees</h2>
        </div>
      </div>

      {/* Fees Page */}
      <div className="edit-fees-container">
        <form className="edit-fees-form" onSubmit={handleSubmit}>
          <div className="edit-fees-form-grid">

            {/* Fees ID */}
            <div className="edit-fees-form-group">
              <label>Fees ID</label>
              <input
                type="number"
                name="feesId"
                placeholder="Enter Fees ID"
                value={formData.feesId}
                onChange={handleChange}
              />
            </div>

            <div className="edit-fees-form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="edit-fees-form-group">
              <label>Fee Amount</label>
              <input
                type="number"
                name="feeAmount"
                value={formData.feeAmount}
                onChange={handleChange}
              />
            </div>

            <div className="edit-fees-form-group">
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="Tuition">Tuition</option>
                <option value="Exam">Exam</option>
                <option value="Library">Library</option>
              </select>
            </div>

            <div className="edit-fees-form-group">
              <label>Class</label>
              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
              >
                <option value="">Select Class</option>
                <option value="10">10th</option>
                <option value="12">12th</option>
                <option value="BSc">BSc</option>
              </select>
            </div>

            <div className="edit-fees-form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>

            <div className="edit-fees-form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="edit-fees-form-group">
              <label>Batch</label>
              <input
                type="text"
                name="batch"
                placeholder="Batch"
                value={formData.batch}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="edit-fees-submit-btn">
            Save Fees
          </button>
        </form>

        {searched && feesData === null && !error && (
          <p className="edit-fees-no-fees">No fees found</p>
        )}
        {error && (
          <p className="edit-fees-no-fees" style={{ color: "red" }}>
            {error}
          </p>
        )}
        {feesData && (
          <div className="edit-fees-found">
            <p>
              Fees found for User <strong>{feesData.userId}</strong> —{" "}
              <strong>₹{feesData.amount}</strong> — {feesData.status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditFees;
