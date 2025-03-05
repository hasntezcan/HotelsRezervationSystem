import React, { useState } from "react";
import "../styles/AdminStaff.css";

const AdminUser = () => {
    const [managers, setManagers] = useState([
        { name: "Alice Johnson", email: "alice@example.com", hotelName: "Grand Hotel", city: "New York", username: "aliceJ", password: "password123" },
        { name: "Bob Smith", email: "bob@example.com", hotelName: "Sunset Resort", city: "Los Angeles", username: "bobS", password: "securepass" }
    ]);
    
    const [users, setUsers] = useState([
        { username: "john_doe" },
        { username: "jane_doe" }
    ]);
    
    const [deleteRequests, setDeleteRequests] = useState([
        { username: "mark_will", reason: "Account Deletion Request" }
    ]);
    
    const [newManager, setNewManager] = useState({
        name: "",
        email: "",
        hotelName: "",
        city: "",
        username: "",
        password: ""
    });

    const handleInputChange = (e) => {
        setNewManager({ ...newManager, [e.target.name]: e.target.value });
    };

    const addManager = () => {
        setManagers([...managers, newManager]);
        setNewManager({ name: "", email: "", hotelName: "", city: "", username: "", password: "" });
    };

    const deleteManager = (username) => {
        setManagers(managers.filter(manager => manager.username !== username));
    };

    const editManager = (index) => {
        const managerToEdit = managers[index];
        setNewManager(managerToEdit);
    };

    const deleteUser = (username) => {
        setUsers(users.filter(user => user.username !== username));
    };
    
    const approveDeleteRequest = (username) => {
        setDeleteRequests(deleteRequests.filter(request => request.username !== username));
        setUsers(users.filter(user => user.username !== username));
    };

    return (
        <div className="admin-user-page-container">
            <h1 className="admin-user-title">Admin User Management</h1>
            <div className="admin-user-management-section">
                {/* Manager Ekleme Bölümü */}
                <div className="admin-user-section fixed-section" style={{ color: "white" }}>
                    <h2>Add Manager</h2>
                    <div className="admin-user-form grid-layout">
                        <div className="admin-user-input-group">
                            <input className="admin-user-input" type="text" name="name" placeholder="Name" value={newManager.name} onChange={handleInputChange} />
                            <input className="admin-user-input" type="email" name="email" placeholder="Email" value={newManager.email} onChange={handleInputChange} />
                            <input className="admin-user-input" type="text" name="hotelName" placeholder="Hotel Name" value={newManager.hotelName} onChange={handleInputChange} />
                        </div>
                        <div className="admin-user-input-group">
                            <input className="admin-user-input" type="text" name="city" placeholder="City" value={newManager.city} onChange={handleInputChange} />
                            <input className="admin-user-input" type="text" name="username" placeholder="Username" value={newManager.username} onChange={handleInputChange} />
                            <input className="admin-user-input" type="password" name="password" placeholder="Password" value={newManager.password} onChange={handleInputChange} />
                        </div>
                    </div>
                    <button className="admin-user-button" onClick={addManager}>Add Manager</button>
                </div>

                {/* Managerları Görme */}
                <div className="admin-user-section" style={{ color: "white" }}>
                    <h2>Managers List</h2>
                    <ul className="admin-user-list">
                        {managers.map((manager, index) => (
                            <li className="admin-user-list-item" key={index} style={{ color: "white" }}>
                                {manager.name} ({manager.email}) - {manager.hotelName}, {manager.city}
                                <button className="admin-user-edit-btn" onClick={() => editManager(index)}>Edit</button>
                                <button className="admin-user-delete-btn" onClick={() => deleteManager(manager.username)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Kullanıcıları Görme ve Silme */}
                <div className="admin-user-section" style={{ color: "white" }}>
                    <h2>Users List</h2>
                    <ul className="admin-user-list">
                        {users.map((user, index) => (
                            <li className="admin-user-list-item" key={index} style={{ color: "white" }}>{user.username} <button className="admin-user-delete-btn" onClick={() => deleteUser(user.username)}>Delete</button></li>
                        ))}
                    </ul>
                </div>

                {/* Kullanıcı ve Manager Silme Talepleri */}
                <div className="admin-user-section" style={{ color: "white" }}>
                    <h2>Delete Requests</h2>
                    <ul className="admin-user-list">
                        {deleteRequests.map((request, index) => (
                            <li className="admin-user-list-item" key={index} style={{ color: "white" }}>
                                {request.username} requested account deletion
                                <button className="admin-user-delete-btn" onClick={() => approveDeleteRequest(request.username)}>Approve</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminUser;
