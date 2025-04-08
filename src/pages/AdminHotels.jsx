import React, { useState, useEffect } from "react";
import "../styles/AdminHotels.css";  // CSS dosyası
import axios from "axios";

// Sabit 8 amenity başlığımız:
const AMENITIES_LIST = [
  "Free Wi-Fi",
  "Parking",
  "Swimming Pool",
  "Fitness Center",
  "Spa",
  "Restaurant",
  "Bar",
  "Airport Shuttle"
];

const AdminHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [managers, setManagers] = useState([]);
  const [newHotel, setNewHotel] = useState({
    name: "",
    city: "",
    country: "",
    address: "",
    pricePerNight: "",
    capacity: "",
    amenities: "", // Burada string olarak tutulacak (örneğin "Wi-Fi, Parking, ...")
    photo: "",
    managerId: ""
  });

  // Modal açıp kapamak için gereken state
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);

  // Seçili amenity’leri ayrı bir dizi olarak tutuyoruz
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [editingHotel, setEditingHotel] = useState(null);

  // Otelleri fetchleyen fonksiyon
  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/hotels/withAmenities");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  // Manager listesini çekme
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

  // newHotel state'ini güncelleme
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewHotel({
      ...newHotel,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Amenity checkbox değişimlerini yönetme
  const handleAmenityChange = (amenity) => {
    // Zaten seçiliyse çıkar, değilse ekle
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  // Modalı açma
  const openAmenitiesModal = () => {
    setShowAmenitiesModal(true);
  };

  // "Done" butonuna basılınca amenity'leri birleştirip kapatma
  const handleAmenitiesDone = () => {
    // Seçili amenityleri virgülle birleştirerek newHotel.amenities’e atayalım
    setNewHotel((prev) => ({
      ...prev,
      amenities: selectedAmenities.join(", "),
    }));
    setShowAmenitiesModal(false);
  };

  // Otel ekleme
  const addHotel = async () => {
    if (!newHotel.name || !newHotel.city || !newHotel.address) return;
    try {
      // newHotel.amenities alanında checkbox’tan gelen değerler virgüllü string olarak olacak
      const response = await axios.post("http://localhost:8080/api/hotels", newHotel);
      setHotels([...hotels, response.data]);

      // Formu resetle
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
      setSelectedAmenities([]); // Seçili amenity’leri de sıfırla
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };

  // Otel silme
  const deleteHotel = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/hotels/${id}`);
      setHotels(hotels.filter((hotel) => hotel.hotelId !== id));
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  // Otel düzenleme moduna geçme
  const editHotel = (hotel) => {
    setEditingHotel(hotel);

    // Mevcut verileri newHotel’e ve selectedAmenities’e taşıyalım
    setNewHotel({
      name: hotel.name || "",
      city: hotel.city || "",
      country: hotel.country || "",
      address: hotel.address || "",
      pricePerNight: hotel.pricePerNight || "",
      capacity: hotel.capacity || "",
      amenities: hotel.amenities || "",
      photo: hotel.photo || "",
      managerId: hotel.managerId || ""
    });

    // Database'de virgüllü string olarak duruyorsa, array'e çevir
    if (hotel.amenities) {
      const splitted = hotel.amenities.split(",").map((item) => item.trim());
      setSelectedAmenities(splitted);
    } else {
      setSelectedAmenities([]);
    }
  };

  // Otel güncelleme
  const updateHotel = async () => {
    try {
      const { hotelId, createdAt, ...editingData } = editingHotel;
      const updatedData = { ...editingData };

      // newHotel objemiz ile updatedData'yı birleştir
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
      setSelectedAmenities([]);
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
        {/* "Amenities" input'unu kaldırıp yerine buton koyduk */}
        <button
          type="button"
          className="select-amenities-btn"
          onClick={openAmenitiesModal}
        >
          Select Amenities
        </button>
        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={newHotel.photo}
          onChange={handleChange}
        />
        <select
          name="managerId"
          value={newHotel.managerId}
          onChange={handleChange}
        >
          <option value="">Select Manager</option>
          {managers.map((manager) => (
            <option key={manager.managerId} value={manager.managerId}>
              {manager.managerName}
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

      {/* Mevcut seçilen amenity’leri formun üzerinde gösterelim (opsiyonel) */}
      {newHotel.amenities && (
        <div style={{ margin: "10px", color: "#fff" }}>
          <strong>Selected Amenities:</strong> {newHotel.amenities}
        </div>
      )}

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
            {hotel.managerName && <p>Manager: {hotel.managerName}</p>}
            <button
              className="admin-hotel-edit-btn"
              onClick={() => editHotel(hotel)}
            >
              Edit
            </button>
            <button
              className="admin-hotel-delete-btn"
              onClick={() => deleteHotel(hotel.hotelId)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {showAmenitiesModal && (
  <>
    <div className="amenities-overlay" onClick={() => setShowAmenitiesModal(false)} />
    <div className="amenities-modal">
      <h2>Select Amenities</h2>
      <div className="amenities-list">
        {AMENITIES_LIST.map((amenity) => (
          <label key={amenity} className="amenity-item">
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity)}
              onChange={() => handleAmenityChange(amenity)}
            />
            {amenity}
          </label>
        ))}
      </div>
      {/* Butonları bir container içine koyup yan yana konumlandırdık */}
      <div className="amenities-button-container">
        <button className="amenities-done-btn" onClick={handleAmenitiesDone}>
          Done
        </button>
        <button
          className="amenities-cancel-btn"
          onClick={() => setShowAmenitiesModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </>
)}
    </div>
  );
};

export default AdminHotel;
