import React, { useState, useEffect } from "react";
import "../styles/AdminHotels.css";
import axios from "axios";

const AdminHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [managers, setManagers] = useState([]); // Yeni state
  const [newHotel, setNewHotel] = useState({
    name: "",
    city: "",
    country: "",
    address: "",
    pricePerNight: "",
    capacity: "",
    amenities: "",
    photo: "",
    managerId: ""   // Manager seçimi için (opsiyonel)
  });
  const [editingHotel, setEditingHotel] = useState(null);

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/hotels/withAmenities");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  // Yeni: Manager listesini çekme fonksiyonu
  const fetchManagers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/managers");
      setManagers(response.data);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
    fetchManagers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewHotel({
      ...newHotel,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addHotel = async () => {
    if (!newHotel.name || !newHotel.city || !newHotel.address) return;
    try {
      const response = await axios.post("http://localhost:8080/api/hotels", newHotel);
      setHotels([...hotels, response.data]);
      // Formu resetleyin:
      setNewHotel({
        name: "",
        city: "",
        country: "",
        address: "",
        pricePerNight: "",
        capacity: "",
        amenities: "",
        photo: "",
        managerId: ""
      });
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };

  const deleteHotel = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/hotels/${id}`);
      setHotels(hotels.filter((hotel) => hotel.hotelId !== id));
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const editHotel = (hotel) => {
    setEditingHotel(hotel);
    setNewHotel({
      name: hotel.name,
      city: hotel.city,
      country: hotel.country,
      address: hotel.address,
      pricePerNight: hotel.pricePerNight,
      capacity: hotel.capacity,
      amenities: hotel.amenities,
      photo: hotel.photo,
      managerId: hotel.managerId || ""   // Mevcut manager varsa
    });
  };

  const updateHotel = async () => {
    try {
      const { hotelId, createdAt, ...editingData } = editingHotel;
      const updatedData = { ...editingData };
      Object.keys(newHotel).forEach((key) => {
        updatedData[key] = newHotel[key] !== undefined && newHotel[key] !== null ? newHotel[key] : "";
      });
      const response = await axios.put(
        `http://localhost:8080/api/hotels/${editingHotel.hotelId}`,
        updatedData
      );
      setHotels(
        hotels.map((hotel) =>
          hotel.hotelId === editingHotel.hotelId ? response.data : hotel
        )
      );
      setEditingHotel(null);
      setNewHotel({
        name: "",
        city: "",
        country: "",
        address: "",
        pricePerNight: "",
        capacity: "",
        amenities: "",
        photo: "",
        managerId: ""
      });
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  return (
    <div id="admin-hotel-container">
      <div id="admin-hotel-management-title">Hotel Management</div>

      <div id="admin-hotel-form">
        <input
          type="text"
          name="name"
          placeholder="Hotel Name"
          value={newHotel.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={newHotel.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={newHotel.country}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newHotel.address}
          onChange={handleChange}
        />
        <input
          type="number"
          name="pricePerNight"
          placeholder="Price per night"
          value={newHotel.pricePerNight}
          onChange={handleChange}
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={newHotel.capacity}
          onChange={handleChange}
        />
        <input
          type="text"
          name="amenities"
          placeholder="Amenities (comma separated)"
          value={newHotel.amenities}
          onChange={handleChange}
        />
        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={newHotel.photo}
          onChange={handleChange}
        />
        {/* Yeni: Manager seçimi için dropdown */}
        <select name="managerId" value={newHotel.managerId} onChange={handleChange}>
          <option value="">Select Manager</option>
          {managers.map((manager) => (
            <option key={manager.managerId} value={manager.managerId}>
              {manager.managerName} {/* İsim olarak firstName veya username kullanabilirsiniz */}
            </option>
          ))}
        </select>
        {editingHotel ? (
          <button id="admin-hotel-button" onClick={updateHotel}>
            Update Hotel
          </button>
        ) : (
          <button id="admin-hotel-button" onClick={addHotel}>
            Add Hotel
          </button>
        )}
      </div>

      <div id="admin-hotel-list">
        {hotels.map((hotel) => (
          <div className="admin-hotel-item" key={hotel.hotelId} id={hotel.hotelId}>
            <div className="admin-hotel-title">{hotel.name}</div>
            <p>
              {hotel.city}, {hotel.country} - {hotel.address}
            </p>
            <p>
              Price: ${hotel.pricePerNight} | Capacity: {hotel.capacity}
            </p>
            <p>Amenities: {hotel.amenities}</p>
            {/* Eğer manager bilgisi de varsa gösterelim */}
            {hotel.managerName && <p>Manager: {hotel.managerName}</p>}
            <button className="admin-hotel-edit-btn" onClick={() => editHotel(hotel)}>
              Edit
            </button>
            <button className="admin-hotel-delete-btn" onClick={() => deleteHotel(hotel.hotelId)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHotel;
