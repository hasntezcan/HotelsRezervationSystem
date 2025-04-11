import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Rating,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SidebarManager from "../components/Sidebar_manager";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ManagerHotels = () => {
  const { user } = useContext(AuthContext);
  const [hotels, setHotels] = useState([]);
  const [editHotel, setEditHotel] = useState(null);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showAmenitySelector, setShowAmenitySelector] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  
  // Room detayları için state (room alanı dokunulmamış)
  const [roomData, setRoomData] = useState({
    roomType: "",
    pricePerNight: "",
    totalRoom: ""
  });
  const [rooms, setRooms] = useState([]);

  const amenitiesList = [
    "Free Wi-Fi", "Swimming Pool", "Spa", "Gym", "Restaurant",
    "Bar", "Parking", "Pet Friendly", "Room Service", "Airport Shuttle"
  ];

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  useEffect(() => {
    if (user && user.userId) {
      // Manager'a ait otelleri çekiyoruz.
      axios
        .get(`http://localhost:8080/api/hotels/manager?userId=${user.userId}`)
        .then((response) => {
          const hotelsData = response.data;
          setHotels(hotelsData);
          // Eğer listede en az bir otel varsa, amenities bilgilerini ayrı endpoint'ten getiriyoruz.
          if (hotelsData.length > 0) {
            const firstHotelId = hotelsData[0].hotelId;
            axios
              .get(`http://localhost:8080/api/hotels/${firstHotelId}/amenities`)
              .then((res) => {
                // Çekilen amenities string'ini ilgili otelin objesine ekliyoruz.
                const updatedHotel = { ...hotelsData[0], amenities: res.data };
                // İlk otelin verisini güncelliyoruz.
                setHotels((prevHotels) => {
                  const updatedHotels = [...prevHotels];
                  updatedHotels[0] = updatedHotel;
                  return updatedHotels;
                });
              })
              .catch((err) => {
                console.error("Error fetching amenities:", err);
              });
          }
        })
        .catch((err) => {
          console.error("Error fetching hotels:", err);
          setError("Error fetching hotels");
        });
    }
  }, [user]);

  const hotelToEdit = hotels.length > 0 ? hotels[0] : null;

  const handleEdit = (hotel) => {
    const amenitiesArray = hotel.amenities
      ? hotel.amenities.split(",").map((a) => a.trim())
      : [];
    setSelectedAmenities(amenitiesArray);

    setEditHotel({
      ...hotel,
      featured: hotel.featured ?? false,
    });
    setOpenModal(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: editHotel.name ?? "",
        city: editHotel.city ?? "",
        country: editHotel.country ?? "",
        address: editHotel.address ?? "",
        pricePerNight: editHotel.pricePerNight ?? 0,
        capacity: editHotel.capacity ?? 0,
        amenities: selectedAmenities.join(", "),
        managerId: editHotel.managerId ?? "",
        checkInTime: editHotel.checkInTime ?? "",
        checkOutTime: editHotel.checkOutTime ?? "",
        cancellationPolicy: editHotel.cancellationPolicy ?? "",
        description: editHotel.description ?? "",
        starRating: editHotel.starRating ?? 0,
        featured: editHotel.featured ?? false,
      };

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

      const updatedHotel = response.data;
      const updatedHotels = hotels.map((hotel) =>
        hotel.hotelId === updatedHotel.hotelId ? updatedHotel : hotel
      );
      setHotels(updatedHotels);
      setEditHotel(null);
      setOpenModal(false);
      alert("Hotel updated successfully!");
    } catch (err) {
      console.error("Error updating hotel:", err);
      alert(err.response ? err.response.data : "Error updating hotel");
    }
  };

  const handleChange = (e, field) => {
    const value = field === "featured" ? e.target.checked : e.target.value;
    setEditHotel({ ...editHotel, [field]: value });
  };

  // Oda işlemleri aynı kalıyor
  const handleAddRoom = () => {
    if (!roomData.roomType || roomData.pricePerNight === "" || roomData.totalRoom === "") {
      alert("Please fill in all room details before adding.");
      return;
    }
    setRooms([...rooms, roomData]);
    setRoomData({
      roomType: "",
      pricePerNight: "",
      totalRoom: ""
    });
  };

  const handleDeleteRoom = (index) => {
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
  };

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div className="dashboard" style={{ display: "flex" }}>
      <SidebarManager />
      <div className="content" style={{ padding: "40px", width: "100%" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h4" fontWeight="bold">Hotel</Typography>
          <Typography variant="h4" fontWeight="bold">Room</Typography>
        </Box>

        {hotels.length === 0 && (
          <Box mb={3}>
            <Button
              variant="contained"
              onClick={() => {
                setEditHotel({});
                setSelectedAmenities([]);
                setOpenModal(true);
              }}
              style={{
                backgroundColor: "#9C27B0",
                color: "#fff",
                fontWeight: "bold",
                padding: "8px 24px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              ADD HOTEL
            </Button>
          </Box>
        )}

        <Grid container spacing={4}>
          {/* Hotel Alanı */}
          <Grid item xs={12} sm={6}>
            {hotelToEdit && (
              <Card style={{ borderRadius: "50px", padding: "20px" }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">
                    {hotelToEdit.name}
                  </Typography>
                  <Typography>
                    <strong>City:</strong> {hotelToEdit.city}
                  </Typography>
                  <Typography>
                    <strong>Country:</strong> {hotelToEdit.country}
                  </Typography>
                  <Typography>
                    <strong>Description:</strong> {hotelToEdit.description}
                  </Typography>
                  <Typography>
                    <strong>Star Rating:</strong> {hotelToEdit.starRating}
                  </Typography>
                  <Typography>
                    <strong>Address:</strong> {hotelToEdit.address}
                  </Typography>
                  <Typography>
                    <strong>Amenities:</strong> {hotelToEdit.amenities}
                  </Typography>
                  <Box display="flex" gap={2} mt={2}>
                    <Button variant="outlined" onClick={() => handleEdit(hotelToEdit)}>
                      Edit Hotel
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        setHotels(hotels.filter(h => h.hotelId !== hotelToEdit.hotelId));
                      }}
                    >
                      Delete Hotel
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Grid>

          {/* Room Alanı - Dokunulmuyor */}
          <Grid item xs={12} sm={6}>
            <Card style={{ borderRadius: "50px", padding: "20px" }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold">Room Details</Typography>
                <Box mt={2}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
                    Room Type
                  </label>
                  <select 
                    value={roomData.roomType} 
                    onChange={(e) => setRoomData({ ...roomData, roomType: e.target.value })}
                    style={{ width: "100%", padding: "8px", marginBottom: "16px" }}
                  >
                    <option value="">Select Room Type</option>
                    <option value="Deluxe room">Deluxe room</option>
                    <option value="Standart room">Standart room</option>
                  </select>
                </Box>
                <TextField 
                  label="Price per Night" 
                  type="number"
                  value={roomData.pricePerNight} 
                  onChange={(e) => setRoomData({ ...roomData, pricePerNight: e.target.value })}
                  fullWidth 
                  margin="normal"
                />
                <TextField 
                  label="Total Room" 
                  type="number"
                  value={roomData.totalRoom} 
                  onChange={(e) => setRoomData({ ...roomData, totalRoom: e.target.value })}
                  fullWidth 
                  margin="normal"
                />
                <Box mt={2}>
                  <Button 
                    variant="contained" 
                    onClick={handleAddRoom} 
                    style={{ margin: "0 auto", display: "block" }}
                  >
                    Add Room
                  </Button>
                </Box>
                {rooms.length > 0 && (
                  <Box mt={3}>
                    <Typography variant="h6" align="center" gutterBottom>
                      Rooms List
                    </Typography>
                    {rooms.map((room, index) => (
                      <Box 
                        key={index} 
                        display="flex" 
                        justifyContent="space-between" 
                        alignItems="center" 
                        p={1} 
                        border="1px solid #ccc" 
                        borderRadius="4px" 
                        mb={1}
                      >
                        <Typography variant="body1">
                          Type: {room.roomType}, Price: {room.pricePerNight}, Total: {room.totalRoom}
                        </Typography>
                        <Button 
                          variant="outlined" 
                          color="error" 
                          onClick={() => handleDeleteRoom(index)}
                        >
                          Delete
                        </Button>
                      </Box>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Otel Düzenleme Modal'ı */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
          <DialogTitle>
            Hotel Form
            <IconButton onClick={() => setOpenModal(false)} sx={{ position: "absolute", right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
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
              label="Description" 
              value={editHotel?.description || ""} 
              onChange={(e) => handleChange(e, "description")} 
              fullWidth 
              margin="normal" 
            />

            <Box marginY={2}>
              <Typography variant="subtitle1">Star Rating</Typography>
              <Rating
                value={Number(editHotel?.starRating) || 0}
                onChange={(e, newValue) => setEditHotel({ ...editHotel, starRating: newValue })}
                max={5}
              />
            </Box>

            <Box marginTop={2}>
              <Button variant="outlined" onClick={() => setShowAmenitySelector(!showAmenitySelector)}>
                {showAmenitySelector ? "Close Amenities" : "Select Amenities"}
              </Button>

              {showAmenitySelector && (
                <Box mt={2}>
                  {amenitiesList.map((item) => (
                    <FormControlLabel
                      key={item}
                      control={
                        <Checkbox checked={selectedAmenities.includes(item)} onChange={() => toggleAmenity(item)} />
                      }
                      label={item}
                    />
                  ))}
                  <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={() => setShowAmenitySelector(false)}>
                      Cancel
                    </Button>
                    <Button variant="contained" onClick={() => setShowAmenitySelector(false)}>
                      Done
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ManagerHotels;
