function ManageArtists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5005/artists")
      .then(res => setArtists(res.data));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5005/artists/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
    })
    .then(() => setArtists(artists.filter(a => a._id !== id)));
  };

  return (
    <div className="admin-page">
      <h2>Manage Artists</h2>

      <Link to="/admin/artists/create" className="admin-button">
        + Create Artist
      </Link>

      <ul className="admin-list">
        {artists.map((artist) => (
          <li key={artist._id} className="admin-item">
            {artist.name}

            <div>
              <Link to={`/admin/artists/${artist._id}/edit`} className="admin-edit">
                Edit
              </Link>

              <button
                className="admin-delete"
                onClick={() => handleDelete(artist._id)}
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

export default ManageArtists;