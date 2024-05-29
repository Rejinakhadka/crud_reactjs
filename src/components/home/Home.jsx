import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import FormFields from "../form/FormFields";
import TableData from "../table/Table";
import { FaEye } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

   useEffect(() => {
    const { state } = location;
    if (state && state.editIndex !== undefined) {
      const { editIndex, formData: profilesData } = state;
      setEditIndex(editIndex);

      const selectedData = profilesData[editIndex];
      setValue("name", selectedData.name);
      setValue("email", selectedData.email);
      setValue("phone", selectedData.phone);
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

  const header = { "Access-Control-Allow-Origin": "*" };

  const fetchData = async () => {
    await axios
      .get("https://659667b06bb4ec36ca028a54.mockapi.io/crud/v1/crud_react")
      .then((res) => {
        console.log(res.data);
        setFormData(res.data);
      });
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
  };

  const confirmDelete = () => {
    const idToDelete = formData[deleteIndex].id;
  
    axios
      .delete(`https://659667b06bb4ec36ca028a54.mockapi.io/crud/v1/crud_react/${idToDelete}`)
      .then(() => {
        setFormData(formData.filter(item => item.id !== idToDelete));
        setDeleteIndex(null);
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
        setDeleteIndex(null); 
      });
  };
  

  const cancelDelete = () => {
    setDeleteIndex(null);
  };

  const handleEdit = async (index) => {
    try {
      const selectedData = formData[index];

   
      window.scrollTo({ top: 0, behavior: "smooth" });

   
      setValue("name", selectedData.name || "");
      setValue("email", selectedData.email || "");
      setValue("phone", selectedData.phone || "");
      setValue("dob", selectedData.dob || "");
      setValue("city", selectedData.city || "");
      setValue("district", selectedData.district || "");
      setValue("province", selectedData.province || "");
      setValue("country", selectedData.country || "");

      setEditIndex(index);
    } catch (error) {
      console.error('Error setting edit data:', error);
    }
  };

const onSubmit = async (data, event) => {
  if (editIndex !== null) {
 
    const idToUpdate = formData[editIndex].id;

    axios
      .put(
        `https://659667b06bb4ec36ca028a54.mockapi.io/crud/v1/crud_react/${idToUpdate}`,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          dob: data.dob,
          city: data.city,
          district: data.district,
          province: data.province,
          country: data.country,
        },
        { headers: header }
      )
      .then(() => {
        setFormData((prevData) => {
          const updatedData = [...prevData];
          updatedData[editIndex] = {
            id: idToUpdate,
            ...data,
          };
         
          return updatedData;
        });
        setEditIndex(null); 
      })
      .catch((error) => {
        console.error("Error updating record:", error);
      });
  } else {

    try {
      const response = await axios.post(
        "https://659667b06bb4ec36ca028a54.mockapi.io/crud/v1/crud_react",
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          dob: data.dob,
          city: data.city,
          district: data.district,
          province: data.province,
          country: data.country,
        },
        { headers: header }
      );

      
      setFormData((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error("Error submitting record:", error);
    }
  }

  event.target.reset();
};


  const handleReset = () => {
    reset();
    setEditIndex(null);
  };

  const handleViewProfiles = () => {
    navigate("/profiles", { state: { formData } });
  };
  const handleSort = () => {
    const sortedData = [...formData].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      return nameA.localeCompare(nameB);
    });

    setFormData(sortedData);
  
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
      <TableData
        formData={formData}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        deleteIndex={deleteIndex}
        confirmDelete={confirmDelete}
        cancelDelete={cancelDelete}
        handleSort={handleSort}
      />
        <div className="view-profiles-button">
          <button onClick={handleViewProfiles}>
            <FaEye /> View Profiles
          </button>
        </div>
    </div>
  );
};

export default Home;
