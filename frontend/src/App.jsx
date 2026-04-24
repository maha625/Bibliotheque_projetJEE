import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserManagement from './pages/AdminUserManagement.jsx';
// import Login from './pages/Login'; // À décommenter quand tu créeras le fichier

function App() {
  return (
    <Router>
      <div className="App">
        {/* Barre de navigation temporaire pour tester */}
        <nav style={{ padding: "10px", backgroundColor: "#f4f4f4", marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Accueil</Link>
          <Link to="/admin/users">Gestion Utilisateurs (Admin)</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Bienvenue à la Bibliothèque ENSAM</h1>} />
          
          {/* Ta route pour la gestion des utilisateurs */}
          <Route path="/admin/users" element={<UserManagement />} />
          
          {/* Route par défaut si l'URL n'existe pas */}
          <Route path="*" element={<h2>404 - Page non trouvée</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;