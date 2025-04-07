import React, { useState, useEffect } from "react";
import "../styles/AdminHotels.css";
import axios from "axios";

const AdminHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({
    hotelName: "",
    city: "",
    address: "",
    pricePerNight: "",
    capacity: "",
    amenities: "", // Virgülle ayrılmış string; backend'de parse edilebilir.
    photo: "",
    featured: false,
  });
  const [editingHotel, setEditingHotel] = useState(null);

  // Backend'den otel verilerini çek
  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/hotels");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHotel({ ...newHotel, [name]: value });
  };

  const addHotel = async () => {
    // Gerekli alanların doldurulduğundan emin olun
    if (!newHotel.hotelName || !newHotel.city || !newHotel.address) return;
    try {
      // POST isteği gönderirken, front-end'ten gelen "hotelName" değeri
      // backend tarafında "name" alanına aktarılacaktır.
      const response = await axios.post("http://localhost:8080/api/hotels", newHotel);
      setHotels([...hotels, response.data]);
      // Formu sıfırla
      setNewHotel({
        hotelName: "",
        city: "",
        address: "",
        pricePerNight: "",
        capacity: "",
        amenities: "",
        photo: "",
        featured: false,
      });
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };

  const deleteHotel = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/hotels/${id}`);
      setHotels(hotels.filter((hotel) => hotel.hotel_id !== id));
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const editHotel = (hotel) => {
    setEditingHotel(hotel);
    // Map JSON verisinde "name" alanı otel adını temsil ettiği için,
    // onu "hotelName" olarak set ediyoruz.
    setNewHotel({
      hotelName: hotel.name,
      city: hotel.city,
      address: hotel.address,
      pricePerNight: hotel.price_per_night,
      capacity: hotel.capacity,
      amenities:
        typeof hotel.amenities === "string"
          ? hotel.amenities
          : Array.isArray(hotel.amenities)
          ? hotel.amenities.join(", ")
          : "",
      photo: hotel.photo,
      featured: hotel.featured,
    });
  };

  const updateHotel = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/hotels/${editingHotel.hotel_id}`,
        newHotel
      );
      setHotels(
        hotels.map((hotel) =>
          hotel.hotel_id === editingHotel.hotel_id ? response.data : hotel
        )
      );
      setEditingHotel(null);
      setNewHotel({
        hotelName: "",
        city: "",
        address: "",
        pricePerNight: "",
        capacity: "",
        amenities: "",
        photo: "",
        featured: false,
      });
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  return (
    <div id="admin-hotel-container">
      <div id="admin-hotel-management-title">Hotel Management</div>
      
      {/* Form Alanı */}
      <div id="admin-hotel-form">
        <input
          type="text"
          name="hotelName"
          placeholder="Hotel Name"
          value={newHotel.hotelName}
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

      {/* Otel Listesi */}
      <div id="admin-hotel-list">
        {hotels.map((hotel) => (
          <div className="admin-hotel-item" key={hotel.hotel_id} id={hotel.hotel_id}>
            <div className="admin-hotel-title">{hotel.name}</div>
            <p>
              {hotel.city} - {hotel.address}
            </p>
            <p>
              Price: ${hotel.price_per_night} | Capacity: {hotel.capacity}
            </p>
            <p>
              Amenities:{" "}
              {typeof hotel.amenities === "string"
                ? hotel.amenities
                : Array.isArray(hotel.amenities)
                ? hotel.amenities.join(", ")
                : ""}
            </p>
            <button className="admin-hotel-edit-btn" onClick={() => editHotel(hotel)}>
              Edit
            </button>
            <button className="admin-hotel-delete-btn" onClick={() => deleteHotel(hotel.hotel_id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHotel;
