import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    // Charger les utilisateurs au montage du composant
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/admin/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération :", error);
        }
    };
    const handleUpdate = async (user) => {
    const newUsername = prompt("Nouveau nom d'utilisateur :", user.username);
    if (newUsername) {
        try {
            await axios.put(`http://localhost:8080/api/admin/users/${user.id}`, {
                username: newUsername,
                roles: user.roles.map(r => r.name) // On renvoie les noms des rôles
            });
            fetchUsers(); // Rafraîchir la liste
        } catch (error) {
            alert("Erreur lors de la modification");
        }
    }
};

    const handleDelete = async (id) => {
        if(window.confirm("Supprimer cet utilisateur ?")) {
            await axios.delete(`http://localhost:8080/api/admin/users/${id}`);
            fetchUsers(); // Recharger la liste
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Gestion des Utilisateurs</h2>
            <table border="1" width="100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom d'utilisateur</th>
                        <th>Rôles</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.roles.map(r => r.name).join(', ')}</td>
                            <td>
                                <button onClick={() => handleDelete(user.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;