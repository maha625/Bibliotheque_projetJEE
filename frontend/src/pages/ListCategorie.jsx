import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const ListCategorie = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/categories");   
            if (Array.isArray(response.data)) {
                setCategories(response.data);
            } else {
                console.error("L'api n'a pas retourné un tableau de catégories:", response.data);
                setCategories([]);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            setLoading(false);
        }finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/categories/${id}`);
            // Refresh the list of categories after deletion
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };
    return (
        <div>
            <button onClick={() => navigate('/ajouter-categorie')}>
                ajouter categorie
            </button>
            <h1>List of Categories</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Libellé</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(categories) && categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.libelle}</td>
                            <td>
                                <button onClick={() => handleDelete(category.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ListCategorie;