import { useState } from "react";
import { FaSort, FaTrash, FaEdit, FaInbox } from "react-icons/fa";
import "./table.css";

const Table = ({ formData, onDelete, onEdit, onSort }) => {
  const [deleteIndex, setDeleteIndex] = useState(null);

  const confirmDelete = (index) => {
    setDeleteIndex(index);
  };

  const cancelDelete = () => {
    setDeleteIndex(null);
  };

  const deleteRecord = () => {
    onDelete(deleteIndex);
    setDeleteIndex(null);
  };

  const handleEdit = (index) => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    onEdit(index);
  };

  return (
    <div className="table-container">
      <h2>Submitted Form Data:</h2>
      <div className="tablecontainer">
        <table>
          <thead>
            <tr>
              <th onClick={onSort}>
                Name <FaSort />
              </th>
              <th>Email </th>
              <th>Phone Number </th>
              <th>DOB </th>
              <th>City </th>
              <th>District </th>
              <th>Province </th>
              <th>Country </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formData.length > 0 ? (
              formData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phoneNumber}</td>
                  <td>
                    {data.dob instanceof Date
                      ? data.dob.toLocaleDateString()
                      : data.dob}
                  </td>
                  <td>{data.city}</td>
                  <td>{data.district}</td>
                  <td>{data.province}</td>
                  <td>{data.country}</td>
                  <td>
                    <FaEdit
                      onClick={() => handleEdit(index)}
                      className="action-icon"
                    />
                    <FaTrash
                      onClick={() => confirmDelete(index)}
                      className="action-icon"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">
                  <FaInbox /> NO DATA
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {deleteIndex !== null && (
          <div className="delete-confirmation">
            <p>Are you sure you want to delete this record?</p>
            <button onClick={deleteRecord}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
