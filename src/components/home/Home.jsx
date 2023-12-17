import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Table from "../table/Table";
import { FaEye } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import FormFields from "../form/FormFields";

const Home = () => {
  const { handleSubmit, register, setValue, getValues, reset, formState: { errors } } = useForm();
  const [formData, setFormData] = useState(() => {  //this is for to manage state of formdata
    try {
      const storedData = localStorage.getItem("formData");
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Error parsing stored data:", error);
      return [];
    }
  });
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  //THIS IS FOR PROFILE  EDIT WHEN IT NAVIGATES BACK TO / PAGE TO UPDATE FORM 
  useEffect(() => {
    const { state } = location;
    if (state && state.editIndex !== undefined) {
      const { editIndex, formData: profilesData } = state;
      setEditIndex(editIndex);

      const selectedData = profilesData[editIndex];
      setValue("name", selectedData.name);
      setValue("email", selectedData.email);
      setValue("phoneNumber", selectedData.phoneNumber);
      setValue("dob", selectedData.dob);
      setValue("city", selectedData.city);
      setValue("district", selectedData.district);
      setValue("province", selectedData.province);
      setValue("country", selectedData.country);
    } else {
      reset();
      setEditIndex(null);
     
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location, setValue, reset]);

  // Effect to update local storage whenever form data changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const onSubmit = (data, event) => {
    if (editIndex !== null) {
      const updatedData = [...formData];
      updatedData[editIndex] = data;
      setFormData(updatedData);
      setEditIndex(null);
    } else {
      setFormData((prevData) => [...prevData, data]);
    }
    event.target.reset();
  };

  const handleEdit = (index) => {
    const selectedData = formData[index];
    setValue("name", selectedData.name);
    setValue("email", selectedData.email);
    setValue("phoneNumber", selectedData.phoneNumber);
    setValue("dob", selectedData.dob);
    setValue("city", selectedData.city);
    setValue("district", selectedData.district);
    setValue("province", selectedData.province);
    setValue("country", selectedData.country);

    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = [...formData];
    updatedData.splice(index, 1);
    setFormData(updatedData);

    localStorage.setItem("formData", JSON.stringify(updatedData));
  };

  const handleSort = () => {
    const sortedData = [...formData].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      return nameA.localeCompare(nameB);
    });

    setFormData(sortedData);
    localStorage.setItem("formData", JSON.stringify(sortedData));
  };

  const handleViewProfiles = () => {
    navigate("/profiles", { state: { formData } });
  };

  const handleReset = () => {
    reset();
    setEditIndex(null);
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h1>Please Fill this form:</h1>
          </div>

          <FormFields
            register={register}
            setValue={setValue}
            getValues={getValues}
            errors={errors}
          />

          <button type="submit">
            {editIndex !== null ? "Update" : "Submit"}
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </form>
      </div>
      <div>
        <Table
          formData={formData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <div className="view-profiles-button">
          <button onClick={handleViewProfiles}>
            <FaEye /> View Profiles
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
