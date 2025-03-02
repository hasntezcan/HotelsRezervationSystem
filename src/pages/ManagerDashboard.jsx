import React, { useState, useEffect } from "react";

const ManagerDashboard = () => {
  const [hotels, setHotels] = useState(120); // Mock total hotels
  const [reservations, setReservations] = useState({
    daily: 45,
    weekly: 320,
    monthly: 1300,
  });
  const [revenue, setRevenue] = useState(25000); // Mock total revenue
  const [cancellationRate, setCancellationRate] = useState(7); // Mock cancellation rate
  const [recentHotels, setRecentHotels] = useState([
    "Grand Plaza Hotel",
    "Sunrise Inn",
    "Luxury Stay",
  ]);
  const [recentReservations, setRecentReservations] = useState([
    { name: "John Doe", room: "202", date: "12/03/2024" },
    { name: "Jane Smith", room: "405", date: "11/03/2024" },
    { name: "Michael Brown", room: "102", date: "10/03/2024" },
  ]);
  const [weather, setWeather] = useState({ temp: "25°C", condition: "Sunny" });

  // Simulate data fetching (later we can replace this with real API calls)
  useEffect(() => {
    // Simulated API call delay
    setTimeout(() => {
      setHotels(130);
      setReservations({ daily: 50, weekly: 350, monthly: 1450 });
      setRevenue(27000);
      setRecentHotels(["Royal Suites", "City Lights Hotel", "Ocean View Resort"]);
      setRecentReservations([
        { name: "Alice Johnson", room: "303", date: "13/03/2024" },
        { name: "Robert Wilson", room: "110", date: "12/03/2024" },
      ]);
      setWeather({ temp: "22°C", condition: "Cloudy" });
    }, 2000);
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Manager Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">
        <div className="card">Total Hotels: {hotels}</div>
        <div className="card">Daily Reservations: {reservations.daily}</div>
        <div className="card">Weekly Reservations: {reservations.weekly}</div>
        <div className="card">Monthly Reservations: {reservations.monthly}</div>
        <div className="card">Total Revenue: ${revenue}</div>
        <div className="card">Cancellation Rate: {cancellationRate}%</div>
      </div>

      {/* Weather Section */}
      <div className="weather-section">
        <h3>Today's Weather</h3>
        <p>🌤 {weather.temp} - {weather.condition}</p>
      </div>

      {/* Recent Data */}
      <div className="recent-data">
        <div className="recent-hotels">
          <h3>Recently Added Hotels</h3>
          <ul>
            {recentHotels.map((hotel, index) => (
              <li key={index}>{hotel}</li>
            ))}
          </ul>
        </div>

        <div className="recent-reservations">
          <h3>Latest Reservations</h3>
          <ul>
            {recentReservations.map((res, index) => (
              <li key={index}>
                {res.name} - Room {res.room} - {res.date}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
