import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);

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

    // LOGIQUE DE CRÉATION
    const handleAdd = async () => {
        const username = prompt("Nom du nouvel utilisateur :");
        const password = prompt("Mot de passe :");
        const role = prompt("Rôle (ADMIN, MANAGER ou USER) :", "USER");
        
        if (username && password && role) {
            try {
                await axios.post(`http://localhost:8080/api/admin/users?role=${role}`, {
                    username,
                    password
                });
                fetchUsers();
            } catch (error) {
                alert("Erreur lors de la création");
            }
        }
    };

    // LOGIQUE DE MODIFICATION (Utilise le UserDTO coté Back)
    const handleUpdate = async (user) => {
        const newUsername = prompt("Nouveau nom d'utilisateur :", user.username);
        if (newUsername) {
            try {
                await axios.put(`http://localhost:8080/api/admin/users/${user.id}`, {
                    username: newUsername,
                    roles: user.roles.map(r => r.name) 
                });
                fetchUsers();
            } catch (error) {
                alert("Erreur lors de la modification");
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer cet utilisateur ?")) {
            try {
                await axios.delete(`http://localhost:8080/api/admin/users/${id}`);
                fetchUsers();
            } catch (error) {
                alert("Erreur lors de la suppression");
            }
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2>Gestion des Utilisateurs</h2>
                <button onClick={handleAdd} style={{ backgroundColor: '#28a745', color: 'white', padding: '10px' }}>
                    + Ajouter un utilisateur
                </button>
            </div>
            
            <table border="1" width="100%" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>ID</th>
                        <th>Nom d'utilisateur</th>
                        <th>Rôles</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.roles.map(r => r.name).join(', ')}</td>
                            <td>
                                <button onClick={() => handleUpdate(user)} style={{ marginRight: '10px' }}>
                                    Modifier
                                </button>
                                <button onClick={() => handleDelete(user.id)} style={{ color: 'red' }}>
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

export default AdminUserManagement;