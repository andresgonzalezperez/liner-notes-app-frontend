import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import UserRow from "./UserRow";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5005/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-page">
      <h2 className="admin-title">Manage Users</h2>

      <div className="admin-list">
        {users.map((user) => (
          <UserRow
            key={user._id}
            user={user}
            isEditing={editingUserId === user._id}
            onEdit={() => setEditingUserId(user._id)}
            onCancel={() => setEditingUserId(null)}
            onUpdated={fetchUsers}
          />
        ))}
      </div>
    </div>
  );
}

export default ManageUsers;
