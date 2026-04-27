import { Link } from 'react-router-dom';
const Dashboard = () => {
  return (
    <div>
    <div>Dashboard</div>
        <Link to="/listLivres">Liste des livres</Link>
        <Link to="/admin/users">Gestion des utilisateurs</Link>
        <Link to="/listCategorie">Liste des catégories</Link>
    </div>
  );
}
export default Dashboard;