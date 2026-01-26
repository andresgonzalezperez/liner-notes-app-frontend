import UserEditForm from "./UserEditForm";
import axios from "axios";

function UserRow({ user, isEditing, onEdit, onCancel, onUpdated }) {
  // Delete user
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5005/users/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      onUpdated(); // Refresh list
    } catch (err) {
      console.log(err);
      alert("Error deleting user");
    }
  };

  // If editing, show inline form
  if (isEditing) {
    return (
      <li className="admin-item">
        <UserEditForm user={user} onCancel={onCancel} onUpdated={onUpdated} />
      </li>
    );
  }

  // Normal row
  return (
    <li className="admin-item">
      <strong>{user.username}</strong> — {user.email} — {user.role}

      <div>
        <button className="admin-edit" onClick={onEdit}>
          Edit
        </button>

        <button className="admin-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default UserRow;
