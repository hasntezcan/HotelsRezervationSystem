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

  /* ─────────── State ─────────── */
  const [managerId, setManagerId] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [editHotel, setEditHotel] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showAmenitySelector, setShowAmenitySelector] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [primaryFromDb, setPrimaryFromDb] = useState(null);

  const [showAddRoomForm, setShowAddRoomForm] = useState(false);

  const [roomData, setRoomData] = useState({
    name: "",
    roomType: "",
    pricePerNight: "",
    totalRooms: "",
    capacity: "",
    roomSize: ""
  });

  const [editingRoomId, setEditingRoomId] = useState(null);
  const [editingRoomData, setEditingRoomData] = useState({
    name: "",
    roomType: "",
    pricePerNight: "",
    totalRooms: 0,
    capacity: 0,
    roomSize: 0
  });

  const [allAmenities, setAllAmenities] = useState([]);

  /* ─────────── Effects ─────────── */

  // 0) managerId
  useEffect(() => {
    if (!user?.userId) return;
    axios
      .get(`http://localhost:8080/api/auth/profile/manager?userId=${user.userId}`)
      .then(res => {
        if (res.data.managerId) setManagerId(res.data.managerId);
      })
      .catch(() => console.error("Error fetching manager profile"));
  }, [user]);

  // 1) hotels + first amenities
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

  // 2) all amenities
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/hotelamenities")
      .then(res => setAllAmenities(res.data))
      .catch(() => alert("Error fetching hotel amenities"));
  }, []);

  // 3) room list
  useEffect(() => {
    if (!hotels.length) return;
    const hotelId = hotels[0].hotelId;
    axios
      .get(`http://localhost:8080/api/rooms/hotel/${hotelId}`)
      .then(res => setRooms(Array.isArray(res.data) ? res.data : []))
      .catch(() => alert("Error fetching rooms"));
  }, [hotels]);

  useEffect(() => {
    setShowAddRoomForm(rooms.length === 0);
  }, [rooms]);

  /* ─────────── Handlers ─────────── */

  const toggleAmenity = (amenity, checked) =>
    setSelectedAmenities(prev =>
      checked ? [...prev, amenity] : prev.filter(a => a !== amenity)
    );

  const openAddHotelModal = () => {
    setEditHotel({ latitude: "", longitude: "" });
    setSelectedAmenities([]);
    setSelectedImageFiles([]);
    setPrimaryImageIndex(null);
    setExistingImages([]);
    setPrimaryFromDb(null);
    setOpenModal(true);
  };

  const handleEdit = async hotel => {
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

  const startEditRoom = room => {
    setEditingRoomId(room.id);
    setEditingRoomData({
      name: room.name,
      roomType: room.roomType,
      pricePerNight: room.pricePerNight,
      totalRooms: room.totalRooms,
      capacity: room.capacity,
      roomSize: room.roomSize
    });
  };

  const deleteExistingImage = async imageId => {
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

  /* ----------  SAVE HOTEL  ---------- */
  const handleSave = async () => {
    const latOk =
      editHotel?.latitude !== "" && !isNaN(parseFloat(editHotel.latitude));
    const lngOk =
      editHotel?.longitude !== "" && !isNaN(parseFloat(editHotel.longitude));

    if (
      !editHotel?.name?.trim() ||
      !editHotel?.city?.trim() ||
      !editHotel?.country?.trim() ||
      !editHotel?.address?.trim() ||
      !editHotel?.description?.trim() ||
      !editHotel?.starRating ||
      !latOk ||
      !lngOk
    ) {
      alert(t("manager_hotels.fill_all_fields"));
      return;
    }

    if (selectedAmenities.length === 0) {
      alert(t("manager_hotels.select_at_least_one_amenity"));
      return;
    }

    const base = {
      name: editHotel.name.trim(),
      city: editHotel.city.trim(),
      country: editHotel.country.trim(),
      address: editHotel.address.trim(),
      pricePerNight: editHotel.pricePerNight || 0,
      capacity: editHotel.capacity || 0,
      amenities: selectedAmenities.join(", "),
      managerId: managerId,
      description: editHotel.description.trim(),
      starRating: editHotel.starRating,
      featured: editHotel.featured || false,
      latitude: parseFloat(editHotel.latitude),
      longitude: parseFloat(editHotel.longitude)
    };

    const configJson = {
      headers: {
        Authorization: user?.token ? `Bearer ${user.token}` : "",
        "Content-Type": "application/json"
      }
    };

    try {
      let hotelRes;
      if (editHotel?.hotelId) {
        hotelRes = await axios.put(
          `http://localhost:8080/api/hotels/${editHotel.hotelId}`,
          base,
          configJson
        );
      } else {
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
          configJson
        );
      }
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

      if (selectedImageFiles.length === 0 && primaryFromDb) {
        await axios
          .patch(
            `http://localhost:8080/api/hotel-images/${primaryFromDb}/primary`,
            {},
            {
              headers: {
                Authorization: user?.token ? `Bearer ${user.token}` : ""
              }
            }
          )
          .catch(() => {});
      }

      setHotels(prev => {
        if (editHotel?.hotelId) {
          return prev.map(h =>
            h.hotelId === savedHotel.hotelId ? savedHotel : h
          );
        }
        return [...prev, savedHotel];
      });

      alert(
        `Hotel ${editHotel?.hotelId ? "updated" : "added"} successfully!`
      );
      setOpenModal(false);
    } catch (err) {
      console.error(err);
      alert(editHotel?.hotelId ? "Error updating hotel" : "Error adding hotel");
    }
  };

  const handleChange = (e, field) => {
    const val = field === "featured" ? e.target.checked : e.target.value;
    setEditHotel(prev => ({ ...prev, [field]: val }));
  };

  /* ---------- Room CRUD ---------- */
  const handleAddRoom = async () => {
    if (
      !roomData.name ||
      !roomData.roomType ||
      roomData.pricePerNight === "" ||
      roomData.totalRooms === "" ||
      roomData.capacity === "" ||
      roomData.roomSize === ""
    ) {
      alert("Please fill in all room details before adding.");
      return;
    }

    try {
      const payload = {
        hotelId: hotels[0].hotelId,
        name: roomData.name.trim(),
        roomType: roomData.roomType.trim(),
        pricePerNight: parseFloat(roomData.pricePerNight),
        totalRooms: parseInt(roomData.totalRooms, 10),
        capacity: parseInt(roomData.capacity, 10),
        roomSize: parseFloat(roomData.roomSize)
      };
      const res = await axios.post("http://localhost:8080/api/rooms", payload);
      setRooms(prev => [...prev, res.data]);
      setRoomData({
        name: "",
        roomType: "",
        pricePerNight: "",
        totalRooms: "",
        capacity: "",
        roomSize: ""
      });
      setShowAddRoomForm(false);
    } catch (err) {
      console.error(err);
      alert("Room add failed");
    }
  };

  const updateRoom = async id => {
    try {
      const payload = {
        hotelId: hotels[0].hotelId,
        name: editingRoomData.name.trim(),
        roomType: editingRoomData.roomType.trim(),
        pricePerNight: parseFloat(editingRoomData.pricePerNight),
        totalRooms: parseInt(editingRoomData.totalRooms, 10),
        capacity: parseInt(editingRoomData.capacity, 10),
        roomSize: parseFloat(editingRoomData.roomSize)
      };
      const res = await axios.put(
        `http://localhost:8080/api/rooms/${id}`,
        payload
      );
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

  /* ─────────── UI ─────────── */

  return (
    <div className="dashboard" style={{ display: "flex" }}>
      <SidebarManager />
      <div className="content" style={{ padding: "40px", width: "100%" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h4" fontWeight="bold">
            {t("manager_hotels.hotel")}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {t("manager_hotels.room")}
          </Typography>
        </Box>

        {hotels.length === 0 && (
          <Box mb={3}>
            <Button
              variant="contained"
              onClick={openAddHotelModal}
              style={{
                backgroundColor: "#9C27B0",
                color: "#fff",
                fontWeight: "bold",
                padding: "8px 24px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
              }}
            >
              {t("manager_hotels.add_hotel")}
            </Button>
          </Box>
        )}

        <Grid container spacing={4}>
          {/* Hotel card */}
          <Grid item xs={12} sm={6}>
            {hotels.length > 0 && (
              <Card style={{ borderRadius: "50px", padding: "20px" }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold">
                    {hotels[0].name}
                  </Typography>
                  <Typography>
                    <strong>{t("manager_hotels.city")}:</strong>{" "}
                    {hotels[0].city}
                  </Typography>
                  <Typography>
                    <strong>{t("manager_hotels.country")}:</strong>{" "}
                    {hotels[0].country}
                  </Typography>
                  <Typography>
                    <strong>{t("manager_hotels.description")}:</strong>{" "}
                    {hotels[0].description}
                  </Typography>
                  <Typography>
                    <strong>Star Rating:</strong> {hotels[0].starRating}
                  </Typography>
                  <Typography>
                    <strong>Address:</strong> {hotels[0].address}
                  </Typography>
                  <Typography>
                    <strong>Amenities:</strong> {hotels[0].amenities}
                  </Typography>
                  <Box display="flex" gap={2} mt={2}>
                    <Button
                      variant="outlined"
                      onClick={() => handleEdit(hotels[0])}
                    >
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

          {/* Room column */}
          <Grid item xs={12} sm={6}>
            <Card style={{ borderRadius: "50px", padding: "20px" }}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h5" fontWeight="bold">
                    {t("manager_hotels.room_details")}
                  </Typography>
                  {rooms.length > 0 && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => setShowAddRoomForm(true)}
                    >
                      {t("common.add")}
                    </Button>
                  )}
                </Box>

                {/* Add room form */}
                {showAddRoomForm && (
                  <Box
                    mt={2}
                    p={2}
                    border="1px solid #ccc"
                    borderRadius="8px"
                    display="flex"
                    flexDirection="column"
                    gap={1}
                  >
                    <TextField
                      label={t("manager_hotels.room_name")}
                      value={roomData.name}
                      onChange={e =>
                        setRoomData(prev => ({
                          ...prev,
                          name: e.target.value
                        }))
                      }
                      fullWidth
                      size="small"
                    />
                    <TextField
                      label={t("manager_hotels.room_type")}
                      value={roomData.roomType}
                      onChange={e =>
                        setRoomData(prev => ({
                          ...prev,
                          roomType: e.target.value
                        }))
                      }
                      fullWidth
                      size="small"
                    />
                    <TextField
                      label={t("manager_hotels.price")}
                      type="number"
                      value={roomData.pricePerNight}
                      onChange={e =>
                        setRoomData(prev => ({
                          ...prev,
                          pricePerNight: e.target.value
                        }))
                      }
                      fullWidth
                      size="small"
                    />
                    <TextField
                      label={t("manager_hotels.total_rooms")}
                      type="number"
                      value={roomData.totalRooms}
                      onChange={e =>
                        setRoomData(prev => ({
                          ...prev,
                          totalRooms: e.target.value
                        }))
                      }
                      fullWidth
                      size="small"
                    />
                    <TextField
                      label={t("manager_hotels.capacity")}
                      type="number"
                      value={roomData.capacity}
                      onChange={e =>
                        setRoomData(prev => ({
                          ...prev,
                          capacity: e.target.value
                        }))
                      }
                      fullWidth
                      size="small"
                    />
                    <TextField
                      label={t("manager_hotels.room_size")}
                      type="number"
                      value={roomData.roomSize}
                      onChange={e =>
                        setRoomData(prev => ({
                          ...prev,
                          roomSize: e.target.value
                        }))
                      }
                      fullWidth
                      size="small"
                    />
                    <Box mt={1} display="flex" gap={1}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleAddRoom}
                      >
                        {t("common.save")}
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setShowAddRoomForm(false);
                          setRoomData({
                            name: "",
                            roomType: "",
                            pricePerNight: "",
                            totalRooms: "",
                            capacity: "",
                            roomSize: ""
                          });
                        }}
                      >
                        {t("common.cancel")}
                      </Button>
                    </Box>
                  </Box>
                )}

                {/* Room list */}
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
                            setEditingRoomData(prev => ({
                              ...prev,
                              name: e.target.value
                            }))
                          }
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label={t("manager_hotels.room_type")}
                          value={editingRoomData.roomType}
                          onChange={e =>
                            setEditingRoomData(prev => ({
                              ...prev,
                              roomType: e.target.value
                            }))
                          }
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label={t("manager_hotels.price")}
                          type="number"
                          value={editingRoomData.pricePerNight}
                          onChange={e =>
                            setEditingRoomData(prev => ({
                              ...prev,
                              pricePerNight: e.target.value
                            }))
                          }
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label={t("manager_hotels.total_rooms")}
                          type="number"
                          value={editingRoomData.totalRooms}
                          onChange={e =>
                            setEditingRoomData(prev => ({
                              ...prev,
                              totalRooms: e.target.value
                            }))
                          }
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label={t("manager_hotels.capacity")}
                          type="number"
                          value={editingRoomData.capacity}
                          onChange={e =>
                            setEditingRoomData(prev => ({
                              ...prev,
                              capacity: e.target.value
                            }))
                          }
                          fullWidth
                          size="small"
                        />
                        <TextField
                          label={t("manager_hotels.room_size")}
                          type="number"
                          value={editingRoomData.roomSize}
                          onChange={e =>
                            setEditingRoomData(prev => ({
                              ...prev,
                              roomSize: e.target.value
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
                            {t("common.save")}
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setEditingRoomId(null)}
                          >
                            {t("common.cancel")}
                          </Button>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Typography>
                          <strong>Name:</strong> {room.name}
                        </Typography>
                        <Typography>
                          <strong>Type:</strong> {room.roomType}
                        </Typography>
                        <Typography>
                          <strong>Price:</strong> {room.pricePerNight}
                        </Typography>
                        <Typography>
                          <strong>Total Rooms:</strong> {room.totalRooms}
                        </Typography>
                        <Typography>
                          <strong>Capacity:</strong> {room.capacity}
                        </Typography>
                        <Typography>
                          <strong>Size:</strong> {room.roomSize}
                        </Typography>
                        <Box mt={1} display="flex" gap={1}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => startEditRoom(room)}
                          >
                            {t("common.edit")}
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => deleteRoomRemote(room.id)}
                          >
                            {t("common.delete")}
                          </Button>
                        </Box>
                      </>
                    )}
                  </Box>
                ))}
                {rooms.length === 0 && (
                  <Typography mt={2}>
                    No rooms available for this hotel.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* ------------- HOTEL MODAL ------------- */}
        <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {editHotel?.hotelId
              ? t("manager_hotels.edit_hotel")
              : t("manager_hotels.add_hotel")}
            <IconButton
              onClick={() => setOpenModal(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            {["name", "city", "country", "address", "description"].map(field => (
              <TextField
                key={field}
                label={t(`manager_hotels.${field}`)}
                value={editHotel?.[field] || ""}
                onChange={e => handleChange(e, field)}
                fullWidth
                margin="normal"
              />
            ))}

            {/* Latitude & Longitude */}
            <TextField
              label="Latitude"
              type="number"
              inputProps={{ step: "any" }}
              value={editHotel?.latitude ?? ""}
              onChange={e => handleChange(e, "latitude")}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Longitude"
              type="number"
              inputProps={{ step: "any" }}
              value={editHotel?.longitude ?? ""}
              onChange={e => handleChange(e, "longitude")}
              fullWidth
              margin="normal"
            />

            <Box marginY={2}>
              <Typography variant="subtitle1">
                {t("manager_hotels.star_rating")}
              </Typography>
              <Rating
                value={Number(editHotel?.starRating) || 0}
                onChange={(e, newValue) =>
                  setEditHotel(prev => ({ ...prev, starRating: newValue }))
                }
                max={5}
              />
            </Box>

            {/* Amenities */}
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
                          onChange={e =>
                            toggleAmenity(amenity.name, e.target.checked)
                          }
                        />
                      }
                      label={amenity.name}
                    />
                  ))}
                  <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                    <Button
                      variant="outlined"
                      onClick={() => setShowAmenitySelector(false)}
                    >
                      {t("common.cancel")}
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => setShowAmenitySelector(false)}
                    >
                      {t("common.done")}
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Images */}
            <Box mt={3}>
              <Typography variant="subtitle1">
                {t("manager_hotels.select_images")}
              </Typography>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={e => {
                  const files = Array.from(e.target.files);
                  setSelectedImageFiles(files);
                  setPrimaryImageIndex(files.length ? 0 : null);
                }}
                style={{
                  marginTop: 8,
                  border: "1px solid #ccc",
                  padding: "8px",
                  borderRadius: "4px",
                  width: "100%",
                  backgroundColor: "#f8f9fa",
                  cursor: "pointer"
                }}
              />
            </Box>

            {selectedImageFiles.length > 0 && (
              <Box mt={2}>
                {selectedImageFiles.map((file, idx) => (
                  <Box
                    key={idx}
                    display="flex"
                    alignItems="center"
                    mb={1}
                    sx={{
                      padding: "8px",
                      borderRadius: "4px",
                      backgroundColor: "#fff",
                      border: "1px solid #e0e0e0",
                      "&:hover": { backgroundColor: "#f5f5f5" }
                    }}
                  >
                    <input
                      type="radio"
                      name="primaryImage"
                      checked={primaryImageIndex === idx}
                      onChange={() => setPrimaryImageIndex(idx)}
                      style={{
                        width: "18px",
                        height: "18px",
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
                        const newFiles = selectedImageFiles.filter(
                          (_, index) => index !== idx
                        );
                        setSelectedImageFiles(newFiles);
                        if (primaryImageIndex === idx) {
                          setPrimaryImageIndex(newFiles.length ? 0 : null);
                        } else if (primaryImageIndex > idx) {
                          setPrimaryImageIndex(primaryImageIndex - 1);
                        }
                      }}
                      sx={{
                        color: "#f44336",
                        "&:hover": { backgroundColor: "rgba(244,67,54,0.04)" }
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}

            {existingImages.length > 0 && (
              <Box mt={3}>
                <Typography variant="subtitle1">
                  {t("manager_hotels.current_images")}
                </Typography>

                {existingImages.map(img => (
                  <Box
                    key={img.imageId}
                    display="flex"
                    alignItems="center"
                    mb={1}
                  >
                    <input
                      type="radio"
                      name="primaryExisting"
                      checked={primaryFromDb === img.imageId}
                      onChange={() => setPrimaryFromDb(img.imageId)}
                      style={{ cursor: "pointer", accentColor: "#9C27B0" }}
                    />
                    <img
                      src={`http://localhost:8080${img.imageUrl}`}
                      alt=""
                      style={{
                        width: 60,
                        height: 40,
                        objectFit: "cover",
                        marginLeft: 8,
                        borderRadius: 4
                      }}
                    />
                    <Typography
                      ml={1}
                      variant="body2"
                      sx={{
                        flex: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {img.imageUrl.split("/").pop()}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => deleteExistingImage(img.imageId)}
                      sx={{
                        color: "#f44336",
                        "&:hover": {
                          backgroundColor: "rgba(244,67,54,0.04)"
                        }
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
            >
              {t("common.save_changes")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ManagerHotels;
