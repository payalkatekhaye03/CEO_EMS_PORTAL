import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../../Components/Header/Header";
import Sidebar from "../../../Components/SideBar/SideBar";
import { FaEdit, FaTrash } from "react-icons/fa";

import api from "../../../api/api"; //   <-- Your axios instance
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
      const res = await api.get("/teacherSalary/structures", {
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

  const deleteRecord = async (id) => {
    if (!window.confirm("Are you sure you want to delete this salary structure?"))
      return;

    try {
      await api.delete(`/teacherSalary/structure/${id}`, {
        headers: getAuthHeader(),
      });

      alert("Deleted successfully!");
      fetchStructures();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete record");
    }
  };

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

          <h1 className="salary-title">Salary Structure List</h1>

          <button
            className="salary-add-btn"
            onClick={() => navigate("/teacher/salary/add")}
          >
            + Add Salary
          </button>
        </div>

        {/* TABLE */}
        <div className="salary-card">
          <table className="salary-table">
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
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              ) : structures.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No records found.
                  </td>
                </tr>
              ) : (
                structures.map((item, index) => (
                  <tr key={item.structureId}>
                   <td>{index + 1}</td>
                    <td>{item.teacherId}</td>
                   <td>{item.teacherName}</td>
                    <td>₹ {item.perDaySalary}</td>
                    <td>₹ {item.annualSalary}</td>

                    {/* STATUS */}
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

                    {/* CREATED & UPDATED */}
                    <td>{item.createdAt?.split("T")[0] || "-"}</td>
                    <td>{item.updatedAt?.split("T")[0] || "-"}</td>

                    <td className="salary-action-buttons">
                      <button
                        className="salary-edit-icon-btn"
                        onClick={() =>
                          navigate(`/teacher/salary/structure/${item.structureId}`)
                        }
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="salary-delete-icon-btn"
                        onClick={() => deleteRecord(item.structureId)}
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
  );
}
