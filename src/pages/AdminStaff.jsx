import React, { useState } from "react";
import "../styles/AdminStaff.css"; 

const AdminStaff = () => {
  const [employees, setEmployees] = useState([
    { 
      id: 1, firstName: "John", lastName: "Doe", username: "jdoe",
      password: "********", joinDate: "2020-05-15", email: "john@example.com",
      department: "Management"
    },
    { 
      id: 2, firstName: "Jane", lastName: "Smith", username: "jsmith",
      password: "********", joinDate: "2019-07-10", email: "jane@example.com",
      department: "Reception"
    },
  ]);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", username: "", password: "",
    joinDate: "", email: "", department: "Staff"
  });

  const [editingId, setEditingId] = useState(null);

  // Çalışma süresini hesapla
  const calculateWorkDuration = (joinDate) => {
    const join = new Date(joinDate);
    const today = new Date();
    const diffTime = Math.abs(today - join);
    
    const years = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));

    return `${years} Yıl, ${months} Ay, ${days} Gün`;
  };

  // Input değişikliklerini yönet
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Yeni çalışan ekle veya güncelle
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId !== null) {
      setEmployees(employees.map(emp => emp.id === editingId ? { ...emp, ...formData } : emp));
      setEditingId(null);
    } else {
      const newEmployee = { id: employees.length + 1, ...formData };
      setEmployees([...employees, newEmployee]);
    }
    setFormData({ firstName: "", lastName: "", username: "", password: "", joinDate: "", email: "", department: "Staff" });
  };

  // Çalışan bilgilerini düzenleme
  const handleEdit = (id) => {
    const employee = employees.find(emp => emp.id === id);
    setFormData(employee);
    setEditingId(id);
  };

  // Çalışan silme
  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className="manager-staff-container">
      <h2>Staff Management</h2>

      <div className="staff-dashboard">
        {/* Çalışan Ekleme/Güncelleme Formu */}
        <div className="staff-form">
          <h3>{editingId ? "Update Employee" : "Add New Employee"}</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <select name="department" value={formData.department} onChange={handleChange}>
              <option value="Management">Management</option>
              <option value="Reception">Reception</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Staff">Staff</option>
            </select>
            <button type="submit">{editingId ? "Update" : "Add Employee"}</button>
          </form>
        </div>

        {/* Çalışanları Listeleme Tablosu */}
        <div className="staff-list">
          <h3>Employee List</h3>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Password</th>
                <th>Join Date</th>
                <th>Work Duration</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.firstName}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.username}</td>
                  <td>********</td>
                  <td>{emp.joinDate}</td>
                  <td>{calculateWorkDuration(emp.joinDate)}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(emp.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(emp.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStaff;
