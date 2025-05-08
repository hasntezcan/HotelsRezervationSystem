import React, { useState, useEffect } from "react";
import "../styles/AdminHotels.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

const AdminHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const { t } = useTranslation();

  // ** Search state **
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form / modal state
  const [newHotel, setNewHotel] = useState({
    name: "",
    city: "",
    country: "",
    address: "",
    amenities: ""
  });
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [editingHotel, setEditingHotel] = useState(null);

  // Fetch data
  const fetchHotels = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/admin/hotels");
      setHotels(data);
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };
  const fetchAmenities = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/hotelamenities");
      setAmenities(data);
    } catch (err) {
      console.error("Error fetching amenities:", err);
    }
  };

  useEffect(() => {
    fetchHotels();
    fetchAmenities();
  }, []);

  // Reset to first page on new search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handlers
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewHotel((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAmenityChange = (amenityName) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityName)
        ? prev.filter((a) => a !== amenityName)
        : [...prev, amenityName]
    );
  };

  const openAmenitiesModal = () => setShowAmenitiesModal(true);
  const handleAmenitiesDone = () => {
    setNewHotel((prev) => ({ ...prev, amenities: selectedAmenities.join(", ") }));
    setShowAmenitiesModal(false);
  };

  const editHotel = (hotel) => {
    setEditingHotel(hotel);
    setNewHotel({
      name: hotel.name || "",
      city: hotel.city || "",
      country: hotel.country || "",
      address: hotel.address || "",
      amenities: hotel.amenities || ""
    });
    setSelectedAmenities(hotel.amenities ? hotel.amenities.split(",").map((a) => a.trim()) : []);
    document.getElementById('admin-hotel-management-title').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const updateHotel = async () => {
    try {
      const { managerName, photo, photoUrl, ...filteredNewHotel } = newHotel;
      const { hotelId, ...orig } = editingHotel;
      await axios.put(`http://localhost:8080/api/hotels/${hotelId}`, { ...orig, ...filteredNewHotel });
      await fetchHotels();
      setEditingHotel(null);
      setNewHotel({ name: "", city: "", country: "", address: "", amenities: "" });
      setSelectedAmenities([]);
    } catch (err) {
      console.error("Error updating hotel:", err);
    }
  };

  const deleteHotel = async (hotelId) => {
    try {
      await axios.delete(`http://localhost:8080/api/hotels/${hotelId}`);
      await fetchHotels();
    } catch (err) {
      console.error("Error deleting hotel:", err);
    }
  };

  // Outside-click clears form
  const handlePageClick = (e) => {
    if (!e.target.closest('#admin-hotel-form') &&
        !e.target.closest('.admin-hotel-edit-btn') &&
        !e.target.closest('.admin-hotel-delete-btn') &&
        !e.target.closest('.select-amenities-btn') &&
        !e.target.closest('.amenities-modal')) {
      setNewHotel({ name: "", city: "", country: "", address: "", amenities: "" });
      setSelectedAmenities([]);
      setEditingHotel(null);
    }
  };

  // ** Filtering by searchTerm **
  const filteredHotels = hotels.filter((hotel) => {
    const term = searchTerm.toLowerCase();
    return (
      hotel.name.toLowerCase().includes(term) ||
      hotel.city.toLowerCase().includes(term)
    );
  });

  // Pagination on filtered list
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentHotels = filteredHotels.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const Pagination = ({ currentPage, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return (
      <div className="pagination">
        <button className="pagination-button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}>
          {t("Previous")}
        </button>
        <button className="pagination-button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}>
          {t("Next")}
        </button>
      </div>
    );
  };

  return (
    <div id="admin-hotel-container"
    onClick={handlePageClick}>
      
      <div id="admin-hotel-management-title">{t("admin_hotels.title")}</div>
    {/* 🗲 Search bar */}
    <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder={t("Search hotels by name, city, country...") }
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div id="admin-hotel-form">
        <input
          type="text"
          name="name"
          placeholder={t("admin_hotels.name")}
          value={newHotel.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder={t("admin_hotels.city")}
          value={newHotel.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder={t("admin_hotels.country")}
          value={newHotel.country}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder={t("admin_hotels.address")}
          value={newHotel.address}
          onChange={handleChange}
        />
        <button
          type="button"
          className="select-amenities-btn"
          onClick={openAmenitiesModal}
        >
          {t("admin_hotels.select_amenities")}
        </button>

        {editingHotel && (
          <button id="admin-hotel-button" onClick={updateHotel}>
            {t("admin_hotels.update")}
          </button>
        )}
      </div>

      {newHotel.amenities && (
        <div style={{ margin: "10px", color: "#fff" }}>
          <strong>{t("admin_hotels.selected_amenities")}:</strong> {newHotel.amenities}
        </div>
      )}

<div id="admin-hotel-list">
  {currentHotels.map((hotel) => (
    <div className="admin-hotel-item" key={hotel.hotelId} id={hotel.hotelId}>
      <div className="admin-hotel-title">{hotel.name}</div>
      {hotel.photoUrl && (
        <img src={hotel.photoUrl} alt={hotel.name} className="hotel-photo" />
      )}
      <p>
        <strong>{t("admin_hotels.city")}:</strong> {hotel.city} <br />
        <strong>{t("admin_hotels.country")}:</strong> {hotel.country} <br />
        <strong>{t("admin_hotels.address")}:</strong> {hotel.address}
      </p>
            {hotel.amenities && (
              <p>
                <strong>{t("admin_hotels.amenities")}:</strong> {hotel.amenities}
              </p>
            )}
            {hotel.managerName && (
              <p>
                <strong>{t("admin_hotels.manager")}:</strong> {hotel.managerName}
              </p>
            )}
            <button
              className="admin-hotel-edit-btn"
              onClick={() => editHotel(hotel)}
            >
              {t("admin_hotels.edit")}
            </button>
            <button
              className="admin-hotel-delete-btn"
              onClick={() => deleteHotel(hotel.hotelId)}
            >
              {t("admin_hotels.delete")}
            </button>
          </div>
        ))}
        <div className="pagination-container">
    <Pagination
      currentPage={currentPage}
      totalItems={filteredHotels.length}
      onPageChange={handlePageChange}
    />
  </div>
    </div>

      {showAmenitiesModal && (
        <>
          <div className="amenities-overlay" onClick={() => setShowAmenitiesModal(false)} />
          <div className="amenities-modal">
            <h2>{t("admin_hotels.select_amenities")}</h2>
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
                {t("admin_hotels.done")}
              </button>
              <button
                className="amenities-cancel-btn"
                onClick={() => setShowAmenitiesModal(false)}
              >
                {t("admin_hotels.cancel")}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHotel;
