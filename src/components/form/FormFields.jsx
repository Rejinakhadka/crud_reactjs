import React from "react";
import "./form.css";
import { Input } from "antd";

const provincesOptions = [
  "Province 1",
  "Province 2",
  "Bagmati",
  "Gandaki",
  "Lumbini",
  "Karnali",
  "Sudurpashchim",
];

const FormFields = ({ register, errors }) => {
  return (
    <>
      <div>
        <label>
          Name: <span>*</span>
        </label>
        <input
          {...register("name", {
            required: "Name is required",
            pattern: {
              value: /^[A-Za-z ]+$/,
              message: "Invalid characters in the name field",
            },
          })}
          placeholder="Enter your name"
          required
        />
        <span>{errors.name?.message}</span>
      </div>

      <div>
        <label>
          Email: <span>*</span>
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          placeholder="Enter your email"
          required
        />
        <span>{errors.email?.message}</span>
      </div>

      <div>
        <label>
          Phone Number:<span>*</span>
        </label>
        <input
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /[0-9]{7,}/,
              message: "Invalid phone number",
            },
          })}
          placeholder="Enter your phone number"
          required
        />
        <span>{errors.phone?.message}</span>
      </div>

      <div>
        <label>DOB:</label>
        <input {...register("dob")} type="date" placeholder="MM/dd/yyyy" />
        <span>{errors.dob?.message}</span>
      </div>

      <div>
        <label>Address:</label>
        <input {...register("city")} placeholder="City" />
        <input {...register("district")} placeholder="District" />
        <select {...register("province")} defaultValue={provincesOptions[0]}>
          {provincesOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Country:</label>
        <input
          {...register("country")}
          placeholder="Enter your country"
          defaultValue="Nepal"
        />
      </div>
    </>
  );
};

export default FormFields;
