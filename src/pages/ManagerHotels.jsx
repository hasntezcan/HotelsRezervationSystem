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
  const { user } = useContext(AuthContext); // Login olmuş kullanıcı bilgisi
  const [hotels, setHotels] = useState([]);
  const [editHotel, setEditHotel] = useState(null);
  const [error, setError] = useState(null);

  // Backend'den manager'a ait otel verilerini alıyoruz.
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

  // Manager'ın otel(leri) içinden düzenleme için ilk oteli seçiyoruz.
  const hotelToEdit = hotels.length > 0 ? hotels[0] : null;

  // Düzenleme moduna geçmek için
  const handleEdit = (hotel) => {
    setEditHotel({ ...hotel });
  };

  // Kaydet butonuna tıklanınca güncellenmiş verileri state üzerinde güncelliyoruz.
  // Gerektiğinde backend update API çağrısı da ekleyebilirsiniz.
  const handleSave = () => {
    const updatedHotels = hotels.map((hotel) =>
      hotel.hotelId === editHotel.hotelId ? editHotel : hotel
    );
    setHotels(updatedHotels);
    setEditHotel(null);
    // Örneğin, backend'e PUT isteği yapılabilir:
    // axios.put(`http://localhost:8080/api/hotels/${editHotel.hotelId}`, editHotel)
    //   .then(response => { ... })
    //   .catch(err => { ... });
  };

  // Formdaki input'lardaki değişiklikleri state'e yansıtma
  const handleChange = (e, field) => {
    const { value } = e.target;
    setEditHotel({ ...editHotel, [field]: value });
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="dashboard" style={{ display: "flex" }}>
      <SidebarManager />
      <div className="content" style={{ padding: "40px", width: "100%" }}>
        <Grid container spacing={4} style={{ width: "100%", maxWidth: "1400px" }}>
          {/* Otel bilgilerini görüntüleme */}
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
                {hotelToEdit?.photo && (
                  <img
                    src={hotelToEdit.photo}
                    alt="Hotel"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                )}
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
                    value={editHotel?.pricePerNight || ""}
                    onChange={(e) => handleChange(e, "pricePerNight")}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Capacity"
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
                    label="Photo URL"
                    value={editHotel?.photo || ""}
                    onChange={(e) => handleChange(e, "photo")}
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
