import { useState } from "react";
import axios from "axios";

function UserEditForm({ user, onCancel, onUpdated }) {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: "",
    role: user.role,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        `http://localhost:5005/users/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      onUpdated();
      onCancel();
    } catch (err) {
      console.log(err);
      alert("Error updating user");
    }
  };

  return (
    <form className="admin-form small" onSubmit={handleSubmit}>
      <h3 className="admin-subtitle">Edit User</h3>

      <label className="admin-label">Username</label>
      <input
        className="admin-input"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />

      <label className="admin-label">Email</label>
      <input
        className="admin-input"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label className="admin-label">New Password (optional)</label>
      <input
        className="admin-input"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />

      <label className="admin-label">Role</label>
      <select
        className="admin-input"
        name="role"
        value={formData.role}
        onChange={handleChange}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <div className="admin-form-actions">
        <button type="submit" className="admin-btn save">
          Save
        </button>

        <button type="button" className="admin-btn delete" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UserEditForm;

