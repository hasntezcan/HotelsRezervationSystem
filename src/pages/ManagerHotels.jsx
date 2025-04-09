import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import SidebarManager from "../components/Sidebar_manager";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ManagerHotels = () => {
  const { user } = useContext(AuthContext);
  const [hotels, setHotels] = useState([]);
  const [editHotel, setEditHotel] = useState(null);
  const [error, setError] = useState(null);

  // Manager'a ait otel verilerini backend'den alıyoruz.
  useEffect(() => {
    if (user && user.userId) {
      axios
        .get(`http://localhost:8080/api/hotels/manager?userId=${user.userId}`)
        .then((response) => {
          setHotels(response.data);
        })
        .catch((err) => {
          console.error("Error fetching hotels:", err);
          setError("Error fetching hotels");
        });
    }
  }, [user]);

  // İlk oteli görüntülemek için
  const hotelToEdit = hotels.length > 0 ? hotels[0] : null;

  // Düzenleme moduna geçiş: Düzenlenecek oteli state'e aktarırken "featured" alanı için
  // undefined ya da null ise false olarak set ediyoruz.
  const handleEdit = (hotel) => {
    setEditHotel({ ...hotel, featured: hotel.featured ?? false });
  };

  // Güncellemeleri veritabanına göndermek için
  const handleSave = async () => {
    try {
      const payload = {
        name: editHotel.name ?? "",
        city: editHotel.city ?? "",
        country: editHotel.country ?? "",
        address: editHotel.address ?? "",
        pricePerNight: editHotel.pricePerNight ?? 0,
        capacity: editHotel.capacity ?? 0,
        amenities: editHotel.amenities ?? "",
        managerId: editHotel.managerId ?? "",
        checkInTime: editHotel.checkInTime ?? "",
        checkOutTime: editHotel.checkOutTime ?? "",
        cancellationPolicy: editHotel.cancellationPolicy ?? "",
        description: editHotel.description ?? "",
        starRating: editHotel.starRating ?? 0,
        featured:
          editHotel.featured !== undefined && editHotel.featured !== null
            ? editHotel.featured
            : false,
      };

      // Authorization header'ı kontrol ediyoruz
      const config = {
        headers: {
          Authorization: user?.token ? `Bearer ${user.token}` : "",
          "Content-Type": "application/json",
        },
      };

      const response = await axios.put(
        `http://localhost:8080/api/hotels/${editHotel.hotelId}`,
        payload,
        config
      );

      // Güncellenen oteli state'de güncelliyoruz
      const updatedHotel = response.data;
      const updatedHotels = hotels.map((hotel) =>
        hotel.hotelId === updatedHotel.hotelId ? updatedHotel : hotel
      );
      setHotels(updatedHotels);
      setEditHotel(null);
      alert("Hotel updated successfully!");
    } catch (err) {
      console.error("Error updating hotel:", err);
      alert(err.response ? err.response.data : "Error updating hotel");
    }
  };

  // Form inputlarındaki değişiklikleri state'e yansıtma
  const handleChange = (e, field) => {
    if (field === "featured") {
      // Checkbox kullanımı: e.target.checked boolean değer verir.
      setEditHotel({ ...editHotel, featured: e.target.checked });
    } else {
      setEditHotel({ ...editHotel, [field]: e.target.value });
    }
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="dashboard" style={{ display: "flex" }}>
      <SidebarManager />
      <div className="content" style={{ padding: "40px", width: "100%" }}>
        <Grid container spacing={4} style={{ width: "100%", maxWidth: "1400px" }}>
          {/* Otel Bilgileri */}
          <Grid item xs={12} sm={6}>
            <Card
              style={{
                borderRadius: "50px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                padding: "20px",
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" marginBottom="20px">
                  <Typography variant="h5" style={{ fontWeight: "bold" }}>
                    {hotelToEdit?.name}
                  </Typography>
                </Box>
                <Typography variant="body2" style={{ marginBottom: "10px" }}>
                  <strong>City:</strong> {hotelToEdit?.city}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: "10px" }}>
                  <strong>Country:</strong> {hotelToEdit?.country}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: "10px" }}>
                  <strong>Price per Night:</strong> {hotelToEdit?.pricePerNight} USD
                </Typography>
                <Typography variant="body2" style={{ marginBottom: "10px" }}>
                  <strong>Capacity:</strong> {hotelToEdit?.capacity}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: "20px" }}>
                  <strong>Address:</strong> {hotelToEdit?.address}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: "10px" }}>
                  <strong>Amenities:</strong> {hotelToEdit?.amenities}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: "10px" }}>
                  <strong>Manager ID:</strong> {hotelToEdit?.managerId}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Düzenleme Formu */}
          <Grid item xs={12} sm={6}>
            {editHotel && editHotel.hotelId === hotelToEdit?.hotelId ? (
              <Card
                style={{
                  borderRadius: "50px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  padding: "20px",
                }}
              >
                <CardContent>
                  <Typography variant="h6" style={{ marginBottom: "20px" }}>
                    Edit Hotel Information
                  </Typography>
                  <TextField
                    label="Hotel Name"
                    value={editHotel?.name || ""}
                    onChange={(e) => handleChange(e, "name")}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="City"
                    value={editHotel?.city || ""}
                    onChange={(e) => handleChange(e, "city")}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Country"
                    value={editHotel?.country || ""}
                    onChange={(e) => handleChange(e, "country")}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Address"
                    value={editHotel?.address || ""}
                    onChange={(e) => handleChange(e, "address")}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Price Per Night"
                    type="number"
                    value={editHotel?.pricePerNight || ""}
                    onChange={(e) => handleChange(e, "pricePerNight")}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Capacity"
                    type="number"
                    value={editHotel?.capacity || ""}
                    onChange={(e) => handleChange(e, "capacity")}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Amenities"
                    value={editHotel?.amenities || ""}
                    onChange={(e) => handleChange(e, "amenities")}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Manager ID"
                    value={editHotel?.managerId || ""}
                    disabled
                    fullWidth
                    margin="normal"
                  />
                  <Box display="flex" alignItems="center" marginY="15px">
                    <Typography variant="body1" style={{ marginRight: "10px" }}>
                      Featured:
                    </Typography>
                    <input
                      type="checkbox"
                      checked={editHotel.featured}
                      onChange={(e) => handleChange(e, "featured")}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    fullWidth
                    style={{ marginTop: "20px" }}
                  >
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleEdit(hotelToEdit)}
                fullWidth
                style={{ marginTop: "20px" }}
              >
                Edit Hotel
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ManagerHotels;
