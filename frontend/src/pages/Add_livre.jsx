import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AjouterLivre = () => {
    const navigate = useNavigate();
    const[categories, setCategories] = useState([]);
    const [livre, setLivre] = useState({
        titre: "",
        isbn: "",
        categorie: {id: ""},
        details:{
            nombrePages: "",
            emplacementRayon: "",
            auteur: ""
        }
    })
    useEffect(() => {
        const fetchCategories = async () => {
            try {const response = await axios.get("http://localhost:8080/api/categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des catégories:", error);
            }
        };
        fetchCategories();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if(["nombrePages", "emplacementRayon", "auteur"].includes(name)){
            setLivre({
                ...livre,
                details: {
                    ...livre.details,
                    [name]: value
                }
            })
        }else if(name === "categorie"){
            setLivre({
                ...livre,
                categorie: {
                    id: value
                }
            })
        }else{
            setLivre({
                ...livre,
                [name]: value
            })
        }
    }
    const  handleSubmit = async(e) => {
        e.preventDefault();
        if(!livre.categorie.id){
            alert("Veuillez sélectionner une catégorie");
            return;
        }
        const livreData = {
            ...livre,
            categorie:{
                id: parseInt(livre.categorie.id, 10)
            },
            details: {
                ...livre.details,
                nombrePages: parseInt(livre.details.nombrePages, 10)
            }
        };
        try {
            const reponse = await axios.post("http://localhost:8080/api/livres", livreData);
            alert("Livre ajouté avec succès");
            console.log(reponse.data);
            navigate("/ListLivres");
        }catch (error) {
            console.error("Erreur lors de l'ajout du livre:", error);
            alert("Erreur lors de l'ajout du livre");
        }
    }
    
    return (
        <div>   
        <h2>Ajouter un livre</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="titre">Titre:</label>
            <input type="text" id="titre" name="titre" value={livre.titre} onChange={handleChange} />
            <label htmlFor="isbn">ISBN:</label>
            <input type="text" id="isbn" name="isbn" value={livre.isbn} onChange={handleChange} />
            <label htmlFor="categorie">Catégorie:</label>
            <select id="categorie" name="categorie" value={livre.categorie.id} onChange={handleChange}>
                <option value="">Sélectionnez une catégorie</option>
                {Array.isArray(categories) && categories.map((categorie) => (
                    <option key={categorie.id} value={categorie.id}>
                        {categorie.libelle}
                    </option>
                ))}
            </select>
            <label htmlFor="nombrePages">Nombre de page:</label>
            <input id="nombrePages" type="number" name='nombrePages' value={livre.details.nombrePages} onChange={handleChange} />
            <label>Emplacement Rayon:</label>
            <input type="text" id="emplacementRayon" name="emplacementRayon" value={livre.details.emplacementRayon} onChange={handleChange} />
            <label htmlFor="auteur">Auteur:</label>
            <input type="text" id="auteur" name="auteur" value={livre.details.auteur} onChange={handleChange} />
            <button type="submit">Ajouter</button>
        </form>
        </div>
    );

}
export default AjouterLivre;    