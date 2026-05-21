import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../services/auth';
import './Navbar.css';

const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();
  const roles = user?.roles ?? [];

  const isAdmin   = roles.includes('ADMIN');
  const isManager = roles.includes('MANAGER') || isAdmin;
  // USER can only see livres

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">Bibliothèque</NavLink>

      <ul className="navbar-links">
        {/* Livres — visible to everyone */}
        <li><NavLink to="/listLivres">Livres</NavLink></li>

        {/* Catégories — MANAGER + ADMIN */}
        {isManager && (
          <>
            <li><NavLink to="/listCategorie">Catégories</NavLink></li>
            <li><NavLink to="/ajouter-livre">+ Livre</NavLink></li>
            <li><NavLink to="/ajouter-categorie">+ Catégorie</NavLink></li>
          </>
        )}

        {/* Users — ADMIN only */}
        {isAdmin && (
          <li><NavLink to="/admin/users">Utilisateurs</NavLink></li>
        )}
      </ul>

      <div className="navbar-user">
        <span className="navbar-username">{user?.username}</span>
        {roles[0] && (
          <span className={`navbar-role-badge ${roles[0]}`}>{roles[0]}</span>
        )}
        <button className="navbar-logout" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
