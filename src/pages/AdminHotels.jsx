import React, { useState, useEffect } from "react";
import "../styles/AdminHotels.css";
import axios from "axios";

const AdminHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [amenities, setAmenities] = useState([]);
  
  // Sadece güncelleme için form state'i
  const [newHotel, setNewHotel] = useState({
    name: "",
    city: "",
    country: "",
    address: "",
    amenities: "" // Checkbox'lardan seçilen amenity bilgileri virgülle ayrılmış string olarak tutulacak.
  });

  // Modal açma/kapatma ve diğer state'ler
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [editingHotel, setEditingHotel] = useState(null);

  // Otelleri çekme (Admin endpoint)
  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/hotels");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  // Hotel Amenities verilerini çekme
  const fetchAmenities = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/hotelamenities");
      setAmenities(response.data);
    } catch (error) {
      console.error("Error fetching hotel amenities:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
    fetchAmenities();
  }, []);

  // Form input değişikliklerini yönetme
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewHotel((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Amenity checkbox değişikliklerini yönetme
  const handleAmenityChange = (amenityName) => {
    if (selectedAmenities.includes(amenityName)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenityName));
    } else {
      setSelectedAmenities([...selectedAmenities, amenityName]);
    }
  };

  // Modal'ı açma
  const openAmenitiesModal = () => {
    setShowAmenitiesModal(true);
  };

  // "Done" butonuna basınca, seçili amenity’leri virgülle birleştirip formdaki amenities alanını güncelle
  const handleAmenitiesDone = () => {
    setNewHotel((prev) => ({
      ...prev,
      amenities: selectedAmenities.join(", "),
    }));
    setShowAmenitiesModal(false);
  };

  // Otel düzenleme moduna geçme: Seçilen otelin verilerini form state'ine aktarır.
  const editHotel = (hotel) => {
    setEditingHotel(hotel);
    setNewHotel({
      name: hotel.name || "",
      city: hotel.city || "",
      country: hotel.country || "",
      address: hotel.address || "",
      amenities: hotel.amenities || ""
    });
    if (hotel.amenities) {
      const splitted = hotel.amenities.split(",").map((item) => item.trim());
      setSelectedAmenities(splitted);
    } else {
      setSelectedAmenities([]);
    }
  };

  // Otel güncelleme fonksiyonu (sadece güncellenmek istenen alanlar gönderilecek)
  const updateHotel = async () => {
    try {
      // newHotel içerisinden gereksiz alanları çıkarıyoruz (örneğin managerName, photo, photoUrl gibi alanlar varsa)
      const { managerName, photo, photoUrl, ...filteredNewHotel } = newHotel;
      // editingHotel'den de güncellenmeyecek alanları çıkartıyoruz:
      const { hotelId, createdAt, managerName: _, photo: __, photoUrl: ___, ...editingData } = editingHotel;
      // Güncelleme verileri: Mevcut editingData üzerine yeni form verileri eklenir.
      const updatedData = { ...editingData, ...filteredNewHotel };

      // Update isteği gönderiliyor.
      await axios.put(`http://localhost:8080/api/hotels/${hotelId}`, updatedData);
      
      // Güncelleme sonrasında güncel verileri almak için tüm otelleri yeniden çekiyoruz:
      await fetchHotels();

      // Düzenleme modundan çık ve formu resetle:
      setEditingHotel(null);
      setNewHotel({
        name: "",
        city: "",
        country: "",
        address: "",
        amenities: ""
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
        {/* Amenities seçimi için buton */}
        <button
          type="button"
          className="select-amenities-btn"
          onClick={openAmenitiesModal}
        >
          Select Amenities
        </button>

        {/* Yalnızca düzenleme modundayken Update Hotel butonu gösterilir */}
        {editingHotel && (
          <button id="admin-hotel-button" onClick={updateHotel}>
            Update Hotel
          </button>
        )}
      </div>

      {newHotel.amenities && (
        <div style={{ margin: "10px", color: "#fff" }}>
          <strong>Selected Amenities:</strong> {newHotel.amenities}
        </div>
      )}

      <div id="admin-hotel-list">
        {hotels.map((hotel) => (
          <div className="admin-hotel-item" key={hotel.hotelId} id={hotel.hotelId}>
            <div className="admin-hotel-title">{hotel.name}</div>
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
              onClick={() => {
                // Delete işlevi eklenebilir
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Amenities seçimi için modal */}
      {showAmenitiesModal && (
        <>
          <div
            className="amenities-overlay"
            onClick={() => setShowAmenitiesModal(false)}
          />
          <div className="amenities-modal">
            <h2>Select Amenities</h2>
            <div className="amenities-list">
              {amenities.map((amenity) => (
                <label key={amenity.amenityId} className="amenity-item">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity.name)}
                    onChange={() => handleAmenityChange(amenity.name)}
                  />
                  {amenity.name}
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
