import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1 className="admin-title">Panel de Administración</h1>
      <p className="admin-subtitle">Gestiona el contenido de LINER NOTES desde aquí.</p>

      <div className="admin-grid">
        <Link to="/admin/artists" className="admin-card">
          <h2>🎤 Artistas</h2>
          <p>Crear, editar y eliminar artistas.</p>
        </Link>

        <Link to="/admin/albums" className="admin-card">
          <h2>💿 Álbumes</h2>
          <p>Gestiona todos los álbumes publicados.</p>
        </Link>

        <Link to="/admin/users" className="admin-card">
          <h2>👤 Usuarios</h2>
          <p>Controla roles y elimina cuentas.</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;

