import React from "react";
import { FaSort, FaTrash, FaEdit, FaInbox } from "react-icons/fa";
import "./table.css";

const TableData = ({
  formData,
  handleEdit,
  handleDelete,
  deleteIndex,
  confirmDelete,
  cancelDelete,
  handleSort,
}) => {
  return (
    <div className="table-container">
      <h2>Submitted Form Data:</h2>
      <div className="tablecontainer">
        <table>
          <thead>
            <tr>
              <th>
                Name <FaSort onClick={handleSort} />
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
                  <td>{data.phone}</td>
                  <td>{data.dob}</td>
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
                      onClick={() => handleDelete(index)}
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
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableData;
