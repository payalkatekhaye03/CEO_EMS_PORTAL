import React, { useState, useEffect } from "react";
import "./EditFees.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/SideBar";
import api from "../../api/api";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";

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
  const [feesList, setFeesList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all fees
  const fetchAllFees = async () => {
    try {
      const response = await api.get("/fees/all");
      console.log("API Response:", response.data);

      const list = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data.data)
        ? response.data.data
        : Array.isArray(response.data.result)
        ? response.data.result
        : [];
      setFeesList(list);
      setFilteredList(list);
    } catch (error) {
      console.error("Error fetching fees:", error);
      setFeesList([]);
      setFilteredList([]);
    }
  };

  useEffect(() => {
    fetchAllFees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //  Add / Update data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      feesId: formData.feesId ? parseInt(formData.feesId) : undefined,
      name: formData.name,
      fee: parseFloat(formData.feeAmount),
      type: formData.type,
      studentClass: formData.className,
      status: formData.status,
      date: formData.date,
      batch: formData.batch,
      userId: formData.userId,
    };

    try {
      if (isEditing) {
        await api.patch(`/fees/update?feesId=${formData.feesId}`, payload);
        alert("Fees updated successfully!");
      } else {
        await api.post("/fees/add", payload);
        alert("Fees added successfully!");
      }

      fetchAllFees();
      setFormData({
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
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving fees:", error);
      alert("Failed to save fees.");
    }
  };

  //  Edit data
  const handleEditClick = (fee) => {
    setFormData({
      feesId: fee.feesId,
      name: fee.name,
      feeAmount: fee.fee,
      type: fee.type,
      className: fee.studentClass,
      status: fee.status,
      date: fee.date,
      batch: fee.batch,
      userId: fee.userId || "",
    }); 
    setIsEditing(true);
  };

  //  Delete data
  const handleDeleteClick = async (feesId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/fees/delete?feesId=${feesId}`);
      alert("Record deleted successfully!");
      fetchAllFees();
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete record.");
    }
  };

  // Real-time search
  useEffect(() => {
    const query = searchTerm.toLowerCase().trim();

    if (query === "") {
      setFilteredList(feesList);
      return;
    }

    const filtered = feesList.filter(
      (item) =>
        (item.name && item.name.toLowerCase().includes(query)) ||
        (item.status && item.status.toLowerCase().includes(query)) ||
        (item.feesId && item.feesId.toString().includes(query))
    );

    setFilteredList(filtered);
  }, [searchTerm, feesList]);

  return (
    <div className="edit-fees-page">
      <Header />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <div className="edit-fees-header">
        <div className="edit-fees-header-left">
          <button
            className="edit-fees-hamburger"
            onClick={() => setSidebarOpen((s) => !s)}
          >
            ☰
          </button>
          <h2>{isEditing ? "Update Fees" : "Add Fees"}</h2>
        </div>
      </div>

      {/* ===== Form Section ===== */}
      <div className="edit-fees-container">
        <form className="edit-fees-form" onSubmit={handleSubmit}>
          <div className="edit-fees-form-grid">
            <div className="edit-fees-form-group">
              <label>Fees ID</label>
              <input
                type="number"
                name="feesId"
                placeholder="Fees ID"
                value={formData.feesId}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="edit-fees-form-group">
              <label>Name</label>
              <input
                required
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="edit-fees-form-group">
              <label>Fee Amount</label>
              <input
                type="number"
                name="feeAmount"
                required
                value={formData.feeAmount}
                onChange={handleChange}
              />
            </div>

            <div className="edit-fees-form-group">
              <label>Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
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
                required
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
                required
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
                required
              />
            </div>

            <div className="edit-fees-form-group">
              <label>Batch</label>
              <input
                type="text"
                name="batch"
                placeholder="Enter Batch"
                value={formData.batch}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* ===== Save + Search ===== */}
          <div className="edit-fees-actions">
  {/* Save / Update button */}
  <button type="submit" className="edit-fees-submit-btn">
    {isEditing ? "Update Fees" : "Save Fees"}
  </button>

  {/* Search box below (right aligned) */}
  <div className="search-area-below">
    <input
      type="text"
      placeholder="Search by Name, ID, or Status"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    {/* Optional search icon button */}
    {/* <button type="button" className="search-btn">
      <FaSearch />
    </button> */}
  </div>
</div>

       

          {/* </div> */}
        </form>

        {/* ===== Table ===== */}
        <div className="pp-card pp-table-card">
          <div className="pp-table-wrap">
            <table className="pp-table">
              <thead>
                <tr>
                  <th>Fees ID</th>
                  <th>Name</th>
                  <th>Fee Amount</th>
                  <th>Type</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Batch</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {!Array.isArray(filteredList) || filteredList.length === 0 ? (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center" }}>
                      No data found.
                    </td>
                  </tr>
                ) : (
                  filteredList.map((f, i) => (
                    <tr key={i}>
                      <td>{f.feesId}</td>
                      <td>{f.name}</td>
                      <td>{f.fee}</td>
                      <td>{f.type}</td>
                      <td>{f.studentClass}</td>
                      <td>{f.status}</td>
                      <td>{f.date}</td>
                      <td>{f.batch}</td>
                      <td className="action-buttons">
                        <button
                          className="edit-icon-btn"
                          type="button"
                          onClick={() => handleEditClick(f)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="delete-icon-btn"
                          type="button"
                          onClick={() => handleDeleteClick(f.feesId)}
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
  );
};

export default EditFees;
