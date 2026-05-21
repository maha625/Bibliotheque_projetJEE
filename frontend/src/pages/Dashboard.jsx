import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/auth';

const Card = ({ to, emoji, title, desc }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <Link to={to} style={{
      display: 'block',
      background: '#1e1c28',
      border: `1px solid ${hovered ? 'rgba(138,43,226,0.5)' : 'rgba(138,43,226,0.2)'}`,
      borderRadius: '12px',
      padding: '24px',
      textDecoration: 'none',
      transform: hovered ? 'translateY(-2px)' : 'none',
      transition: 'border-color 0.2s, transform 0.15s',
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
      <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{emoji}</div>
      <div style={{ color: '#e8e0f0', fontWeight: 500, marginBottom: '6px', fontFamily: "'DM Sans', sans-serif" }}>{title}</div>
      <div style={{ color: '#7a6e8a', fontSize: '0.88rem', fontFamily: "'DM Sans', sans-serif" }}>{desc}</div>
    </Link>
  );
};

const Dashboard = () => {
  const user = getUser();
  const roles = user?.roles ?? [];
  const isAdmin   = roles.includes('ADMIN');
  const isManager = roles.includes('MANAGER') || isAdmin;

  return (
    <div style={{ maxWidth: '900px', margin: '48px auto', padding: '0 24px' }}>
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontStyle: 'italic',
          color: '#e8e0f0',
          fontSize: '2.4rem',
          margin: '0 0 8px',
        }}>
          Bonjour, {user?.username} 👋
        </h1>
        <p style={{ color: '#7a6e8a', margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
          Que souhaitez-vous faire aujourd'hui ?
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        <Card to="/listLivres"        emoji="📚" title="Catalogue des livres"    desc="Consulter, rechercher et filtrer les livres" />
        {isManager && <Card to="/ajouter-livre"    emoji="➕" title="Ajouter un livre"       desc="Enregistrer un nouveau titre" />}
        {isManager && <Card to="/listCategorie"    emoji="🏷️" title="Catégories"             desc="Gérer les catégories du catalogue" />}
        {isManager && <Card to="/ajouter-categorie" emoji="🆕" title="Ajouter une catégorie" desc="Créer une nouvelle catégorie" />}
        {isAdmin   && <Card to="/admin/users"      emoji="👥" title="Utilisateurs"           desc="Gérer le personnel et les accès" />}
      </div>
    </div>
  );
};

export default Dashboard;
