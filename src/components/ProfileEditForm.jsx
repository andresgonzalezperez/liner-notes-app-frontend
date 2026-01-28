import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function ProfileEditForm({ onCancel }) {
  const { user, authenticateUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update username + email
      await axios.put(
        `http://localhost:5005/users/${user._id}/update`,
        {
          username: formData.username,
          email: formData.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      // Update password if provided
      if (formData.password.trim() !== "") {
        await axios.put(
          `http://localhost:5005/users/${user._id}/change-password`,
          {
            currentPassword: formData.password,
            newPassword: formData.password,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
      }

      await authenticateUser();
      onCancel();

    } catch (err) {
      console.log(err);
      alert("Error updating profile");
    }
  };

  return (
    <form className="edit-user-form" onSubmit={handleSubmit}>
      <h3>Edit Profile</h3>

      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="New password (optional)"
      />

      <div className="edit-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProfileEditForm;
