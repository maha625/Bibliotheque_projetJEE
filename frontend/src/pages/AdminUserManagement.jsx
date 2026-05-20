import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminUserManagement.css';

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    
    // État pour gérer le popup (Modal)
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: 'add', // 'add' ou 'update'
        userId: null,
        username: '',
        password: '',
        role: 'USER'
    });

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

    // Ouvre le modal en mode "Ajout"
    const openAddModal = () => {
        setModalConfig({
            isOpen: true,
            type: 'add',
            userId: null,
            username: '',
            password: '',
            role: 'USER'
        });
    };

    // Ouvre le modal en mode "Modification"
    const openUpdateModal = (user) => {
        // Récupère le premier rôle ou défaut 'USER'
        const currentRole = user.roles && user.roles.length > 0 ? user.roles[0].name : 'USER';
        
        setModalConfig({
            isOpen: true,
            type: 'update',
            userId: user.id,
            username: user.username,
            password: '', 
            role: currentRole
        });
    };

    const closeModal = () => {
        setModalConfig({ ...modalConfig, isOpen: false });
    };

    // Soumission du formulaire du Modal
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const { type, username, password, role, userId } = modalConfig;

        if (!username) return alert("Le nom d'utilisateur est requis");

        try {
            if (type === 'add') {
                if (!password) return alert("Le mot de passe est requis");
                await axios.post(`http://localhost:8080/api/admin/users?role=${role}`, {
                    username,
                    password
                });
            } else if (type === 'update') {
                // Utilise le rôle sélectionné dans la liste déroulante du modal
                await axios.put(`http://localhost:8080/api/admin/users/${userId}`, {
                    username: username,
                    roles: [{ name: role }] 
                });
            }
            fetchUsers();
            closeModal();
        } catch (error) {
            alert(`Erreur lors de l'opération (${type})`);
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
        <div className="library-admin-container">
            <div className="library-header">
                <h2>Gestion du Personnel // Registre Central</h2>
                <button onClick={openAddModal} className="btn-add-user">
                    + Enregistrer un membre
                </button>
            </div>
            
            <table className="library-table">
                <thead>
                    <tr>
                        <th>Cote [id]</th>
                        <th>Identifiant</th>
                        <th>Rang d'accès</th>
                        <th>Actions administratives</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>#{user.id}</td>
                            <td><strong>{user.username}</strong></td>
                            <td>
                                {user.roles.map((r, index) => (
                                    <span key={index} className="role-badge">
                                        {r.name}
                                    </span>
                                ))}
                            </td>
                            <td>
                                <button onClick={() => openUpdateModal(user)} className="btn-action-modify">
                                    Rectifier
                                </button>
                                <button onClick={() => handleDelete(user.id)} className="btn-action-delete">
                                    Révoquer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* --- LE MODAL CHIC --- */}
            {modalConfig.isOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">
                            {modalConfig.type === 'add' ? 'Nouvelle Fiche Membre' : 'Rectification de la Fiche'}
                        </h3>
                        <form onSubmit={handleFormSubmit} className="modal-form">
                            
                            {/* Toujours visible : Identifiant */}
                            <div className="form-group">
                                <label>Identifiant (Username)</label>
                                <input 
                                    type="text" 
                                    value={modalConfig.username}
                                    onChange={(e) => setModalConfig({...modalConfig, username: e.target.value})}
                                    placeholder="Ex: a_camus"
                                    required
                                />
                            </div>

                            {/* Visible uniquement à l'Ajout : Mot de passe */}
                            {modalConfig.type === 'add' && (
                                <div className="form-group">
                                    <label>Mot de passe</label>
                                    <input 
                                        type="password" 
                                        value={modalConfig.password}
                                        onChange={(e) => setModalConfig({...modalConfig, password: e.target.value})}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            )}

                            {/* Toujours visible : Sélection du rôle (Ajout ET Rectification) */}
                            <div className="form-group">
                                <label>Rang d'accès (Rôle)</label>
                                <select 
                                    value={modalConfig.role}
                                    onChange={(e) => setModalConfig({...modalConfig, role: e.target.value})}
                                >
                                    <option value="USER">USER</option>
                                    <option value="MANAGER">MANAGER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </div>

                            <div className="modal-actions">
                                <button type="button" onClick={closeModal} className="btn-cancel">
                                    Annuler
                                </button>
                                <button type="submit" className="btn-submit">
                                    {modalConfig.type === 'add' ? 'Inscrire' : 'Appliquer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUserManagement;