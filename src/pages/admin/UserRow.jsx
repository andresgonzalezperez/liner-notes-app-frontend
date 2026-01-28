import UserEditForm from "./UserEditForm";
import axios from "axios";
import defaultAvatar from "../../assets/default-avatar.png";
import { API_URL } from "../../../config/config";

function UserRow({ user, isEditing, onEdit, onCancel, onUpdated }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/users/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      onUpdated();
    } catch (err) {
      console.log(err);
      alert("Error deleting user");
    }
  };

  // If editing: show inline form inside a card
  if (isEditing) {
    return (
      <div className="admin-card">
        <UserEditForm user={user} onCancel={onCancel} onUpdated={onUpdated} />
      </div>
    );
  }

  // Normal row / admin card layout
  return (
    <div className="admin-card">
      <div className="admin-card-left">
        <img
          src={user.avatar || defaultAvatar}
          alt={user.username}
          className="admin-thumb"
        />

        <div className="admin-card-info">
          <strong className="admin-card-title">{user.username}</strong>
          <p className="admin-card-sub">{user.email}</p>
          <p className="admin-card-sub">
            Role: {user.role === "admin" ? "Admin" : "User"}
          </p>
        </div>
      </div>

      <div className="admin-card-actions">
        <button className="admin-btn edit" onClick={onEdit}>
          Edit
        </button>

        <button className="admin-btn delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default UserRow;
