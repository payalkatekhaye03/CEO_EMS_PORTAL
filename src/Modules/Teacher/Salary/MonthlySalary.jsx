import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../Components/Header/Header";
import Sidebar from "../../../Components/SideBar/SideBar";
import "./MonthlySalary.css";
import api from "../../../api/api";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function MonthlySalary() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  const [activeTeachers, setActiveTeachers] = useState([]);
  const [structures, setStructures] = useState([]);

  const [filters, setFilters] = useState({
    teacherId: "",
    teacherName: "",
    month: "",
    year: "",
  });

  // =======================
  // INITIAL LOAD
  // =======================
  useEffect(() => {
    fetchSalaryRecords();
    fetchActiveTeachers();
  }, []);

  
  // =======================
  // FETCH ACTIVE TEACHERS
  // =======================
  const fetchActiveTeachers = async () => {
    try {
      const res = await api.get("/teacherSalary/activeTeachers");
      console.log("Active Teachers API:", res.data);

      setActiveTeachers(res.data.data || []);
    } catch (err) {
      console.error("Active Teachers Fetch Error:", err);
      alert("Failed to load active teachers");
    }
  };

  // =======================
  // FETCH SALARY RECORDS
  // =======================
  const fetchSalaryRecords = async () => {
    try {
      setLoading(true);
      const res = await api.get("/teacherSalary/salaryRecords");
      console.log("Salary Records API:", res.data);

      setStructures(res.data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      alert(err.response?.data?.message || "Failed to load salary records.");
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // FORM FIELD CHANGE
  // =======================
  const onChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // =======================
  // EDIT HANDLER
  // =======================
  const handleEdit = (item) => {
    setIsEditMode(true);

    setEditData({
      ...item,
      deduction: item.deduction || 0,
      status: item.status || "UNPAID",
    });

    setFilters({
      teacherId: item.teacherId,
      teacherName: item.teacherName,
      month: item.month,
      year: item.year,
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // =======================
  // GENERATE SALARY (POST)
  // =======================
  const submitMonthlySalary = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        teacherId: Number(filters.teacherId),
        month: filters.month,
        year: Number(filters.year),
      };

      console.log("Generate Salary Payload:", payload);

      const res = await api.post("/teacherSalary/generate", payload);
      console.log("Generate Salary Response:", res.data);

      alert(res.data.message || "Salary generated successfully!");

      fetchSalaryRecords();

      setFilters({
        teacherId: "",
        teacherName: "",
        month: "",
        year: "",
      });
    } catch (err) {
      console.error("Generate Salary Error:", err);
      alert(err.response?.data?.message || "Failed to generate salary.");
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // UPDATE MONTHLY SALARY (PATCH)
  // =======================
  const updateMonthlySalary = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = {
        deduction: Number(editData.deduction),
        status: editData.status,
      };

      const res = await api.patch(
        `/teacherSalary/updateMonthly?teacherId=${editData.teacherId}&month=${editData.month}&year=${editData.year}`,
        body
      );

      console.log("Update Salary Response:", res.data);
      alert("Monthly salary updated successfully!");

      setIsEditMode(false);
      setEditData(null);

      setFilters({
        teacherId: "",
        teacherName: "",
        month: "",
        year: "",
      });

      fetchSalaryRecords();
    } catch (err) {
      console.error("Update Error:", err);
      alert(err.response?.data?.message || "Failed to update salary.");
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // DELETE RECORD (LOCAL)
  // =======================
  const deleteRecord = (salaryId) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    setStructures((prev) => prev.filter((x) => x.salaryId !== salaryId));
    alert("Record deleted successfully!");
  };

  // =======================
  // RENDER
  // =======================
  return (
    <div className="monthly-page">
      <Header />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="monthly-wrapper">

        {/* ================= FORM CARD ================= */}
        <div className="monthly-form-card">
          <h2 className="monthly-form-title">
            {isEditMode ? "Edit Monthly Salary" : "Generate Monthly Salary"}
          </h2>

          <form
            className="monthly-form"
            onSubmit={isEditMode ? updateMonthlySalary : submitMonthlySalary}
          >
            {/* Teacher ID */}
            <div className="monthly-group">
              <label>Teacher ID *</label>
              <input
                type="number"
                name="teacherId"
                required
                value={filters.teacherId}
                readOnly
              />
            </div>

            {/* Teacher Name Dropdown */}
            <div className="monthly-group">
              <label>Teacher Name *</label>
              <select
                name="teacherName"
                required
                value={filters.teacherName}
                onChange={(e) => {
                  const selectedName = e.target.value;

                  const teacher = activeTeachers.find(
                    (t) => t.teacherName === selectedName
                  );

                  setFilters({
                    ...filters,
                    teacherName: selectedName,
                    teacherId: teacher?.teacherId || "",
                  });
                }}
                disabled={isEditMode}
              >
                <option value="">Select Teacher</option>
                {activeTeachers.map((t) => (
                  <option key={t.teacherId} value={t.teacherName}>
                    {t.teacherName}
                  </option>
                ))}
              </select>
            </div>

            {/* Month */}
            <div className="monthly-group">
              <label>Month *</label>
              <select
                name="month"
                required
                value={filters.month}
                onChange={onChange}
                disabled={isEditMode}
              >
                <option value="">Select Month</option>
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December",
                ].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div className="monthly-group">
              <label>Year *</label>
              <select
                name="year"
                required
                value={filters.year}
                onChange={onChange}
                disabled={isEditMode}
              >
                <option value="">Select Year</option>
                {Array.from({ length: 6 }, (_, i) => 2023 + i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Edit Mode Only */}
            {isEditMode && (
              <>
                <div className="monthly-group">
                  <label>Deduction *</label>
                  <input
                    type="number"
                    name="deduction"
                    value={editData?.deduction}
                    onChange={handleEditChange}
                  />
                </div>

                <div className="monthly-group">
                  <label>Status *</label>
                  <select
                    name="status"
                    value={editData?.status}
                    onChange={handleEditChange}
                  >
                    <option value="UNPAID">UNPAID</option>
                    <option value="PAID">PAID</option>
                  </select>
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="monthly-buttons">
              <button
                type="button"
                className="monthly-save-btn"
                onClick={() => window.location.reload()}
              >
                PAY
              </button>
             <button
                type="submit"
                className="monthly-save-btn"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : isEditMode
                  ? "Update Salary"
                  : "Generate Salary"}
              </button>

               <button
                type="button"
                className="monthly-cancel-btn"
                onClick={() => window.location.reload()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* ================= TABLE SECTION ================= */}
        <div className="salary-card">
          <table className="salary-table">
            <thead>
              <tr>
                <th>Sr</th>
                <th>Teacher ID</th>
                <th>Teacher Name</th>
                <th>Month</th>
                <th>Year</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Late</th>
                <th>Half</th>
                <th>Total</th>
                <th>Per Day</th>
                <th>Calculated</th>
                <th>Deductions</th>
                <th>Final Salary</th>
                <th>Status</th>
                <th>Payment Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="17" style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              ) : structures.length === 0 ? (
                <tr>
                  <td colSpan="17" style={{ textAlign: "center" }}>
                    No records found.
                  </td>
                </tr>
              ) : (
                 structures.map((item, index) => (
                  <tr key={item.salaryId}>
                    <td>{index + 1}</td>
                    <td>{item.teacherId}</td>
                    <td>{item.teacherName}</td>
                    <td>{item.month}</td>
                    <td>{item.year}</td>
                    <td>{item.presentDays || 0}</td>
                    <td>{item.absentDays || 0}</td>
                    <td>{item.lateDays || 0}</td>
                    <td>{item.halfDays || 0}</td>
                    <td>{item.totalDays || 0}</td>
                    <td>₹{item.perDaySalary || 0}</td>
                    <td>₹{item.calculatedSalary || 0}</td>
                    <td>₹{item.deduction || 0}</td>
                    <td>₹{item.finalSalary || 0}</td>
                    <td>
                      <span
                        className={
                          item.status === "PAID"
                            ? "status-active"
                            : "status-inactive"
                        }
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>{item.paymentDate || "-"}</td>

                    <td className="salary-action-buttons">
                      <button
                        className="salary-edit-icon-btn"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit />
                      </button>

                      {/* <button
                        className="salary-delete-icon-btn"
                        onClick={() => deleteRecord(item.salaryId)}
                      >
                        <FaTrash />
                      </button> */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
