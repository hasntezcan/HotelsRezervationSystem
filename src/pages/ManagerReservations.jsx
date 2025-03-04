import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { FaCheck, FaTimes } from "react-icons/fa";
import SidebarManager from "../components/Sidebar_manager"; // Sidebar component
import ManagerNavbar from "../components/ManagerNavbar"; // Navbar component

const ManagerReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Attempt to load reservations from localStorage
    const storedReservations = JSON.parse(localStorage.getItem("reservations"));

    // If no reservations in localStorage, create 3 sample reservations
    if (storedReservations && storedReservations.length > 0) {
      setReservations(storedReservations);
    } else {
      const sampleReservations = [
        {
          id: 1,
          hotelName: "The Grand London Hotel",
          customerName: "John Doe",
          checkInDate: "2025-04-01",
          checkOutDate: "2025-04-05",
          status: "Pending",
        },
        {
          id: 2,
          hotelName: "Sunset Beach Resort",
          customerName: "Jane Smith",
          checkInDate: "2025-05-01",
          checkOutDate: "2025-05-07",
          status: "Pending",
        },
        {
          id: 3,
          hotelName: "Mountain View Lodge",
          customerName: "Alice Johnson",
          checkInDate: "2025-06-10",
          checkOutDate: "2025-06-14",
          status: "Pending",
        },
      ];
      setReservations(sampleReservations);
      localStorage.setItem("reservations", JSON.stringify(sampleReservations)); // Save sample data to localStorage
    }
  }, []);

  const handleApprove = (reservationId) => {
    const updatedReservations = reservations.map((reservation) => {
      if (reservation.id === reservationId) {
        return { ...reservation, status: "Approved" };
      }
      return reservation;
    });

    setReservations(updatedReservations);
    localStorage.setItem("reservations", JSON.stringify(updatedReservations));
  };

  const handleReject = (reservationId) => {
    const updatedReservations = reservations.map((reservation) => {
      if (reservation.id === reservationId) {
        return { ...reservation, status: "Rejected" };
      }
      return reservation;
    });

    setReservations(updatedReservations);
    localStorage.setItem("reservations", JSON.stringify(updatedReservations));
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
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "40px",
          }}
        >
          <Grid container spacing={4} style={{ width: "100%", maxWidth: "1400px" }}>
            {/* Reservation List Section */}
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Reservation Management
              </Typography>

              {reservations.length > 0 ? (
                reservations.map((reservation) => (
                  <Card
                    key={reservation.id}
                    style={{
                      borderRadius: "15px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      marginBottom: "20px",
                      padding: "20px",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6">{reservation.hotelName}</Typography>
                      <Typography variant="body2" style={{ marginBottom: "10px" }}>
                        <strong>Customer:</strong> {reservation.customerName}
                      </Typography>
                      <Typography variant="body2" style={{ marginBottom: "10px" }}>
                        <strong>Check-in Date:</strong> {reservation.checkInDate}
                      </Typography>
                      <Typography variant="body2" style={{ marginBottom: "10px" }}>
                        <strong>Check-out Date:</strong> {reservation.checkOutDate}
                      </Typography>
                      <Typography variant="body2" style={{ marginBottom: "20px" }}>
                        <strong>Status:</strong> {reservation.status || "Pending"}
                      </Typography>

                      <Box display="flex" justifyContent="flex-start">
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<FaCheck />}
                          onClick={() => handleApprove(reservation.id)}
                          style={{ marginRight: "10px" }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          startIcon={<FaTimes />}
                          onClick={() => handleReject(reservation.id)}
                        >
                          Reject
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="h6" color="textSecondary">
                  No reservations found.
                </Typography>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ManagerReservations;
