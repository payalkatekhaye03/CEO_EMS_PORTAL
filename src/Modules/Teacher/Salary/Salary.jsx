import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../../Components/Header/Header";
import Sidebar from "../../../Components/SideBar/SideBar";
import { FaEdit, FaTrash } from "react-icons/fa";

import api from "../../../api/api"; 
import "./Salary.css";

export default function Salary() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [structures, setStructures] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // 🔹 FETCH SALARY STRUCTURE LIST FROM API
  const fetchStructures = async () => {
    setLoading(true);

    try {
      const res = await api.get("teacherSalary/salaryRecords", {
        headers: getAuthHeader(),
      });

      console.log("Fetched Structures:", res.data);

      if (res.data?.data) {
        setStructures(res.data.data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Failed to load salary structure list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStructures();
  }, []);

  // const deleteRecord = async (id) => {
  //   if (!window.confirm("Are you sure you want to delete this salary structure?"))
  //     return;

  //   try {
  //     await api.delete(`/teacherSalary/structure/${id}`, {
  //       headers: getAuthHeader(),
  //     });

  //     alert("Deleted successfully!");
  //     fetchStructures();
  //   } catch (err) {
  //     console.error("Delete error:", err);
  //     alert("Failed to delete record");
  //   }
  // };

  return (
    <div className="salary-page">
      <Header />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="salary-wrapper">
        {/* HEADER */}
        <div className="salary-header">
  <button
    className="salary-hamburger"
    onClick={() => setSidebarOpen(!sidebarOpen)}
  >
    ☰
  </button>

  <h1 className="salary-title">Salary</h1>

  {/* Button Group */}
  <div className="salary-btn-group">
    <button
      className="salary-add-btn"
      onClick={() => navigate("/teacher/salary/monthly")}
    >
      Monthly Salary
    </button>

    <button
      className="salary-add-btn"
      onClick={() => navigate("/teacher/salary/add")}
    >
       Add Salary Structure
    </button>
  </div>
</div>

     {/* TABLE */}
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
        <th>Half Days</th>
        <th>Total Days</th>
        <th>Per Day Salary</th>
        <th>Calculated Salary</th>
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
            <td>{item.presentDays}</td>
            <td>{item.absentDays}</td>
            <td>{item.lateDays}</td>
            <td>{item.halfDays}</td>
            <td>{item.totalDays}</td>
            <td>₹ {item.perDaySalary}</td>
            <td>₹ {item.calculatedSalary}</td>
            <td>₹ {item.deduction}</td>
            <td>₹ {item.finalSalary}</td>

         
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

         
            {/* <td className="salary-action-buttons">
              <button
                className="salary-edit-icon-btn"
                onClick={() =>
                  navigate(`/teacher/salary/structure/${item.salaryId}`)
                }
              >
                <FaEdit />
              </button>

              <button
                className="salary-delete-icon-btn"
                onClick={() => deleteRecord(item.salaryId)}
              >
                <FaTrash />
              </button>
            </td> */}
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
