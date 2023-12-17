import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./profile.css";

const Profiles = () => {
  const { state } = useLocation();
  const formData = state ? state.formData : [];
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEdit = (index) => {
    navigate("/", { state: { editIndex: index, formData } });
  };

  return (
    <div>
      <h1>Profiles:</h1>
      <div className="profile-container">
        {formData.map((profile, index) => (
          <div className="profile-card" key={index}>
            <h2>{profile.name}</h2>
            <p>Email: {profile.email}</p>
            <p>Phone Number: {profile.phoneNumber}</p>
            <p>
              DOB:{" "}
              {profile.dob instanceof Date
                ? profile.dob.toLocaleDateString()
                : ""}
            </p>

            <p>City: {profile.city}</p>
            <p>District: {profile.district}</p>
            <p>Province: {profile.province}</p>
            <p>Country: {profile.country}</p>
            <button onClick={() => handleEdit(index)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profiles;
