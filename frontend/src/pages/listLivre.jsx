import React, { useState, useEffect } from "react";
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
            setLoading(true);
            const response = await axios.get(API_URL);
            setLivres(response.data);
        } catch (error) {
            console.error("Error fetching livres:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce livre ?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setLivres(livres.filter(l => l.id !== id)); // Mise à jour locale sans recharger
                alert("Livre supprimé");
            } catch (error) {
                console.error("Error deleting livre:", error);
                alert("Erreur lors de la suppression");
            }
        }
    };

    if (loading) return <div>Chargement en cours...</div>;

    return (
        <div>
            <h2>Liste des livres</h2>
            <p><strong>{livres.length}</strong> livres trouvés</p>
            <button onClick={() => navigate('/ajouter-livre')} >
                + Ajouter un livre
            </button>

            <table >
                <thead>
                    <tr >
                        <th>Titre</th>
                        <th>ISBN</th>
                        <th>Catégorie</th>
                        <th>Pages</th>
                        <th>Rayon</th>
                        <th>Auteur</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {livres.map((livre) => (
                        <tr key={livre.id}>
                            <td>{livre.titre}</td>
                            <td>{livre.isbn}</td>
                            <td>{livre.categorie?.libelle || "N/A"}</td>
                            <td>{livre.details?.nombrePages || "-"}</td>
                            <td>{livre.details?.emplacementRayon || "-"}</td>
                            <td>{livre.details?.auteur || "-"}</td>
                            <td>
                                <button onClick={() => navigate(`/modifier-livre/${livre.id}`)} >
                                    Modifier
                                </button>
                                <button onClick={() => handleDelete(livre.id)} >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListLivre;