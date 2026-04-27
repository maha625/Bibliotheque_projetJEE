import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
const Add_Categorie = () => {
    const [libelle, setLibelle] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/categories", {libelle});
            alert("Category added successfully!");
            navigate("/listCategorie");
        } catch (error) {
            console.error("Error adding category:", error);
            alert("Failed to add category. Please try again.");
        }
    };  
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="libelle">Libellé:</label>
                <input type="text" id="libelle" name="libelle" value={libelle} onChange={(e) => setLibelle(e.target.value)} required />
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
}
export default Add_Categorie;