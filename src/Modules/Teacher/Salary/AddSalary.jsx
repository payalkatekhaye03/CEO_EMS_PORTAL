// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Header from "../../../Components/Header/Header";
// import Sidebar from "../../../Components/SideBar/SideBar";
// import "./Salary.css";

// export default function AddSalary() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [structureList, setStructureList] = useState([]);

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("salaryStructure")) || [];
//     setStructureList(data);

//     const editData = data.find((x) => x.id === Number(id));

//     if (editData) setForm(editData);
//   }, [id]);

//   const [form, setForm] = useState({
//     teacherId: "",
//     teacherName: "",
//     perDaySalary: "",
//     annualSalary: "",
//     status: "ACTIVE",
//     createdAt: "",
//     updatedAt: "",
//   });

//   const change = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const save = (e) => {
//     e.preventDefault();

//     const updated = form.id
//       ? structureList.map((x) => (x.id === form.id ? form : x))
//       : [...structureList, { ...form, id: Date.now() }];

//     localStorage.setItem("salaryStructure", JSON.stringify(updated));
//     navigate("/teacher/salary");
//   };

//   return (
//     <div className="addsalary-page">
//       <Header />
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className="addsalary-wrapper">
//         <div className="addsalary-header">
//           <button className="addsalary-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
//             ☰
//           </button>

//           <h1 className="addsalary-title">
//             {form.id ? "Edit Salary Structure" : "Add Salary Structure"}
//           </h1>
//         </div>

//         <div className="addsalary-card">
//           <form onSubmit={save}>
//             <div className="addsalary-grid">

//               <div className="addsalary-group">
//                 <label>Teacher ID *</label>
//                 <input
//                   type="number"
//                   required
//                   name="teacherId"
//                   value={form.teacherId}
//                   onChange={change}
//                 />
//               </div>

//               <div className="addsalary-group">
//                 <label>Teacher Name *</label>
//                 <input
//                   type="text"
//                   required
//                   name="teacherName"
//                   value={form.teacherName}
//                   onChange={change}
//                 />
//               </div>

//               <div className="addsalary-group">
//                 <label>Per Day Salary (₹) *</label>
//                 <input
//                   type="number"
//                   required
//                   name="perDaySalary"
//                   value={form.perDaySalary}
//                   onChange={change}
//                 />
//               </div>

//               <div className="addsalary-group">
//                 <label>Annual Salary (₹) *</label>
//                 <input
//                   type="number"
//                   required
//                   name="annualSalary"
//                   value={form.annualSalary}
//                   onChange={change}
//                 />
//               </div>
//                   </div>

//             {/* ACTIONS */}
//             <div className="addsalary-actions">
//               <button
//                 type="button"
//                 className="addsalary-cancel"
//                 onClick={() => navigate("/teacher/salary")}
//               >
//                 Cancel
//               </button>

//               <button type="submit" className="addsalary-save">
//                 {form.id ? "Update" : "Save"}
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../../Components/Header/Header";
import Sidebar from "../../../Components/SideBar/SideBar";
import api from "../../../api/api";

import "./Salary.css";

export default function AddSalary() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    teacherId: "",
    perDaySalary: "",
    annualSalary: "",
  });

  // Get Auth Header (Bearer Token)
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Input Change Handler
  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.teacherId) {
      alert("Teacher ID is required");
      return;
    }

    const payload = {
      teacherId: Number(form.teacherId),
      perDaySalary: Number(form.perDaySalary),
      annualSalary: Number(form.annualSalary),
    };

    setLoading(true);

    try {
      const res = await api.post(
        "/teacherSalary/structure",
        payload,
        { headers: getAuthHeader() }
      );

      alert("Salary structure added successfully!");
      navigate("/teacher/salary");

    } catch (err) {
      console.error("API Error:", err?.response?.data);

      if (err?.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addsalary-page">
      <Header />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="addsalary-wrapper">
        {/* PAGE HEADER */}
        <div className="addsalary-header">
          <button
            className="addsalary-hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          <h1 className="addsalary-title">Add Salary Structure</h1>
        </div>

        {/* FORM CARD */}
        <div className="addsalary-card">
          <form onSubmit={handleSubmit}>
            <div className="addsalary-grid">
              
              <div className="addsalary-group">
                <label>Teacher ID *</label>
                <input
                  type="number"
                  name="teacherId"
                  required
                  value={form.teacherId}
                  onChange={change}
                  placeholder="Enter Teacher ID"
                />
              </div>

 <div className="addsalary-group">
               <label>Teacher Name *</label>
               <input
                 type="text"
                   required
                   name="teacherName"
                value={form.teacherName}
                  onChange={change}
               />
              </div>
              <div className="addsalary-group">
                <label>Per Day Salary (₹) *</label>
                <input
                  type="number"
                  name="perDaySalary"
                  required
                  value={form.perDaySalary}
                  onChange={change}
                  placeholder="3000"
                />
              </div>

              <div className="addsalary-group">
                <label>Annual Salary (₹) *</label>
                <input
                  type="number"
                  name="annualSalary"
                  required
                  value={form.annualSalary}
                  onChange={change}
                  placeholder="900000"
                />
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="addsalary-actions">
              <button
                type="button"
                className="addsalary-cancel"
                onClick={() => navigate("/teacher/salary")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="addsalary-save"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
