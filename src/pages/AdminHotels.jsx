import React, { useState, useEffect } from "react";
import "../styles/AdminHotels.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

const AdminHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const { t } = useTranslation();
   // Add pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of hotels per page

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

  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/hotels");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewHotel((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAmenityChange = (amenityName) => {
    if (selectedAmenities.includes(amenityName)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenityName));
    } else {
      setSelectedAmenities([...selectedAmenities, amenityName]);
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
    document.getElementById('admin-hotel-management-title').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const updateHotel = async () => {
    try {
      const { managerName, photo, photoUrl, ...filteredNewHotel } = newHotel;
      const { hotelId, createdAt, managerName: _, photo: __, photoUrl: ___, ...editingData } = editingHotel;
      const updatedData = { ...editingData, ...filteredNewHotel };

      await axios.put(`http://localhost:8080/api/hotels/${hotelId}`, updatedData);
      await fetchHotels();
      setEditingHotel(null);
      setNewHotel({ name: "", city: "", country: "", address: "", amenities: "" });
      setSelectedAmenities([]);
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  const deleteHotel = async (hotelId) => {
    try {
      await axios.delete(`http://localhost:8080/api/hotels/${hotelId}`);
      await fetchHotels();
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };
  // Add this new function after the existing state declarations
const handlePageClick = (e) => {
  // Check if click is on form, buttons, or modal
  if (!e.target.closest('#admin-hotel-form') && 
      !e.target.closest('.admin-hotel-edit-btn') && 
      !e.target.closest('.admin-hotel-delete-btn') && 
      !e.target.closest('.select-amenities-btn') && 
      !e.target.closest('.amenities-modal')) {
    // Clear the form
    setNewHotel({ name: "", city: "", country: "", address: "", amenities: "" });
    setSelectedAmenities([]);
    setEditingHotel(null);
  }
};
  // Pagination calculation
  const indexOfLastHotel = currentPage * itemsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - itemsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const Pagination = ({ currentPage, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div id="admin-hotel-container"
    onClick={handlePageClick}>
      
      <div id="admin-hotel-management-title">{t("admin_hotels.title")}</div>

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
        <Pagination
    currentPage={currentPage}
    totalItems={hotels.length}
    onPageChange={handlePageChange}
  />
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
