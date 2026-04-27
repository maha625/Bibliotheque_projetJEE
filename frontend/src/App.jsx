import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserManagement from './pages/AdminUserManagement.jsx';
// import Login from './pages/Login'; // À décommenter quand tu créeras le fichier
import ListLivre from './pages/listLivre.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AjouterLivre from './pages/Add_livre.jsx';
import Add_Categorie from './pages/Add_Categorie.jsx';
import ListCategorie from './pages/ListCategorie.jsx';
function App() {
  return (
    <Router>
      <div className="App">
        {/* Barre de navigation temporaire pour tester */}
        

        <Routes>

          <Route path="/" element={<Dashboard />} />
          
          {/* Ta route pour la gestion des utilisateurs */}
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path='/listLivres' element={<ListLivre />} />
          <Route path='/ajouter-livre' element={<AjouterLivre />} />
          <Route path='/ajouter-categorie' element={<Add_Categorie />} />
          <Route path='/listCategorie' element={<ListCategorie />} />
          {/* Route par défaut si l'URL n'existe pas */}
          <Route path="*" element={<h2>404 - Page non trouvée</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;