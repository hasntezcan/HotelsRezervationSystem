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
  
  // Room detayları için state (bu alan dokunulmamış)
  const [roomData, setRoomData] = useState({
    roomType: "",
    name: "",
    pricePerNight: "",
    totalRooms: ""
  });
  const [rooms, setRooms] = useState([]);
  // Düzenleme modu için
const [editingRoomId, setEditingRoomId] = useState(null);
const [editingRoomData, setEditingRoomData] = useState({
  name: "",
  roomType: "",
  pricePerNight: "",
  totalRooms: 0
});

// Düzenlemeyi başlat
const startEditRoom = (room) => {
  setEditingRoomId(room.id);
  setEditingRoomData({
    name: room.name,
    roomType: room.roomType,
    pricePerNight: room.pricePerNight,
    totalRooms: room.totalRooms
  });
};


// Güncelleme isteği
const updateRoom = async (id) => {
  try {
    const payload = {
      hotelId: hotels[0].hotelId,
      name: editingRoomData.name,
      roomType: editingRoomData.roomType,
      pricePerNight: editingRoomData.pricePerNight,
      totalRooms: editingRoomData.totalRooms
    };
    const res = await axios.put(`http://localhost:8080/api/rooms/${id}`, payload);
    // state’i güncelle
    setRooms((prev) =>
      prev.map((r) => (r.id === id ? res.data : r))
    );
    setEditingRoomId(null);
  } catch (err) {
    console.error("Error updating room:", err);
    alert("Room update failed");
  }
};

// Silme isteği
const deleteRoomRemote = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/api/rooms/${id}`);
    setRooms((prev) => prev.filter((r) => r.id !== id));
  } catch (err) {
    console.error("Error deleting room:", err);
    alert("Room delete failed");
  }
};


  // Backend'den çekilecek tüm amenity kayıtlarını tutmak için state
  const [allAmenities, setAllAmenities] = useState([]);

  // Tüm amenities listesini backend'den çekiyoruz
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/hotelamenities")
      .then((response) => {
        setAllAmenities(response.data);
      })
      .catch((err) => {
        console.error("Error fetching hotel amenities:", err);
      });
  }, []);

  useEffect(() => {
    if (user && user.userId) {
      // Manager'a ait otelleri çekiyoruz
      axios
        .get(`http://localhost:8080/api/hotels/manager?userId=${user.userId}`)
        .then((response) => {
          const hotelsData = response.data;
          setHotels(hotelsData);
          // Otel listesinde en az bir kayıt varsa, amenities bilgisini ayrı endpoint'ten çekiyoruz
          if (hotelsData.length > 0) {
            const firstHotelId = hotelsData[0].hotelId;
            axios
              .get(`http://localhost:8080/api/hotels/${firstHotelId}/amenities`)
              .then((res) => {
                const updatedHotel = { ...hotelsData[0], amenities: res.data };
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
  // ————————————————
// Otel verisi geldikten sonra odaları çekmek için:
useEffect(() => {
  if (!hotels.length) return;                           // eğer otel yoksa çık
  const hotelId = hotels[0].hotelId;
  axios
    .get(`http://localhost:8080/api/rooms/hotel/${hotelId}`)
    .then(res => {
      // mutlaka dizi olarak set et
      const list = Array.isArray(res.data) ? res.data : [];
      setRooms(list);
    })
    .catch(err => console.error("Error fetching rooms:", err));
}, [hotels]);
// ————————————————


  const hotelToEdit = hotels.length > 0 ? hotels[0] : null;

  // Seçili amenity'leri kontrol eden fonksiyon; checkBox event'inden değeri alır.
  const toggleAmenity = (amenity, checked) => {
    if (checked) {
      setSelectedAmenities((prev) => [...prev, amenity]);
    } else {
      setSelectedAmenities((prev) => prev.filter((a) => a !== amenity));
    }
  };

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

  // Oda işlemleri (dokunulmuyor)
  const handleAddRoom = () => {
    if (!roomData.name || !roomData.roomType || roomData.pricePerNight === "" || roomData.totalRoom === "") {
      alert("Please fill in all room details before adding.");
      return;
    }
    setRooms([...rooms, roomData]);
    setRoomData({
      roomType: "",
      pricePerNight: "",
      name: "",
      totalRooms: ""
    });
  };

  const handleDeleteRoom = (index) => {
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
  };

  // Delete Hotel butonunun işlevini yerine getiren fonksiyon
  const deleteHotel = async (hotelId) => {
    try {
      await axios.delete(`http://localhost:8080/api/hotels/${hotelId}`);
      setHotels(hotels.filter((h) => h.hotelId !== hotelId));
      alert("Hotel deleted successfully!");
    } catch (err) {
      console.error("Error deleting hotel:", err);
      alert("Error deleting hotel");
    }
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
            {hotels.length > 0 && (
              <Card style={{ borderRadius: "50px", padding: "20px" }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">
                    {hotels[0].name}
                  </Typography>
                  <Typography><strong>City:</strong> {hotels[0].city}</Typography>
                  <Typography><strong>Country:</strong> {hotels[0].country}</Typography>
                  <Typography><strong>Description:</strong> {hotels[0].description}</Typography>
                  <Typography><strong>Star Rating:</strong> {hotels[0].starRating}</Typography>
                  <Typography><strong>Address:</strong> {hotels[0].address}</Typography>
                  <Typography><strong>Amenities:</strong> {hotels[0].amenities}</Typography>
                  <Box display="flex" gap={2} mt={2}>
                    <Button variant="outlined" onClick={() => handleEdit(hotels[0])}>
                      Edit Hotel
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      onClick={() => deleteHotel(hotels[0].hotelId)}
                    >
                      Delete Hotel
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Grid>

          {/* Room Alanı */}
<Grid item xs={12} sm={6}>
  <Card style={{ borderRadius: "50px", padding: "20px" }}>
    <CardContent>
      <Typography variant="h5" fontWeight="bold">Room Details</Typography>

      {Array.isArray(rooms) && rooms.length > 0 ? (
        rooms.map((room) => (
          <Box
            key={room.id}
            mt={2}
            p={2}
            border="1px solid #ccc"
            borderRadius="8px"
            display="flex"
            flexDirection="column"
            gap={1}
          >
            {editingRoomId === room.id ? (
              <>
                <TextField
                  label="Room Name"
                  value={editingRoomData.name}
                  onChange={(e) =>
                    setEditingRoomData((prev) => ({
                      ...prev,
                      name: e.target.value
                    }))
                  }
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Room Type"
                  value={editingRoomData.roomType}
                  onChange={(e) =>
                    setEditingRoomData((prev) => ({
                      ...prev,
                      roomType: e.target.value
                    }))
                  }
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Price"
                  type="number"
                  value={editingRoomData.pricePerNight}
                  onChange={(e) =>
                    setEditingRoomData((prev) => ({
                      ...prev,
                      pricePerNight: e.target.value
                    }))
                  }
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Total Rooms"
                  type="number"
                  value={editingRoomData.totalRooms}
                  onChange={(e) =>
                    setEditingRoomData((prev) => ({
                      ...prev,
                      totalRooms: e.target.value
                    }))
                  }
                  fullWidth
                  size="small"
                />
                <Box mt={1} display="flex" gap={1}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => updateRoom(room.id)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setEditingRoomId(null)}
                  >
                    Cancel
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography><strong>Name:</strong> {room.name}</Typography>
                <Typography><strong>Type:</strong> {room.roomType}</Typography>
                <Typography><strong>Price:</strong> {room.pricePerNight}</Typography>
                <Typography><strong>Total Rooms:</strong> {room.totalRooms}</Typography>
                <Box mt={1} display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => startEditRoom(room)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => deleteRoomRemote(room.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </>
            )}
          </Box>
        ))
      ) : (
        <Typography mt={2}>No rooms available for this hotel.</Typography>
      )}
    </CardContent>
  </Card>
</Grid>
</Grid>   {/* <-- closes the container */}


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
              <Button
                variant="outlined"
                onClick={() => {
                  if (editHotel && editHotel.amenities) {
                    const preSelected = editHotel.amenities.split(",").map(a => a.trim());
                    setSelectedAmenities(preSelected);
                  } else {
                    setSelectedAmenities([]);
                  }
                  setShowAmenitySelector(true);
                }}
              >
                {showAmenitySelector ? "Close Amenities" : "Select Amenities"}
              </Button>

              {showAmenitySelector && (
                <Box mt={2}>
                  {allAmenities.map((amenity) => (
                    <FormControlLabel
                      key={amenity.amenityId}
                      control={
                        <Checkbox 
                          checked={selectedAmenities.includes(amenity.name)}
                          onChange={(e) => toggleAmenity(amenity.name, e.target.checked)}
                        />
                      }
                      label={amenity.name}
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
