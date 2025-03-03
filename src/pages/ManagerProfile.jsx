import React, { useState } from "react";
import "../styles/ManagerProfile.css";

const ManagerProfile = () => {
    const [manager, setManager] = useState({
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        password: "12345678",
        entryDate: "2020-05-15",
        workDuration: "3 years, 8 months, 10 days",
        email: "johndoe@example.com",
        department: "Management"
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setManager({ ...manager, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleUpdate = () => {
        alert("Profile updated successfully!");
    };

    return (
        <div className="profile-container">
            <h2>Manager Profile</h2>
            <div className="profile-form">
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={manager.firstName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={manager.lastName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={manager.username} onChange={handleChange} />
                </div>
                <div className="form-group password-group">
                    <label>Password</label>
                    <div className="password-wrapper">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            value={manager.password} 
                            onChange={handleChange} 
                        />
                        <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                            {showPassword ? "👁️" : "🙈"}
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label>Entry Date</label>
                    <input type="date" name="entryDate" value={manager.entryDate} disabled />
                </div>
                <div className="form-group">
                    <label>Work Duration</label>
                    <input type="text" name="workDuration" value={manager.workDuration} disabled />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={manager.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Department</label>
                    <input type="text" name="department" value={manager.department} disabled />
                </div>
                <button className="update-btn" onClick={handleUpdate}>Update Profile</button>
            </div>
        </div>
    );
};

export default ManagerProfile;
