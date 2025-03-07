import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";
import hotelsData from "../assets/data/hotels.json";
import SidebarManager from "../components/Sidebar_manager"; // Sidebar bileşeni

const ManagerHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [editHotel, setEditHotel] = useState(null);

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem("hotels"));
    if (storedHotels) {
      setHotels(storedHotels);
    } else {
      setHotels(hotelsData);
    }
  }, []);

  // "The Grand London Hotel" adlı oteli bul
  const hotelToEdit = hotels.find(
    (hotel) => hotel.hotelName === "The Grand London Hotel"
  );

  const handleEdit = (hotel) => {
    setEditHotel({ ...hotel });
  };

  const handleSave = () => {
    const updatedHotels = hotels.map((hotel) =>
      hotel.hotelName === editHotel.hotelName ? editHotel : hotel
    );
    setHotels(updatedHotels);
    localStorage.setItem("hotels", JSON.stringify(updatedHotels));
    setEditHotel(null);
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setEditHotel({ ...editHotel, [field]: value });
  };

  return (
    <div className="dashboard" style={{ display: "flex" }}>
      {/* Sidebar Manager bileşeni */}
      <SidebarManager />

      {/* İçerik alanı: CSS'de .content olarak stillendirilmiş */}
      <div className="content" style={{ padding: "40px", width: "100%" }}>
        <Grid container spacing={4} style={{ width: "100%", maxWidth: "1400px" }}>
          {/* Genel Bilgi Bölümü */}
          <Grid item xs={12} sm={6}>
            <Card
              style={{
                borderRadius: "50px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                padding: "20px"
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" marginBottom="20px">
                  <Typography variant="h5" style={{ fontWeight: "bold" }}>
                    {hotelToEdit?.hotelName}
                  </Typography>
                </Box>
                <Typography variant="body2" style={{ marginBottom: "10px" }}>
                  <strong>City:</strong> {hotelToEdit?.city}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: "10px" }}>
                  <strong>Price per Night:</strong> {hotelToEdit?.pricePerNight} USD
                </Typography>
                <Typography variant="body2" style={{ marginBottom: "10px" }}>
                  <strong>Rating:</strong> {hotelToEdit?.rating}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: "20px" }}>
                  <strong>Address:</strong> {hotelToEdit?.address}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Düzenlenebilir Bilgiler Bölümü */}
          <Grid item xs={12} sm={6}>
            {editHotel && editHotel.hotelName === hotelToEdit?.hotelName ? (
              <Card
                style={{
                  borderRadius: "50px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  padding: "20px"
                }}
              >
                <CardContent>
                  <Typography variant="h6" style={{ marginBottom: "20px" }}>
                    Edit Hotel Information
                  </Typography>
                  <TextField
                    label="Hotel Name"
                    value={editHotel?.hotelName}
                    onChange={(e) => handleChange(e, "hotelName")}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="City"
                    value={editHotel?.city}
                    onChange={(e) => handleChange(e, "city")}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Address"
                    value={editHotel?.address}
                    onChange={(e) => handleChange(e, "address")}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Price Per Night"
                    value={editHotel?.pricePerNight}
                    onChange={(e) => handleChange(e, "pricePerNight")}
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
