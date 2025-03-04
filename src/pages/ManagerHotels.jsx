import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Card, CardContent, Typography } from "@mui/material";
import { FaEdit, FaSave } from "react-icons/fa";
import hotelsData from "../assets/data/hotels.json"; // Otel verisini json'dan alıyoruz
import SidebarManager from "../components/Sidebar_manager"; // SidebarManager component'ini import et
import ManagerNavbar from "../components/ManagerNavbar"; // ManagerNavbar component'ini import et

const ManagerHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [editHotel, setEditHotel] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar'ın açık olup olmadığını takip ediyoruz

  useEffect(() => {
    const storedHotels = JSON.parse(localStorage.getItem("hotels"));
    if (storedHotels) {
      setHotels(storedHotels);
    } else {
      setHotels(hotelsData); // JSON verisini alıyoruz
    }
  }, []);

  const handleEdit = (hotel) => {
    setEditHotel({ ...hotel });
  };

  const handleSave = () => {
    const updatedHotels = hotels.map((hotel) =>
      hotel.hotelName === editHotel.hotelName ? editHotel : hotel
    );
    setHotels(updatedHotels);
    localStorage.setItem("hotels", JSON.stringify(updatedHotels)); // localStorage'ı güncelle
    setEditHotel(null); // Düzenlemeyi kaydettiğimizde düzenleme alanını kapat
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setEditHotel({ ...editHotel, [field]: value });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ManagerNavbar />
      <div style={{ display: "flex", flex: 1, marginTop: "60px" }}>
        <SidebarManager />

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center", // Horizontally center
            alignItems: "center", // Vertically center
            padding: "20px",
          }}
        >
          <div style={{ width: "100%", maxWidth: "1200px" }}>
            <Typography variant="h4" gutterBottom>
              Otel Yönetimi
            </Typography>
            <Grid container spacing={3}>
              {hotels.map((hotel) => (
                <Grid item xs={12} sm={6} md={4} key={hotel.hotelName}>
                  <Card>
                    <CardContent>
                      <img
                        src={hotel.photo} // Directly reference from the public folder
                        alt={hotel.hotelName}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                      <Typography variant="h6" style={{ marginTop: "10px" }}>
                        {hotel.hotelName}
                      </Typography>
                      <Typography variant="body2">{hotel.city}</Typography>
                      <Typography variant="body2">Fiyat: {hotel.pricePerNight} USD / Gece</Typography>
                      <Typography variant="body2">Derecelendirme: {hotel.rating}</Typography>

                      {editHotel && editHotel.hotelName === hotel.hotelName ? (
                        <>
                          <TextField
                            label="Otel Adı"
                            value={editHotel.hotelName}
                            onChange={(e) => handleChange(e, "hotelName")}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Şehir"
                            value={editHotel.city}
                            onChange={(e) => handleChange(e, "city")}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Adres"
                            value={editHotel.address}
                            onChange={(e) => handleChange(e, "address")}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Fiyat Per Night"
                            value={editHotel.pricePerNight}
                            onChange={(e) => handleChange(e, "pricePerNight")}
                            fullWidth
                            margin="normal"
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            startIcon={<FaSave />}
                            fullWidth
                          >
                            Kaydet
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleEdit(hotel)}
                          startIcon={<FaEdit />}
                          fullWidth
                        >
                          Düzenle
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerHotels;
