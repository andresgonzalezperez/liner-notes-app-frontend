import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import defaultAvatar from "../assets/default-avatar.png";

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

  // HANDLE INPUT CHANGES
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatarFile") {
      setFormData((prev) => ({ ...prev, avatarFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // HANDLE FULL PROFILE UPDATE
  const handleProfileUpdate = async (e) => {
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

      // Update password (optional)
      if (
        formData.currentPassword.trim() !== "" &&
        formData.newPassword.trim() !== ""
      ) {
        await axios.put(
          `http://localhost:5005/users/${user._id}/change-password`,
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

      // Update avatar (optional)
      if (formData.avatarFile) {
        const uploadData = new FormData();
        uploadData.append("imageUrl", formData.avatarFile);

        await axios.post(
          `http://localhost:5005/users/update-profile-picture/${user._id}`,
          uploadData
        );
      }

      // Refresh user data
      await authenticateUser();
      setIsEditing(false);

    } catch (err) {
      console.log(err);
      alert("Error updating profile");
    }
  };

  return (
    <div className="page-container">
      <div className="profile-page">
        <h1>{user?.username}'s profile</h1>

        {/* VIEW MODE */}
        {!isEditing && (
          <>
            <div className="profile-info">
              <img
                src={user?.avatar || defaultAvatar}
                alt="profile"
                className="profile-avatar"
              />

              <p>
                <strong>Username:</strong> {user?.username}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            </div>

            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <form className="edit-user-form" onSubmit={handleProfileUpdate}>
            <h3>Edit Profile</h3>

            <label>Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <h4>Change Password</h4>

            <input
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Current password"
            />

            <input
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New password"
            />

            <h4>Change Avatar</h4>

            <input
              type="file"
              name="avatarFile"
              accept="image/*"
              onChange={handleChange}
            />

            <div className="edit-actions">
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)}>
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


