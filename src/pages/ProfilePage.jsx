import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import defaultAvatar from "../assets/default-avatar.png";


function ProfilePage() {
  const { user, authenticateUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(user?.avatar || "");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const uploadRes = await axios.post(
        "http://localhost:5005/upload",
        uploadData
      );

      const newAvatarUrl = uploadRes.data.imageUrl;

      await axios.patch(
        "http://localhost:5005/users/avatar",
        { avatar: newAvatarUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setAvatar(newAvatarUrl);
      authenticateUser();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile-page">
      <h1> {user?.username}'s profile</h1>

      <div className="profile-info">
        <img
          src={avatar || defaultAvatar}
          alt="profile"
          className="profile-avatar"
        />

        <p><strong>Username:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>

      <form onSubmit={handleUpload} className="profile-upload">
        <label>Change profile picture:</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default ProfilePage;
