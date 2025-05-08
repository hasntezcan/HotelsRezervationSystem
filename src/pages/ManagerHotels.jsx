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
import { useTranslation } from "react-i18next";

const ManagerHotels = () => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();

  // ─────────── State ───────────
  const [managerId, setManagerId] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [editHotel, setEditHotel] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showAmenitySelector, setShowAmenitySelector] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const [rooms, setRooms] = useState([]);
  const [roomData, setRoomData] = useState({
    name: "",
    roomType: "",
    pricePerNight: "",
    totalRooms: ""
  });
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [editingRoomData, setEditingRoomData] = useState({
    name: "",
    roomType: "",
    pricePerNight: "",
    totalRooms: 0
  });
  const [allAmenities, setAllAmenities] = useState([]);

  // ─────────── Effects ───────────

  // 0) Profile’den managerId’yi çek
  useEffect(() => {
    if (!user?.userId) return;
    axios
      .get(`http://localhost:8080/api/auth/profile/manager?userId=${user.userId}`)
      .then(res => {
        if (res.data.managerId) setManagerId(res.data.managerId);
      })
      .catch(() => console.error("Error fetching manager profile"));
  }, [user]);

  // 1) Otelleri ve ilk otelin amenities’ini çek
  useEffect(() => {
    if (!user?.userId) return;
    axios
      .get(`http://localhost:8080/api/hotels/manager?userId=${user.userId}`)
      .then(res => {
        const list = res.data;
        setHotels(list);
        if (list.length > 0) {
          return axios.get(
            `http://localhost:8080/api/hotels/${list[0].hotelId}/amenities`
          );
        }
      })
      .then(ares => {
        if (ares) {
          setHotels(prev => {
            const copy = [...prev];
            copy[0] = { ...copy[0], amenities: ares.data };
            return copy;
          });
        }
      })
      .catch(() => alert("Error fetching hotels or amenities"));
  }, [user]);

  // 2) Tüm amenity’leri çek
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/hotelamenities")
      .then(res => setAllAmenities(res.data))
      .catch(() => alert("Error fetching hotel amenities"));
  }, []);

  // 3) Oda listesini çek
  useEffect(() => {
    if (!hotels.length) return;
    const hotelId = hotels[0].hotelId;
    axios
      .get(`http://localhost:8080/api/rooms/hotel/${hotelId}`)
      .then(res => setRooms(Array.isArray(res.data) ? res.data : []))
      .catch(() => alert("Error fetching rooms"));
  }, [hotels]);

  // ─────────── Handlers ───────────
  const toggleAmenity = (amenity, checked) =>
    setSelectedAmenities(prev =>
      checked ? [...prev, amenity] : prev.filter(a => a !== amenity)
    );

  const handleImageChange = e => {
    if (e.target.files?.length) {
      setSelectedImageFile(e.target.files[0]);
    }
  };

  const handleEdit = hotel => {
    setSelectedAmenities(
      hotel.amenities
        ? hotel.amenities.split(",").map(a => a.trim())
        : []
    );
    setEditHotel({ ...hotel, featured: hotel.featured ?? false });
    setSelectedImageFile(null);
    setOpenModal(true);
  };

  const startEditRoom = room => {
    setEditingRoomId(room.id);
    setEditingRoomData({
      name: room.name,
      roomType: room.roomType,
      pricePerNight: room.pricePerNight,
      totalRooms: room.totalRooms
    });
  };

  // Otel kaydet (update veya create)
  const handleSave = async () => {
    const base = {
      name: editHotel.name || "",
      city: editHotel.city || "",
      country: editHotel.country || "",
      address: editHotel.address || "",
      pricePerNight: editHotel.pricePerNight || 0,
      capacity: editHotel.capacity || 0,
      amenities: selectedAmenities.join(", "),
      managerId: managerId,
      description: editHotel.description || "",
      starRating: editHotel.starRating || 0,
      featured: editHotel.featured || false
    };

    const config = {
      headers: {
        Authorization: user?.token ? `Bearer ${user.token}` : "",
        "Content-Type": "application/json"
      }
    };

    try {
      let hotelRes;
      if (editHotel?.hotelId) {
        // Update
        hotelRes = await axios.put(
          `http://localhost:8080/api/hotels/${editHotel.hotelId}`,
          base,
          config
        );
      } else {
        // Create
        const payload = {
          ...base,
          status: "approved",
          checkInTime: "14:00:00",
          checkOutTime: "12:00:00",
          cancellationPolicy: "Free cancellation..."
        };
        hotelRes = await axios.post(
          "http://localhost:8080/api/hotels",
          payload,
          config
        );
      }
      const savedHotel = hotelRes.data;

      // Eğer bir resim seçildiyse, aynı anda upload yerine yol kaydet
      if (selectedImageFile) {
        const filename = selectedImageFile.name;
        // frontend'de dosya fiziksel kaydetme yok; backend endpoint bekleniyor
        await axios.post(
          "http://localhost:8080/api/hotel-images",
          {
            hotelId: savedHotel.hotelId,
            imageUrl: `/hotel_images/${filename}`,
            isPrimary: true
          },
          config
        );
      }

      // State güncelle
      setHotels(prev => {
        if (editHotel?.hotelId) {
          return prev.map(h =>
            h.hotelId === savedHotel.hotelId ? savedHotel : h
          );
        } else {
          return [...prev, savedHotel];
        }
      });

      alert(`Hotel ${editHotel?.hotelId ? "updated" : "added"} successfully!`);
      setOpenModal(false);
    } catch {
      alert(editHotel?.hotelId ? "Error updating hotel" : "Error adding hotel");
    }
  };

  const handleChange = (e, field) => {
    const val = field === "featured" ? e.target.checked : e.target.value;
    setEditHotel(prev => ({ ...prev, [field]: val }));
  };

  const handleAddRoom = () => {
    if (
      !roomData.name ||
      !roomData.roomType ||
      roomData.pricePerNight === "" ||
      roomData.totalRooms === ""
    ) {
      alert("Please fill in all room details before adding.");
      return;
    }
    setRooms(prev => [...prev, roomData]);
    setRoomData({ name: "", roomType: "", pricePerNight: "", totalRooms: "" });
  };

  const updateRoom = async id => {
    try {
      const payload = {
        hotelId: hotels[0].hotelId,
        name: editingRoomData.name,
        roomType: editingRoomData.roomType,
        pricePerNight: editingRoomData.pricePerNight,
        totalRooms: editingRoomData.totalRooms
      };
      const res = await axios.put(`http://localhost:8080/api/rooms/${id}`, payload);
      setRooms(prev => prev.map(r => (r.id === id ? res.data : r)));
      setEditingRoomId(null);
    } catch {
      alert("Room update failed");
    }
  };

  const deleteRoomRemote = async id => {
    try {
      await axios.delete(`http://localhost:8080/api/rooms/${id}`);
      setRooms(prev => prev.filter(r => r.id !== id));
    } catch {
      alert("Room delete failed");
    }
  };

  const deleteHotel = async hotelId => {
    try {
      await axios.delete(`http://localhost:8080/api/hotels/${hotelId}`);
      setHotels(prev => prev.filter(h => h.hotelId !== hotelId));
      alert("Hotel deleted successfully!");
    } catch {
      alert("Error deleting hotel");
    }
  };

  return (
    <div className="dashboard" style={{ display: "flex" }}>
      <SidebarManager />
      <div className="content" style={{ padding: "40px", width: "100%" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h4" fontWeight="bold">{t("manager_hotels.hotel")}</Typography>
          <Typography variant="h4" fontWeight="bold">{t("manager_hotels.room")}</Typography>
        </Box>

        {hotels.length === 0 && (
          <Box mb={3}>
            <Button
              variant="contained"
              onClick={() => {
                setEditHotel({});
                setSelectedAmenities([]);
                setSelectedImageFile(null);
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
              {t("manager_hotels.add_hotel")}
            </Button>
          </Box>
        )}

        <Grid container spacing={4}>
          {/* Otel Kartı */}
          <Grid item xs={12} sm={6}>
            {hotels.length > 0 && (
              <Card style={{ borderRadius: "50px", padding: "20px" }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">
                    {hotels[0].name}
                  </Typography>
                  <Typography><strong>{t("manager_hotels.city")}:</strong> {hotels[0].city}</Typography>
                  <Typography><strong>{t("manager_hotels.country")}:</strong> {hotels[0].country}</Typography>
                  <Typography><strong>{t("manager_hotels.description")}:</strong> {hotels[0].description}</Typography>
                  <Typography><strong>Star Rating:</strong> {hotels[0].starRating}</Typography>
                  <Typography><strong>Address:</strong> {hotels[0].address}</Typography>
                  <Typography><strong>Amenities:</strong> {hotels[0].amenities}</Typography>
                  <Box display="flex" gap={2} mt={2}>
                    <Button variant="outlined" onClick={() => handleEdit(hotels[0])}>
                      {t("manager_hotels.edit_hotel")}
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      onClick={() => deleteHotel(hotels[0].hotelId)}
                    >
                      {t("manager_hotels.delete_hotel")}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Grid>

          {/* Oda Kartları */}
          <Grid item xs={12} sm={6}>
            <Card style={{ borderRadius: "50px", padding: "20px" }}>
              <CardContent>
                <Typography variant="h5" fontWeight="bold">{t("manager_hotels.room_details")}</Typography>
                {rooms.map(room => (
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
                          label={t("manager_hotels.room_name")}
                          value={editingRoomData.name}
                          onChange={e =>
                            setEditingRoomData(prev => ({ ...prev, name: e.target.value }))
                          }
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label={t("manager_hotels.room_type")}
                          value={editingRoomData.roomType}
                          onChange={e =>
                            setEditingRoomData(prev => ({ ...prev, roomType: e.target.value }))
                          }
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label={t("manager_hotels.price")}
                          type="number"
                          value={editingRoomData.pricePerNight}
                          onChange={e =>
                            setEditingRoomData(prev => ({ ...prev, pricePerNight: e.target.value }))
                          }
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label={t("manager_hotels.total_rooms")}
                          type="number"
                          value={editingRoomData.totalRooms}
                          onChange={e =>
                            setEditingRoomData(prev => ({ ...prev, totalRooms: e.target.value }))
                          }
                          fullWidth
                          size="small"
                        />  
                        <Box mt={1} display="flex" gap={1}>
                          <Button variant="contained" size="small" onClick={() => updateRoom(room.id)}>
                            {t("common.save")}
                          </Button>
                          <Button variant="outlined" size="small" onClick={() => setEditingRoomId(null)}>
                            {t("common.cancel")}
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
                          <Button variant="outlined" size="small" onClick={() => startEditRoom(room)}>
                            {t("common.edit")}
                          </Button>
                          <Button variant="outlined" color="error" size="small" onClick={() => deleteRoomRemote(room.id)}>
                            {t("common.delete")}
                          </Button>
                        </Box>
                      </>
                    )}
                  </Box>
                ))}
                {rooms.length === 0 && <Typography mt={2}>No rooms available for this hotel.</Typography>}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Modal */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
          <DialogTitle>
            {editHotel?.hotelId ? t("manager_hotels.edit_hotel") : t("manager_hotels.add_hotel")}
            <IconButton onClick={() => setOpenModal(false)} sx={{ position: "absolute", right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {["name","city","country","address","description"].map(field => (
              <TextField
                key={field}
                label={t(`manager_hotels.${field}`)}
                value={editHotel?.[field] || ""}
                onChange={e => handleChange(e, field)}
                fullWidth
                margin="normal"
              />
            ))}

            <Box marginY={2}>
              <Typography variant="subtitle1">{t("manager_hotels.star_rating")}</Typography>
              <Rating
                value={Number(editHotel?.starRating) || 0}
                onChange={(e, newValue) => setEditHotel(prev => ({ ...prev, starRating: newValue }))}
                max={5}
              />
            </Box>

            <Box marginTop={2}>
              <Button
                variant="outlined"
                onClick={() => setShowAmenitySelector(!showAmenitySelector)}
              >
                {showAmenitySelector
                  ? t("manager_hotels.close_amenities")
                  : t("manager_hotels.select_amenities")}
              </Button>

              {showAmenitySelector && (
                <Box mt={2}>
                  {allAmenities.map(amenity => (
                    <FormControlLabel
                      key={amenity.amenityId}
                      control={
                        <Checkbox
                          checked={selectedAmenities.includes(amenity.name)}
                          onChange={e => toggleAmenity(amenity.name, e.target.checked)}
                        />
                      }
                      label={amenity.name}
                    />
                  ))}
                  <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={() => setShowAmenitySelector(false)}>
                      {t("common.cancel")}
                    </Button>
                    <Button variant="contained" onClick={() => setShowAmenitySelector(false)}>
                      {t("common.done")}
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Image selection */}
            <Box mt={3}>
              <Typography variant="subtitle1">{t("manager_hotels.select_image")}</Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginTop: 8 }}
              />
              {selectedImageFile && (
                <Typography variant="body2" mt={1}>
                  Selected: {selectedImageFile.name}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave} variant="contained" color="primary">
              {t("common.save_changes")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ManagerHotels;
