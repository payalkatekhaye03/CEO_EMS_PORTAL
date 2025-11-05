
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./Paper.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/SideBar";

const Paper = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((s) => !s);

  const [papers] = useState([
    { id: 66, title: "PHY SAMPLE", description: "SAMPLE", startTime: "2025-09-17T17:32:00", endTime: "2025-09-17T18:32:00", isLive: "Yes", class: "11", noQ: 30, pattern: "PHYSICS 20 plus 10" },
    { id: 65, title: "XI PHY 16 SEPT", description: "XI PHYSICS", startTime: "2025-09-16T11:20:00", endTime: "2025-09-16T12:20:00", isLive: "Yes", class: "11", noQ: 30, pattern: "PHYSICS 20 plus 10" },
    { id: 64, title: "maths sample", description: "maths", startTime: "2025-09-15T17:36:00", endTime: "2025-09-15T18:06:00", isLive: "Yes", class: "12", noQ: 0, pattern: "PHY (5+5)" },
    { id: 63, title: "P1", description: "PHYSICS SAMPLE", startTime: "2025-09-15T11:30:00", endTime: "2025-09-15T12:00:00", isLive: "Yes", class: "12", noQ: 10, pattern: "PHY (5+5)" },
    { id: 62, title: "gt test", description: "ok", startTime: "2025-09-11T18:00:00", endTime: "2025-09-11T18:30:00", isLive: "Yes", class: "11", noQ: 30, pattern: "Math 20 Plus 10" },
    { id: 61, title: "XI_Maths_1st_Sep", description: "XI_Maths_1st_Sep", startTime: "2025-09-09T15:35:00", endTime: "2025-09-09T22:33:00", isLive: "Yes", class: "11", noQ: 30, pattern: "Math 20 Plus 10" },
    { id: 60, title: "phy test", description: "test", startTime: "2025-09-04T12:30:00", endTime: "2025-09-04T13:55:00", isLive: "Yes", class: "12", noQ: 10, pattern: "PHY (5+5)" },
    { id: 59, title: "test", description: "test", startTime: "2025-09-02T14:03:00", endTime: "2025-09-03T19:33:00", isLive: "Yes", class: "11", noQ: 10, pattern: "PHY (5+5)" },
  ]);

  const formatDate = (isoStr) => {
    if (!isoStr) return "";
    const d = new Date(isoStr);
    if (Number.isNaN(d.getTime())) return isoStr;
    return d.toLocaleString();
  };

  // XLSX export for a single row
  const exportRowXLSX = (row) => {
    const headers = ['Paper ID','Title','Description','Start Time','End Time','Is Live','Class','No. Q','Pattern'];
    const values = [
      row.id,
      row.title,
      row.description,
      formatDate(row.startTime),
      formatDate(row.endTime),
      row.isLive,
      row.class,
      row.noQ,
      row.pattern
    ];

    // Create worksheet from array-of-arrays (header + row)
    const wsData = [headers, values];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    ws['!cols'] = [
      { wpx: 60 },  // Paper ID
      { wpx: 180 }, // Title
      { wpx: 160 }, // Description
      { wpx: 140 }, // Start Time
      { wpx: 140 }, // End Time
      { wpx: 80 },  // Is Live
      { wpx: 60 },  // Class
      { wpx: 60 },  // No. Q
      { wpx: 180 }  // Pattern
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Paper');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `paper-${row.id}.xlsx`);
  };

  
  return (
    <>
      <Header />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="Papers-root">
        
        <div className="Papers-topbar">
          <button
            className="Papers-hamburger"
            aria-label="Toggle menu"
            aria-expanded={sidebarOpen}
            onClick={toggleSidebar}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true" focusable="false">
              <rect width="20" height="2" rx="1" fill="currentColor" />
              <rect y="6" width="12" height="2" rx="1" fill="currentColor" />
              <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
            </svg>
          </button>

          <h1>Papers</h1>

     
        </div>

        {/* Container with background + table */}
        <div className="papers-container">
          <table className="papers-table">
            <thead>
              <tr>
                <th>Paper ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Is Live</th>
                <th>Class</th>
                <th>No. Q</th>
                <th>Pattern</th>
                <th>Export</th>
              </tr>
            </thead>
            <tbody>
              {papers.map((paper) => (
                <tr key={paper.id}>
                  <td>{paper.id}</td>
                  <td className="title-link"><a href="#">{paper.title}</a></td>
                  <td>{paper.description}</td>
                  <td>{formatDate(paper.startTime)}</td>
                  <td>{formatDate(paper.endTime)}</td>
                  <td>{paper.isLive}</td>
                  <td>{paper.class}</td>
                  <td>{paper.noQ}</td>
                  <td>{paper.pattern}</td>
                  <td>
                    <button
                      className="export-btn"
                      onClick={() => exportRowXLSX(paper)}
                    >
                      Export File
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* pagination + rows selector */}
          <div className="pagination-wrapper">
            <div className="pagination">
              <button disabled>Previous</button>
              <span className="active">1</span>
              <button>Next</button>
            </div>
            <div className="rows-per-page">
              <select>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Paper;
