import React, { useState, useEffect } from "react";
import "../styles/AdminHotels.css";  // CSS dosyanız
import axios from "axios";

// Sabit amenity başlıkları (daha sonrasında backend'den gelen amenity bilgileri kullanılacak)
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
  
  // Ekstra form alanları, otel ekleme/düzenleme için kullanılıyor fakat listeleme kısmında önemli değil.
  const [newHotel, setNewHotel] = useState({
    name: "",
    city: "",
    country: "",
    address: "",
    amenities: "", // Checkbox'lardan gelen amenity bilgileri virgülle ayrılmış string olarak tutulacak.
    photo: "",
    managerId: ""
  });
  
  // Modal durumları (amenity seçimi için)
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [editingHotel, setEditingHotel] = useState(null);

  // Otelleri çekme: Yönetici paneli için hazırlanan endpoint'ten AdminHotelDTO listesi alınıyor.
  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/hotels");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  // (Duruma göre kullanılır) Manager listesini çekme
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
    // Manager seçimleri gerekiyorsa aşağıdaki satırı aktif edebilirsiniz:
    // fetchManagers();
  }, []);

  // ----- Aşağıdaki kısım otel ekleme/düzenleme işlemleri içindir. Eğer sadece listeleme yapacaksanız, bu kısımları devre dışı bırakabilirsiniz. -----

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewHotel((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const openAmenitiesModal = () => {
    setShowAmenitiesModal(true);
  };

  const handleAmenitiesDone = () => {
    setNewHotel((prev) => ({
      ...prev,
      amenities: selectedAmenities.join(", "),
    }));
    setShowAmenitiesModal(false);
  };

  const addHotel = async () => {
    if (!newHotel.name || !newHotel.city || !newHotel.address) return;
    try {
      const response = await axios.post("http://localhost:8080/api/hotels", newHotel);
      setHotels([...hotels, response.data]);
      setNewHotel({
        name: "",
        city: "",
        country: "",
        address: "",
        amenities: "",
        photo: "",
        managerId: ""
      });
      setSelectedAmenities([]);
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
      name: hotel.name || "",
      city: hotel.city || "",
      country: hotel.country || "",
      address: hotel.address || "",
      amenities: hotel.amenities || "",
      photo: hotel.photoUrl || "", // photoUrl alanı backend'den geliyor
      managerId: hotel.managerId || ""
    });
    if (hotel.amenities) {
      const splitted = hotel.amenities.split(",").map((item) => item.trim());
      setSelectedAmenities(splitted);
    } else {
      setSelectedAmenities([]);
    }
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
        amenities: "",
        photo: "",
        managerId: ""
      });
      setSelectedAmenities([]);
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  // ----- Listeleme kısmı ----- 
  // Backend'den dönen verilerde; hotel.name, hotel.city, hotel.country, hotel.managerName, hotel.photoUrl ve hotel.amenities alanları vardır.
  return (
    <div id="admin-hotel-container">
      <div id="admin-hotel-management-title">Hotel Management</div>

      {/* Otel ekleme/düzenleme formu (isteğe bağlı) */}
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

      {newHotel.amenities && (
        <div style={{ margin: "10px", color: "#fff" }}>
          <strong>Selected Amenities:</strong> {newHotel.amenities}
        </div>
      )}

      {/* Otellerin listelenmesi */}
      <div id="admin-hotel-list">
        {hotels.map((hotel) => (
          <div className="admin-hotel-item" key={hotel.hotelId} id={hotel.hotelId}>
            <div className="admin-hotel-title">{hotel.name}</div>
            {/* Otelin birincil fotoğrafı, photoUrl alanı kullanılarak gösterilir */}
            {hotel.photoUrl && (
              <img
                src={hotel.photoUrl}
                alt={hotel.name}
                className="hotel-photo"
              />
            )}
            <p>
              <strong>City:</strong> {hotel.city} <br />
              <strong>Country:</strong> {hotel.country} <br />
              <strong>Address:</strong> {hotel.address}
            </p>
            {hotel.amenities && (
              <p>
                <strong>Amenities:</strong> {hotel.amenities}
              </p>
            )}
            {hotel.managerName && (
              <p>
                <strong>Manager:</strong> {hotel.managerName}
              </p>
            )}
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

      {/* Amenities seçimi için modal */}
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
