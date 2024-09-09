import React, { useState, useEffect } from "react";
import { fetchLogs } from "../../api/logService";

const AllLogs = () => {
  const [logs, setLogs] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "ascending",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchLogs();
        setLogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, []);

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    const sortedLogs = [...logs].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setLogs(sortedLogs);
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) =>
    sortConfig.key === key
      ? sortConfig.direction === "ascending"
        ? " ↑"
        : " ↓"
      : "";

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Log Management</h2>
      <table>
        <thead>
          <tr>
            {["createdAt", "username", "description"].map((header) => (
              <th key={header} onClick={() => handleSort(header)}>
                {header.charAt(0).toUpperCase() + header.slice(1)}
                {getSortIndicator(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {logs.map(({ id, createdAt, userName, description }) => (
            <tr key={id}>
              <td>{new Date(createdAt).toLocaleString()}</td>
              <td>{userName}</td>
              <td>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default AllLogs;
