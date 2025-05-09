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
  const { t }   = useTranslation();

  /* ─────────── State ─────────── */
  const [managerId, setManagerId]                         = useState(null);
  const [hotels, setHotels]                               = useState([]);
  const [editHotel, setEditHotel]                         = useState(null);
  const [openModal, setOpenModal]                         = useState(false);
  const [showAmenitySelector, setShowAmenitySelector]     = useState(false);
  const [selectedAmenities, setSelectedAmenities]         = useState([]);
  const [selectedImageFiles, setSelectedImageFiles]       = useState([]);
  const [primaryImageIndex, setPrimaryImageIndex]         = useState(null);
  const [existingImages, setExistingImages]               = useState([]);
  const [primaryFromDb, setPrimaryFromDb]                 = useState(null);

  const [rooms, setRooms]                                 = useState([]);
  const [showAddRoomForm, setShowAddRoomForm]             = useState(false);
  const [selectedRoomImageFiles, setSelectedRoomImageFiles] = useState([]);
  const [primaryRoomImageIndex, setPrimaryRoomImageIndex] = useState(null);

  const emptyRoom = {
    name: "",
    roomType: "",
    bedType: "",
    description: "",
    roomSize: "",
    pricePerNight: "",
    totalRooms: "",
    capacity: ""
  };

  const [roomData, setRoomData]             = useState({ ...emptyRoom });
  const [editingRoomId, setEditingRoomId]   = useState(null);
  const [editingRoomData, setEditingRoomData] = useState({ ...emptyRoom });

  // Yeni: mevcut oda görselleri
  const [existingRoomImages, setExistingRoomImages] = useState([]);
  const [primaryRoomFromDb, setPrimaryRoomFromDb]   = useState(null);

  const [allAmenities, setAllAmenities] = useState([]);

  /* ─────────── Effects ─────────── */
  useEffect(() => {
    if (!user?.userId) return;
    axios
      .get(`http://localhost:8080/api/auth/profile/manager?userId=${user.userId}`)
      .then(res => res.data.managerId && setManagerId(res.data.managerId))
      .catch(() => console.error("Error fetching manager profile"));
  }, [user]);

  useEffect(() => {
    if (!user?.userId) return;
    axios
      .get(`http://localhost:8080/api/hotels/manager?userId=${user.userId}`)
      .then(async res => {
        const list = res.data;
        setHotels(list);
        if (list.length) {
          const ares = await axios.get(
            `http://localhost:8080/api/hotels/${list[0].hotelId}/amenities`
          );
          setHotels(prev => {
            const copy = [...prev];
            copy[0] = { ...copy[0], amenities: ares.data };
            return copy;
          });
        }
      })
      .catch(() => alert("Error fetching hotels or amenities"));
  }, [user]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/hotelamenities")
      .then(res => setAllAmenities(res.data))
      .catch(() => alert("Error fetching hotel amenities"));
  }, []);

  useEffect(() => {
    if (!hotels.length) return;
    axios
      .get(`http://localhost:8080/api/rooms/hotel/${hotels[0].hotelId}`)
      .then(res => setRooms(Array.isArray(res.data) ? res.data : []))
      .catch(() => alert("Error fetching rooms"));
  }, [hotels]);

  useEffect(() => setShowAddRoomForm(rooms.length === 0), [rooms]);

  /* ─────────── Helpers ─────────── */
  const toggleAmenity = (amenity, checked) =>
    setSelectedAmenities(prev =>
      checked ? [...prev, amenity] : prev.filter(a => a !== amenity)
    );

  const roomRequired = d =>
    !d.name || !d.roomType || !d.bedType || !d.description ||
    d.roomSize === "" || d.pricePerNight === "" ||
    d.totalRooms === "" || d.capacity === "";

  /* ─────────── Room CRUD ─────────── */
  const handleAddRoom = async () => {
    if (roomRequired(roomData)) {
      alert("Please fill in all room details before adding.");
      return;
    }
    try {
      const payload = {
        hotelId: hotels[0].hotelId,
        name: roomData.name.trim(),
        roomType: roomData.roomType.trim(),
        bedType: roomData.bedType.trim(),
        description: roomData.description.trim(),
        roomSize: parseFloat(roomData.roomSize),
        pricePerNight: parseFloat(roomData.pricePerNight),
        totalRooms: parseInt(roomData.totalRooms, 10),
        capacity: parseInt(roomData.capacity, 10)
      };
      const res = await axios.post("http://localhost:8080/api/rooms", payload);
      const newRoom = res.data;

      // Upload room images
      for (let i = 0; i < selectedRoomImageFiles.length; i++) {
        const file = selectedRoomImageFiles[i];
        const form = new FormData();
        form.append("roomId", newRoom.id);
        form.append("isPrimary", i === primaryRoomImageIndex);
        form.append("file", file);
        await axios.post(
          "http://localhost:8080/api/room-images/upload",
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      setRooms(prev => [...prev, newRoom]);
      setRoomData({ ...emptyRoom });
      setSelectedRoomImageFiles([]);
      setPrimaryRoomImageIndex(null);
      setShowAddRoomForm(false);
    } catch (err) {
      console.error(err);
      alert("Room add failed");
    }
  };

  const updateRoom = async (id) => {
    if (roomRequired(editingRoomData)) {
      alert("Please fill in all room details before saving.");
      return;
    }
    try {
      const payload = {
        hotelId: hotels[0].hotelId,
        name: editingRoomData.name.trim(),
        roomType: editingRoomData.roomType.trim(),
        bedType: editingRoomData.bedType.trim(),
        description: editingRoomData.description.trim(),
        roomSize: parseFloat(editingRoomData.roomSize),
        pricePerNight: parseFloat(editingRoomData.pricePerNight),
        totalRooms: parseInt(editingRoomData.totalRooms, 10),
        capacity: parseInt(editingRoomData.capacity, 10)
      };
      const res = await axios.put(
        `http://localhost:8080/api/rooms/${id}`,
        payload
      );

      // Upload new images
      for (let i = 0; i < selectedRoomImageFiles.length; i++) {
        const file = selectedRoomImageFiles[i];
        const form = new FormData();
        form.append("roomId", id);
        form.append("isPrimary", i === primaryRoomImageIndex);
        form.append("file", file);
        await axios.post(
          "http://localhost:8080/api/room-images/upload",
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      // Eğer yeni yükleme yoksa, DB'den gelen birinciliği koru
      if (!selectedRoomImageFiles.length && primaryRoomFromDb) {
        await axios.patch(
          `http://localhost:8080/api/room-images/${primaryRoomFromDb}/primary`,
          {},
          { headers: { Authorization: `Bearer ${user.token}` } }
        ).catch(console.error);
      }

      setSelectedRoomImageFiles([]);
      setPrimaryRoomImageIndex(null);
      setExistingRoomImages([]);
      setPrimaryRoomFromDb(null);
      setEditingRoomId(null);
      setRooms(prev => prev.map(r => (r.id === id ? res.data : r)));
    } catch (err) {
      console.error("Error updating room:", err);
      alert("Room update failed");
    }
  };

  const deleteRoomRemote = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/rooms/${id}`);
      setRooms(prev => prev.filter(r => r.id !== id));
    } catch {
      alert("Room delete failed");
    }
  };

  const startEditRoom = async (room) => {
    setEditingRoomId(room.id);
    setEditingRoomData({
      name: room.name,
      roomType: room.roomType,
      bedType: room.bedType,
      description: room.description,
      roomSize: room.roomSize,
      pricePerNight: room.pricePerNight,
      totalRooms: room.totalRooms,
      capacity: room.capacity
    });

    // Mevcut oda görsellerini çek
    try {
      const res = await axios.get(`http://localhost:8080/api/room-images/${room.id}`);
      setExistingRoomImages(res.data);
      const primaryImg = res.data.find(img => img.primary);
      setPrimaryRoomFromDb(primaryImg?.imageId ?? null);
    } catch (err) {
      console.error("Error fetching room images:", err);
      setExistingRoomImages([]);
      setPrimaryRoomFromDb(null);
    }
  };

  /* ─────────── Hotel helpers ─────────── */
  const deleteExistingImage = async (imageId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/hotel-images/${imageId}`,
        { headers: { Authorization: user?.token ? `Bearer ${user.token}` : "" } }
      );
      setExistingImages(prev => prev.filter(i => i.imageId !== imageId));
      if (primaryFromDb === imageId) setPrimaryFromDb(null);
    } catch {
      alert("Image delete failed");
    }
  };

  const openAddHotelModal = () => {
    setEditHotel({ latitude: "", longitude: "" });
    setSelectedAmenities([]);
    setSelectedImageFiles([]);
    setPrimaryImageIndex(null);
    setExistingImages([]);
    setPrimaryFromDb(null);
    setOpenModal(true);
  };

  const handleEdit = async (hotel) => {
    setSelectedAmenities(
      hotel.amenities ? hotel.amenities.split(",").map(a => a.trim()) : []
    );
    setEditHotel({ ...hotel, featured: hotel.featured ?? false });
    try {
      const res = await axios.get(
        `http://localhost:8080/api/hotel-images/${hotel.hotelId}`
      );
      setExistingImages(res.data);
      const prim = res.data.find(i => i.primary);
      setPrimaryFromDb(prim ? prim.imageId : null);
    } catch {
      setExistingImages([]);
      setPrimaryFromDb(null);
    }
    setSelectedImageFiles([]);
    setPrimaryImageIndex(null);
    setOpenModal(true);
  };

  const deleteHotel = async (hotelId) => {
    try {
      await axios.delete(`http://localhost:8080/api/hotels/${hotelId}`);
      setHotels(prev => prev.filter(h => h.hotelId !== hotelId));
      alert("Hotel deleted successfully!");
    } catch {
      alert("Error deleting hotel");
    }
  };

  const handleChange = (e, field) => {
    const val = field === "featured" ? e.target.checked : e.target.value;
    setEditHotel(prev => ({ ...prev, [field]: val }));
  };

  const handleSave = async () => {
    const latOk = editHotel?.latitude !== "" && !isNaN(parseFloat(editHotel.latitude));
    const lngOk = editHotel?.longitude !== "" && !isNaN(parseFloat(editHotel.longitude));
    if (
      !editHotel?.name?.trim()     || !editHotel?.city?.trim()   ||
      !editHotel?.country?.trim()  || !editHotel?.address?.trim()||
      !editHotel?.description?.trim() || !editHotel?.starRating ||
      !latOk || !lngOk
    ) {
      alert(t("manager_hotels.fill_all_fields"));
      return;
    }
    if (!selectedAmenities.length) {
      alert(t("manager_hotels.select_at_least_one_amenity"));
      return;
    }

    const base = {
      name          : editHotel.name.trim(),
      city          : editHotel.city.trim(),
      country       : editHotel.country.trim(),
     	address       : editHotel.address.trim(),
      pricePerNight : editHotel.pricePerNight || 0,
      capacity      : editHotel.capacity || 0,
      amenities     : selectedAmenities.join(", "),
      managerId     : managerId,
      description   : editHotel.description.trim(),
      starRating    : editHotel.starRating,
      featured      : editHotel.featured || false,
      latitude      : parseFloat(editHotel.latitude),
      longitude     : parseFloat(editHotel.longitude)
    };

    const configJson = {
      headers: {
        Authorization: user?.token ? `Bearer ${user.token}` : "",
        "Content-Type": "application/json"
      }
    };

    try {
      const hotelRes = editHotel?.hotelId
        ? await axios.put(
            `http://localhost:8080/api/hotels/${editHotel.hotelId}`,
            base,
            configJson
          )
        : await axios.post(
            "http://localhost:8080/api/hotels",
            {
              ...base,
              status            : "approved",
              checkInTime       : "14:00:00",
              checkOutTime      : "12:00:00",
              cancellationPolicy: "Free cancellation..."
            },
            configJson
          );

      const savedHotel = hotelRes.data;

      for (let i = 0; i < selectedImageFiles.length; i++) {
        const file = selectedImageFiles[i];
        const form = new FormData();
        form.append("hotelId", savedHotel.hotelId);
        form.append("isPrimary", i === primaryImageIndex);
        form.append("file", file);
        await axios.post(
          "http://localhost:8080/api/hotel-images/upload",
          form,
          {
            headers: {
              Authorization: user?.token ? `Bearer ${user.token}` : "",
              "Content-Type": "multipart/form-data"
            }
          }
        );
      }

      if (!selectedImageFiles.length && primaryFromDb) {
        await axios.patch(
          `http://localhost:8080/api/hotel-images/${primaryFromDb}/primary`,
          {},
          { headers: { Authorization: user?.token ? `Bearer ${user.token}` : "" } }
        ).catch(() => {});
      }

      setHotels(prev =>
        editHotel?.hotelId
          ? prev.map(h => (h.hotelId === savedHotel.hotelId ? savedHotel : h))
          : [...prev, savedHotel]
      );

      alert(`Hotel ${editHotel?.hotelId ? "updated" : "added"} successfully!`);
      setOpenModal(false);
    } catch (err) {
      console.error(err);
      alert(editHotel?.hotelId ? "Error updating hotel" : "Error adding hotel");
    }
  };

  /* ─────────── UI ─────────── */
  return (
    <div className="dashboard" style={{ display: "flex" }}>
      <SidebarManager />
      <div className="content" style={{ padding: 40, width: "100%" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h4" fontWeight="bold">{t("manager_hotels.hotel")}</Typography>
          <Typography variant="h4" fontWeight="bold">{t("manager_hotels.room")}</Typography>
        </Box>

        {hotels.length === 0 && (
          <Box mb={3}>
            <Button
              variant="contained"
              onClick={openAddHotelModal}
              sx={{ backgroundColor: "#9C27B0", fontWeight: 700, px: 3, borderRadius: 2, boxShadow: 2 }}
            >  
              {t("manager_hotels.add_hotel")}
            </Button>
          </Box>
        )}

        <Grid container spacing={4}>
          {/* HOTEL CARD */}
          <Grid item xs={12} sm={6}>
            {!!hotels.length && (
              <Card sx={{ borderRadius: "50px", p: 3 }}>
                <CardContent>
                  <Typography variant="h5" fontWeight={700}>{hotels[0].name}</Typography>
                  <Typography><b>{t("manager_hotels.city")}:</b> {hotels[0].city}</Typography>
                  <Typography><b>{t("manager_hotels.country")}:</b> {hotels[0].country}</Typography>
                  <Typography><b>{t("manager_hotels.description")}:</b> {hotels[0].description}</Typography>
                  <Typography><b>Star Rating:</b> {hotels[0].starRating}</Typography>
                  <Typography><b>Address:</b> {hotels[0].address}</Typography>
                  <Typography><b>Amenities:</b> {hotels[0].amenities}</Typography>
                  <Box mt={2} display="flex" gap={2}>
                    <Button variant="outlined" onClick={() => handleEdit(hotels[0])}>{t("manager_hotels.edit_hotel")}</Button>
                    <Button variant="outlined" color="error" onClick={() => deleteHotel(hotels[0].hotelId)}>{t("manager_hotels.delete_hotel")}</Button>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Grid>

          {/* ROOM CARD */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ borderRadius: "50px", p: 3 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" fontWeight={700}>{t("manager_hotels.room_details")}</Typography>
                  {!!rooms.length && (
                    <Button size="small" variant="contained" onClick={() => setShowAddRoomForm(true)}>
                      {t("Add Room")}
                    </Button>
                  )}
                </Box>


                {/* ADD ROOM FORM */}
                {showAddRoomForm && (
                  <Box mt={2} p={2} border="1px solid #ccc" borderRadius={2} display="flex" flexDirection="column" gap={1}>
                    <TextField label={t("manager_hotels.room_name")} value={roomData.name} onChange={e => setRoomData(p => ({ ...p, name: e.target.value }))} fullWidth size="small" />
                    <TextField label={t("manager_hotels.room_type")} value={roomData.roomType} onChange={e => setRoomData(p => ({ ...p, roomType: e.target.value }))} fullWidth size="small" />
                    <TextField label={t("Bed Type")} value={roomData.bedType} onChange={e => setRoomData(p => ({ ...p, bedType: e.target.value }))} fullWidth size="small" />
                    <TextField label={t("Description")} value={roomData.description} onChange={e => setRoomData(p => ({ ...p, description: e.target.value }))} fullWidth multiline minRows={2} size="small" />
                    <TextField label={t("Room Size")} type="number" value={roomData.roomSize} onChange={e => setRoomData(p => ({ ...p, roomSize: e.target.value }))} fullWidth size="small" />
                    <TextField label={t("manager_hotels.price")} type="number" value={roomData.pricePerNight} onChange={e => setRoomData(p => ({ ...p, pricePerNight: e.target.value }))} fullWidth size="small" />
                    <TextField label={t("manager_hotels.total_rooms")} type="number" value={roomData.totalRooms} onChange={e => setRoomData(p => ({ ...p, totalRooms: e.target.value }))} fullWidth size="small" />
                    <TextField label={t("Capacity")} type="number" value={roomData.capacity} onChange={e => setRoomData(p => ({ ...p, capacity: e.target.value }))} fullWidth size="small" />

                    {/* Room image selector */}
                    <Box mt={3}>
                      <Typography variant="subtitle2">{t("Select Image")}</Typography>
                      <input
  type="file"
  accept="image/*"
  multiple
  onChange={e => {
    const files = [...e.target.files];
    setSelectedRoomImageFiles(files);
    setPrimaryRoomImageIndex(files.length ? 0 : null);
  }}
  style={{
    marginTop: 8,
    border: "2px dashed #9C27B0",
    padding: "12px 16px",
    borderRadius: "8px",
    width: "100%",
    background: "#f8f9fa",
    cursor: "pointer",
    color: "#666",
    fontSize: "14px",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: "#7B1FA2",
      backgroundColor: "#F3E5F5"
    },
    "&::-webkit-file-upload-button": {
      backgroundColor: "#9C27B0",
      color: "white",
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      marginRight: "12px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "#7B1FA2"
      }
    }
  }}
/>
                    </Box>

{selectedRoomImageFiles.length > 0 && (
  <Box mt={2}>
    {selectedRoomImageFiles.map((file, idx) => (
      <Box 
        key={idx} 
        display="flex" 
        alignItems="center" 
        mb={1}
        sx={{
          p: 1,
          borderRadius: 1,
          bgcolor: "#fff",
          border: "1px solid #e0e0e0",
          "&:hover": { bgcolor: "#f5f5f5" }
        }}
      >
        <input 
          type="radio"
          name="primaryRoomImage"
          checked={primaryRoomImageIndex === idx}
          onChange={() => setPrimaryRoomImageIndex(idx)}
          style={{
            width: 18,
            height: 18,
            cursor: "pointer",
            accentColor: "#9C27B0"
          }}
        />
        <Typography 
          variant="body2" 
          ml={1}
          sx={{
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {file.name}
        </Typography>
        <IconButton 
          size="small"
          onClick={() => {
            const newFiles = selectedRoomImageFiles.filter((_, i) => i !== idx);
            setSelectedRoomImageFiles(newFiles);
            if (primaryRoomImageIndex === idx) {
              setPrimaryRoomImageIndex(newFiles.length ? 0 : null);
            } else if (primaryRoomImageIndex > idx) {
              setPrimaryRoomImageIndex(primaryRoomImageIndex - 1);
            }
          }}
          sx={{
            color: "#f44336",
            "&:hover": { bgcolor: "rgba(244,67,54,0.04)" }
          }}
        >
          <CloseIcon fontSize="small"/>
        </IconButton>
      </Box>
    ))}
  </Box>
)}
{existingRoomImages.length > 0 && (
                          <Box mt={3}>
                            <Typography variant="subtitle1">Existing Room Images</Typography>
                            {existingRoomImages.map(img => (
                              <Box key={img.imageId} display="flex" alignItems="center" mb={1}>
                                <input
                                  type="radio"
                                  name="primaryExistingRoom"
                                  checked={primaryRoomFromDb === img.imageId}
                                  onChange={() => setPrimaryRoomFromDb(img.imageId)}
                                  style={{ cursor: "pointer", accentColor: "#9C27B0" }}
                                />
                                <img
                                  src={`http://localhost:8080${img.imageUrl}`}
                                  alt=""
                                  style={{ width: 60, height: 40, objectFit: "cover", marginLeft: 8, borderRadius: 4 }}
                                />
                                <Typography
                                  ml={1}
                                  variant="body2"
                                  sx={{ flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}
                                >
                                  {img.imageUrl.split("/").pop()}
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={async () => {
                                    try {
                                      await axios.delete(`http://localhost:8080/api/room-images/${img.imageId}`);
                                      setExistingRoomImages(prev => prev.filter(i => i.imageId !== img.imageId));
                                      if (primaryRoomFromDb === img.imageId) setPrimaryRoomFromDb(null);
                                    } catch (err) {
                                      console.error("Error deleting room image:", err);
                                      alert("Failed to delete image");
                                    }
                                  }}
                                  sx={{ color: "#f44336", "&:hover": { bgcolor: "rgba(244,67,54,0.04)" } }}
                                >
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            ))}
                          </Box>
                        )}

                    <Box mt={1} display="flex" gap={1}>
                      <Button variant="contained" size="small" onClick={handleAddRoom}>{t("common.save")}</Button>
                      <Button variant="outlined" size="small" onClick={() => {
                        setShowAddRoomForm(false);
                        setRoomData({ ...emptyRoom });
                        setSelectedRoomImageFiles([]);
                        setPrimaryRoomImageIndex(null);
                      }}>{t("common.cancel")}</Button>
                    </Box>
                  </Box>
                )}

                {/* LISTED ROOMS */}
                {rooms.map(room => (
                  <Box key={room.id} mt={2} p={2} border="1px solid #ccc" borderRadius={2} display="flex" flexDirection="column" gap={1}>
                    {editingRoomId === room.id ? (
                      <>
                        <TextField label={t("manager_hotels.room_name")} value={editingRoomData.name} onChange={e => setEditingRoomData(p => ({ ...p, name: e.target.value }))} fullWidth size="small" />
                        <TextField label={t("manager_hotels.room_type")} value={editingRoomData.roomType} onChange={e => setEditingRoomData(p => ({ ...p, roomType: e.target.value }))} fullWidth size="small" />
                        <TextField label={t("Bed Type")} value={editingRoomData.bedType} onChange={e => setEditingRoomData(p => ({ ...p, bedType: e.target.value }))} fullWidth size="small" />
                        <TextField label={t("Room Description")} multiline minRows={2} value={editingRoomData.description} onChange={e => setEditingRoomData(p => ({ ...p, description: e.target.value }))} fullWidth size="small" />
                        <TextField label={t("Room Size")} type="number" value={editingRoomData.roomSize} onChange={e => setEditingRoomData(p => ({ ...p, roomSize: e.target.value }))} fullWidth size="small" />
                        <TextField label={t("manager_hotels.price")} type="number" value={editingRoomData.pricePerNight} onChange={e => setEditingRoomData(p => ({ ...p, pricePerNight: e.target.value }))} fullWidth size="small" />
                        <TextField label={t("manager_hotels.total_rooms")} type="number" value={editingRoomData.totalRooms} onChange={e => setEditingRoomData(p => ({ ...p, totalRooms: e.target.value }))} fullWidth size="small" />
                        <TextField label={t("Capacity")} type="number" value={editingRoomData.capacity} onChange={e => setEditingRoomData(p => ({ ...p, capacity: e.target.value }))} fullWidth size="small" />

                        {/* Room image selector for edit */}
                        

<Box mt={3}>
  <Typography variant="subtitle2">{t("Select Image")}</Typography>
  <input
  type="file"
  accept="image/*"
  multiple
  onChange={e => {
    const files = [...e.target.files];
    setSelectedRoomImageFiles(files);
    setPrimaryRoomImageIndex(files.length ? 0 : null);
  }}
  style={{
    marginTop: 8,
    border: "2px dashed #9C27B0",
    padding: "12px 16px",
    borderRadius: "8px",
    width: "100%",
    background: "#f8f9fa",
    cursor: "pointer",
    color: "#666",
    fontSize: "14px",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: "#7B1FA2",
      backgroundColor: "#F3E5F5"
    },
    "&::-webkit-file-upload-button": {
      backgroundColor: "#9C27B0",
      color: "white",
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      marginRight: "12px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "#7B1FA2"
      }
    }
  }}
/>
</Box>

{selectedRoomImageFiles.length > 0 && (
  <Box mt={2}>
    {selectedRoomImageFiles.map((file, idx) => (
      <Box 
        key={idx} 
        display="flex" 
        alignItems="center" 
        mb={1}
        sx={{
          p: 1,
          borderRadius: 1,
          bgcolor: "#fff",
          border: "1px solid #e0e0e0",
          "&:hover": { bgcolor: "#f5f5f5" }
        }}
      >
        <input 
          type="radio"
          name="primaryRoomImage"
          checked={primaryRoomImageIndex === idx}
          onChange={() => setPrimaryRoomImageIndex(idx)}
          style={{
            width: 18,
            height: 18,
            cursor: "pointer",
            accentColor: "#9C27B0"
          }}
        />
        <Typography 
          variant="body2" 
          ml={1}
          sx={{
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {file.name}
        </Typography>
        <IconButton 
          size="small"
          onClick={() => {
            const newFiles = selectedRoomImageFiles.filter((_, i) => i !== idx);
            setSelectedRoomImageFiles(newFiles);
            if (primaryRoomImageIndex === idx) {
              setPrimaryRoomImageIndex(newFiles.length ? 0 : null);
            } else if (primaryRoomImageIndex > idx) {
              setPrimaryRoomImageIndex(primaryRoomImageIndex - 1);
            }
          }}
          sx={{
            color: "#f44336",
            "&:hover": { bgcolor: "rgba(244,67,54,0.04)" }
          }}
        >
          <CloseIcon fontSize="small"/>
        </IconButton>
      </Box>
    ))}
  </Box>
)}
{existingRoomImages.length > 0 && (
                          <Box mt={3}>
                            <Typography variant="subtitle1">Existing Room Images</Typography>
                            {existingRoomImages.map(img => (
                              <Box key={img.imageId} display="flex" alignItems="center" mb={1}>
                                <input
                                  type="radio"
                                  name="primaryExistingRoom"
                                  checked={primaryRoomFromDb === img.imageId}
                                  onChange={() => setPrimaryRoomFromDb(img.imageId)}
                                  style={{ cursor: "pointer", accentColor: "#9C27B0" }}
                                />
                                <img
                                  src={`http://localhost:8080${img.imageUrl}`}
                                  alt=""
                                  style={{ width: 60, height: 40, objectFit: "cover", marginLeft: 8, borderRadius: 4 }}
                                />
                                <Typography
                                  ml={1}
                                  variant="body2"
                                  sx={{ flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}
                                >
                                  {img.imageUrl.split("/").pop()}
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={async () => {
                                    try {
                                      await axios.delete(`http://localhost:8080/api/room-images/${img.imageId}`);
                                      setExistingRoomImages(prev => prev.filter(i => i.imageId !== img.imageId));
                                      if (primaryRoomFromDb === img.imageId) setPrimaryRoomFromDb(null);
                                    } catch (err) {
                                      console.error("Error deleting room image:", err);
                                      alert("Failed to delete image");
                                    }
                                  }}
                                  sx={{ color: "#f44336", "&:hover": { bgcolor: "rgba(244,67,54,0.04)" } }}
                                >
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            ))}
                          </Box>
                        )}
                        

                        <Box mt={1} display="flex" gap={1}>
                          <Button variant="contained" size="small" onClick={() => updateRoom(room.id)}>{t("common.save")}</Button>
                          <Button variant="outlined" size="small" onClick={() => {
                            setEditingRoomId(null);
                            setSelectedRoomImageFiles([]);
                            setPrimaryRoomImageIndex(null);
                          }}>{t("common.cancel")}</Button>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Typography><b>Name:</b> {room.name}</Typography>
                        <Typography><b>Type:</b> {room.roomType}</Typography>
                        <Typography><b>Bed Type:</b> {room.bedType}</Typography>
                        <Typography><b>Description:</b> {room.description}</Typography>
                        <Typography><b>Size:</b> {room.roomSize} m²</Typography>
                        <Typography><b>Price:</b> {room.pricePerNight}</Typography>
                        <Typography><b>Total Rooms:</b> {room.totalRooms}</Typography>
                        <Typography><b>Capacity:</b> {room.capacity}</Typography>
                        <Box mt={1} display="flex" gap={1}>
                          <Button variant="outlined" size="small" onClick={() => startEditRoom(room)}>{t("common.edit")}</Button>
                          <Button variant="outlined" color="error" size="small" onClick={() => deleteRoomRemote(room.id)}>{t("common.delete")}</Button>
                        </Box>
                      </>
                    )}
                  </Box>
                ))}
                {!rooms.length && <Typography mt={2}>No rooms available for this hotel.</Typography>}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* HOTEL MODAL */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
          <DialogTitle>
            {editHotel?.hotelId ? t("manager_hotels.edit_hotel") : t("manager_hotels.add_hotel")}
            <IconButton onClick={() => setOpenModal(false)} sx={{ position: "absolute", right: 8, top: 8 }}><CloseIcon /></IconButton>
          </DialogTitle>

          <DialogContent dividers>
            {["name","city","country","address","description"].map(field => (
              <TextField 
    key={field} 
    label={field === "name" ? "Name" : t(`manager_hotels.${field}`)} 
    value={editHotel?.[field] || ""} 
    onChange={e => handleChange(e, field)} 
    fullWidth 
    margin="normal" 
  />
            ))}
            <TextField label="Latitude"  type="number" inputProps={{ step: "any" }} value={editHotel?.latitude ?? ""}  onChange={e => handleChange(e, "latitude")}  fullWidth margin="normal" />
            <TextField label="Longitude" type="number" inputProps={{ step: "any" }} value={editHotel?.longitude ?? ""} onChange={e => handleChange(e, "longitude")} fullWidth margin="normal" />

            <Box marginY={2}>
              <Typography variant="subtitle1">{t("manager_hotels.star_rating")}</Typography>
              <Rating value={Number(editHotel?.starRating)||0} onChange={(e, nv)=>setEditHotel(p=>({...p,starRating:nv}))} max={5}/>
            </Box>

            <Box marginTop={2}>
              <Button variant="outlined" onClick={()=>setShowAmenitySelector(!showAmenitySelector)}>
                {showAmenitySelector ? t("manager_hotels.close_amenities") : t("manager_hotels.select_amenities")}
              </Button>
              {showAmenitySelector && (
                <Box mt={2}>
                  {allAmenities.map(amenity=>(
                    <FormControlLabel key={amenity.amenityId} control={
                      <Checkbox checked={selectedAmenities.includes(amenity.name)} onChange={e=>toggleAmenity(amenity.name,e.target.checked)} />
                    } label={amenity.name}/>
                  ))}
                  <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={()=>setShowAmenitySelector(false)}>{t("common.cancel")}</Button>
                    <Button variant="contained" onClick={()=>setShowAmenitySelector(false)}>{t("common.done")}</Button>
                  </Box>
                </Box>
              )}
            </Box>

            <Box mt={3}>
              <Typography variant="subtitle1">{t("Select Image")}</Typography>
              <input
  type="file"
  accept="image/*"
  multiple
  onChange={e => {
    const files = [...e.target.files];
    setSelectedRoomImageFiles(files);
    setPrimaryRoomImageIndex(files.length ? 0 : null);
  }}
  style={{
    marginTop: 8,
    border: "2px dashed #9C27B0",
    padding: "12px 16px",
    borderRadius: "8px",
    width: "100%",
    background: "#f8f9fa",
    cursor: "pointer",
    color: "#666",
    fontSize: "14px",
    transition: "all 0.3s ease",
    "&:hover": {
      borderColor: "#7B1FA2",
      backgroundColor: "#F3E5F5"
    },
    "&::-webkit-file-upload-button": {
      backgroundColor: "#9C27B0",
      color: "white",
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      marginRight: "12px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "#7B1FA2"
      }
    }
  }}
/>
            </Box>

            {selectedImageFiles.length>0 && (
              <Box mt={2}>
                {selectedImageFiles.map((file,idx)=>(
                  <Box key={idx} display="flex" alignItems="center" mb={1} sx={{p:1,borderRadius:1,bgcolor:"#fff",border:"1px solid #e0e0e0","&:hover":{bgcolor:"#f5f5f5"}}}>
                    <input type="radio" name="primaryImage" checked={primaryImageIndex===idx} onChange={()=>setPrimaryImageIndex(idx)}
                           style={{width:18,height:18,cursor:"pointer",accentColor:"#9C27B0"}}/>
                    <Typography variant="body2" ml={1} sx={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{file.name}</Typography>
                    <IconButton size="small" onClick={()=>{const nf=selectedImageFiles.filter((_,i)=>i!==idx);setSelectedImageFiles(nf);if(primaryImageIndex===idx){setPrimaryImageIndex(nf.length?0:null);}else if(primaryImageIndex>idx){setPrimaryImageIndex(primaryImageIndex-1);}}}
                                sx={{color:"#f44336","&:hover":{bgcolor:"rgba(244,67,54,0.04)"}}}><CloseIcon fontSize="small"/></IconButton>
                  </Box>
                ))}
              </Box>
            )}

            {existingImages.length>0 && (
              <Box mt={3}>
                <Typography variant="subtitle1">{t("Selected Images")}</Typography>
                {existingImages.map(img=>(
                  <Box key={img.imageId} display="flex" alignItems="center" mb={1}>
                    <input type="radio" name="primaryExisting" checked={primaryFromDb===img.imageId} onChange={()=>setPrimaryFromDb(img.imageId)}
                           style={{cursor:"pointer",accentColor:"#9C27B0"}}/>
                    <img src={`http://localhost:8080${img.imageUrl}`} alt="" style={{width:60,height:40,objectFit:"cover",marginLeft:8,borderRadius:4}}/>
                    <Typography ml={1} variant="body2" sx={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{img.imageUrl.split("/").pop()}</Typography>
                    <IconButton size="small" onClick={()=>deleteExistingImage(img.imageId)}
                                sx={{color:"#f44336","&:hover":{bgcolor:"rgba(244,67,54,0.04)"}}}><CloseIcon fontSize="small"/></IconButton>
                  </Box>
                ))}
              </Box>
            )}
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
