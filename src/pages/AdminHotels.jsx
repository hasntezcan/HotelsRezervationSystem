import React, { useState } from "react";
import "../styles/AdminHotels.css";
import hotelsData from "../assets/data/hotels";

const AdminHotel = () => {
  const [hotels, setHotels] = useState(hotelsData);
  const [newHotel, setNewHotel] = useState({
    title: "",
    city: "",
    address: "",
    price: "",
    maxGroupSize: "",
    amenities: "",
    photo: "",
  });
  const [editingHotel, setEditingHotel] = useState(null);

  const handleChange = (e) => {
    setNewHotel({ ...newHotel, [e.target.name]: e.target.value });
  };

  const addHotel = () => {
    if (!newHotel.title || !newHotel.city || !newHotel.address) return;
    const updatedHotels = [...hotels, { ...newHotel, _id: `hotel-${hotels.length + 1}` }];
    setHotels(updatedHotels);
    setNewHotel({
      title: "",
      city: "",
      address: "",
      price: "",
      maxGroupSize: "",
      amenities: "",
      photo: "",
    });
  };

  const deleteHotel = (id) => {
    setHotels(hotels.filter((hotel) => hotel._id !== id));
  };

  const editHotel = (hotel) => {
    setEditingHotel(hotel);
    setNewHotel(hotel);
  };

  const updateHotel = () => {
    setHotels(hotels.map((hotel) => (hotel._id === editingHotel._id ? { ...newHotel, _id: editingHotel._id } : hotel)));
    setEditingHotel(null);
    setNewHotel({
      title: "",
      city: "",
      address: "",
      price: "",
      maxGroupSize: "",
      amenities: "",
      photo: "",
    });
  };

  return (
    <div id="admin-hotel-container">
      <div id="admin-hotel-management-title">Hotel Management</div>
      
      {/* 📌 Form Alanı */}
      <div id="admin-hotel-form">
        <input type="text" name="title" placeholder="Hotel Name" value={newHotel.title} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" value={newHotel.city} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" value={newHotel.address} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price per night" value={newHotel.price} onChange={handleChange} />
        <input type="number" name="maxGroupSize" placeholder="Max Group Size" value={newHotel.maxGroupSize} onChange={handleChange} />
        <input type="text" name="amenities" placeholder="Amenities (comma separated)" value={newHotel.amenities} onChange={handleChange} />
        <input type="text" name="photo" placeholder="Photo URL" value={newHotel.photo} onChange={handleChange} />

        {/* 📌 Güncelle / Ekle Butonu */}
        {editingHotel ? (
          <button id="admin-hotel-button" onClick={updateHotel}>Update Hotel</button>
        ) : (
          <button id="admin-hotel-button" onClick={addHotel}>Add Hotel</button>
        )}
      </div>

      {/* 📌 Otel Listesi */}
      <div id="admin-hotel-list">
        {hotels.map((hotel) => (
          <div className="admin-hotel-item" key={hotel._id} id={hotel._id}>
            <div className="admin-hotel-title">{hotel.title}</div>
            <p>{hotel.city} - {hotel.address}</p>
            <p>Price: ${hotel.price} | Max Group: {hotel.maxGroupSize}</p>
            <p>Amenities: {hotel.amenities.join(", ")}</p>
            <button className="admin-hotel-edit-btn" onClick={() => editHotel(hotel)}>Edit</button>
            <button className="admin-hotel-delete-btn" onClick={() => deleteHotel(hotel._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHotel;
