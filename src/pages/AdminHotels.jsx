import React, { useState, useEffect } from "react";
import "../styles/AdminHotels.css";
import axios from "axios";

const AdminHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({
    name: "",
    city: "",
    address: "",
    pricePerNight: "",
    capacity: "",
    amenities: "",
    photo: "",
  });
  const [editingHotel, setEditingHotel] = useState(null);

  // /api/hotels/withAmenities endpoint'ine istek atıyoruz
  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/hotels/withAmenities");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewHotel({ 
      ...newHotel, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  const addHotel = async () => {
    if (!newHotel.name || !newHotel.city || !newHotel.address) return;
    try {
      const response = await axios.post("http://localhost:8080/api/hotels", newHotel);
      setHotels([...hotels, response.data]);
      setNewHotel({
        name: "",
        city: "",
        address: "",
        pricePerNight: "",
        capacity: "",
        amenities: "",
        photo: "",
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
      address: hotel.address,
      pricePerNight: hotel.pricePerNight,
      capacity: hotel.capacity,
      amenities: hotel.amenities,
      photo: hotel.photo,
    });
  };

  const updateHotel = async () => {
    try {
      // Güncellenmeyecek alanları (örneğin, createdAt ve hotelId) payload'dan çıkarıyoruz.
      const { hotelId, createdAt, ...editingData } = editingHotel;
  
      // Form verilerindeki alanları da dahil ediyoruz.
      // Eğer formdan gelen alan undefined veya null ise, bunları payload'a eklemiyoruz.
      const updatedData = { ...editingData };
      Object.keys(newHotel).forEach((key) => {
        // Değer null veya undefined ise, boş string kullanarak controlled input hatasını önleyebiliriz.
        if (newHotel[key] !== undefined && newHotel[key] !== null) {
          updatedData[key] = newHotel[key];
        } else {
          updatedData[key] = ""; // Veya ihtiyaca göre, o alanı tamamen eklememeyi tercih edebilirsiniz.
        }
      });
  
      // Güncelleme isteği yaparken id'yi URL'den gönderiyoruz.
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
        address: "",
        pricePerNight: "",
        capacity: "",
        amenities: "",
        photo: "",
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
              {hotel.city} - {hotel.address}
            </p>
            <p>
              Price: ${hotel.pricePerNight} | Capacity: {hotel.capacity}
            </p>
            <p>
              Amenities: {hotel.amenities}
            </p>
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
