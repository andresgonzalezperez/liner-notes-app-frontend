import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import defaultAvatar from "../assets/default-avatar.png";
import { API_URL } from "../../config/config";

function ProfilePage() {
  const { user, authenticateUser } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    avatarFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatarFile") {
      setFormData((prev) => ({ ...prev, avatarFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${API_URL}/users/${user._id}/update`,
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

      if (
        formData.currentPassword.trim() !== "" &&
        formData.newPassword.trim() !== ""
      ) {
        await axios.put(
          `${API_URL}/users/${user._id}/change-password`,
          {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
      }

      if (formData.avatarFile) {
        const uploadData = new FormData();
        uploadData.append("imageUrl", formData.avatarFile);

        await axios.post(
          `${API_URL}/users/update-profile-picture/${user._id}`,
          uploadData
        );
      }

      await authenticateUser();
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      alert("Error updating profile");
    }
  };

  return (
    <div className="profile-page-wrapper">
      <h2 className="admin-title">My Profile</h2>

      <div className="profile-card">
        {/* VIEW MODE */}
        {!isEditing && (
          <>
            <div className="profile-info">
              <img
                src={user?.avatar || defaultAvatar}
                alt="profile"
                className="profile-avatar"
              />

              <p className="profile-field">
                <strong>Username:</strong> {user?.username}
              </p>

              <p className="profile-field">
                <strong>Email:</strong> {user?.email}
              </p>
            </div>

            <button className="admin-btn edit" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <form className="admin-form small" onSubmit={handleProfileUpdate}>
            <h3 className="admin-subtitle">Edit Profile</h3>

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

            <h4 className="profile-section-title">Change Password</h4>

            <input
              className="admin-input"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Current password"
            />

            <input
              className="admin-input"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New password"
            />

            <h4 className="profile-section-title">Change Avatar</h4>

            <input
              className="admin-input"
              type="file"
              name="avatarFile"
              accept="image/*"
              onChange={handleChange}
            />

            <div className="admin-form-actions">
              <button type="submit" className="admin-btn save">
                Save Changes
              </button>

              <button
                type="button"
                className="admin-btn delete"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;



