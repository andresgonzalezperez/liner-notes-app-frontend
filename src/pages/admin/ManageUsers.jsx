import { useEffect, useState } from "react";
import axios from "axios";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5005/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const toggleRole = (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    axios
      .put(
        `http://localhost:5005/users/${userId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then(() => {
        setUsers(
          users.map((u) =>
            u._id === userId ? { ...u, role: newRole } : u
          )
        );
      });
  };

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:5005/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then(() => {
        setUsers(users.filter((u) => u._id !== userId));
      });
  };

  return (
    <div className="admin-page">
      <h2>Manage Users</h2>

      <ul className="admin-list">
        {users.map((user) => (
          <li key={user._id} className="admin-item">
            {user.username} — {user.role}

            <div>
              <button
                className="admin-edit"
                onClick={() => toggleRole(user._id, user.role)}
              >
                Toggle Role
              </button>

              <button
                className="admin-delete"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageUsers;
