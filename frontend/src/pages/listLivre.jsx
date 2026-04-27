import React,{useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListLivre = () => {
    const [livres, setLivres] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const API_URL = "http://localhost:8080/api/livres";

    useEffect(() => {
        fetchLivres();
    }, []);
    const fetchLivres = async () => {
        try {
            const response = await axios.get(API_URL);
            console.log("Données reçues de l'API :", response.data);
            setLivres(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching livres:", error);
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm("supprimer ce livre ?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchLivres();
            } catch (error) {
                console.error("Error deleting livre:", error);
            }
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
    <div>
        <h2>Liste des livres</h2>
        <p>{livres.length} livres trouvés</p>
        <button onClick={() => navigate('/ajouter-livre')}>
            ajouter un livre
        </button>

        <table>
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>ISBN</th>
                    <th>Catégorie</th>
                    <th>Nombre De Pages</th>
                    <th>Emplacement Rayon</th>
                    <th>Auteur</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {livres.map((livre) => (
                    <tr key={livre.id}>
                        <td>{livre.titre}</td>
                        <td>{livre.isbn}</td>
                        <td>{livre.categorie?.libelle}</td>
                        <td>{livre.details?.nombrePages}</td>
                        <td>{livre.details?.emplacementRayon}</td>
                        <td>{livre.details?.auteur}</td>
                        <td><button onClick={() => handleDelete(livre.id)}>Supprimer</button></td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>);
}
export default ListLivre;