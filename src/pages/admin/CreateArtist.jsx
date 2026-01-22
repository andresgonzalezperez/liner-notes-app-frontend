function CreateArtist() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(
      "http://localhost:5005/artists",
      { name, genre, photo },
      { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } }
    );
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h2>Create Artist</h2>

      <input className="admin-input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="admin-input" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
      <input className="admin-input" placeholder="Photo URL" value={photo} onChange={(e) => setPhoto(e.target.value)} />

      <button className="admin-button">Create</button>
    </form>
  );
}

export default CreateArtist;