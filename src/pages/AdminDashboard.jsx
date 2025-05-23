import React, { useState, useEffect } from "react";
import "../styles/AdminDashboard.css";

import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { useTranslation } from "react-i18next";

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState(new Date());
  const [weather, setWeather] = useState({ temp: "", condition: "", icon: "" });
  const [isMobile, setIsMobile] = useState(false);
  const [totalHotels, setTotalHotels] = useState(0);
  const [totalManagers, setTotalManagers] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [gain, setGain] = useState(0);
  const [managersPerCity, setManagersPerCity] = useState([]);
  const [monthlyReservations, setMonthlyReservations] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "d8979e0f88b7755b0afbcc390b89b16e";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Istanbul&appid=${apiKey}&units=metric`
        );
        setWeather({
          temp: response.data.main.temp,
          condition: response.data.weather[0].description,
          icon: `https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`,
        });
      } catch (error) {
        console.error("Hava durumu yüklenirken hata oluştu:", error);
      }
    };
    fetchWeather();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchTotalHotels();
    fetchTotalManagers();
    fetchTotalRooms();
    fetchGain();
    fetchManagersPerCity();
    fetchMonthlyReservations();
  }, []);

  const fetchTotalHotels = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/hotels");
      setTotalHotels(Array.isArray(response.data) ? response.data.length : 0);
    } catch (error) {
      console.error("Error fetching total hotels:", error);
    }
  };

  const fetchTotalManagers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users?role=manager");
      setTotalManagers(Array.isArray(response.data) ? response.data.length : 0);
    } catch (error) {
      console.error("Error fetching total managers:", error);
    }
  };

  const fetchTotalRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/rooms/total-rooms");
      setTotalRooms(response.data);
    } catch (error) {
      console.error("Error fetching total rooms:", error);
    }
  };

  const fetchGain = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/bookings/total-price");
      setGain(response.data);
    } catch (error) {
      console.error("Error fetching gain:", error);
    }
  };

  const fetchManagersPerCity = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/hotels");
      const cityMap = {};
      response.data.forEach((hotel) => {
        const city = hotel.city || "Unknown";
        if (!cityMap[city]) cityMap[city] = new Set();
        if (hotel.managerId) cityMap[city].add(hotel.managerId);
      });
      setManagersPerCity(
        Object.entries(cityMap).map(([city, set]) => ({
          name: city,
          value: set.size,
        }))
      );
    } catch (error) {
      console.error("Error fetching managers per city:", error);
    }
  };

  const fetchMonthlyReservations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/bookings/monthly-reservations");
      const flattened = response.data.flat();
      const cities = [...new Set(flattened.map(item => item.city))];
      const months = [...new Set(flattened.map(item => item.month))];
      const formatted = months.map(month => {
        const monthObj = { name: month };
        cities.forEach(city => {
          const match = flattened.find(item => item.month === month && item.city === city);
          monthObj[city] = match ? match.totalReservations : 0;
        });
        return monthObj;
      });
      setMonthlyReservations(formatted);
    } catch (error) {
      console.error("Error fetching monthly reservations:", error);
    }
  };

  const displayedData = isMobile
    ? monthlyReservations.slice(0, new Date().getMonth() + 1)
    : monthlyReservations;

  const stats = [
    { title: t("admin_dashboard.total_hotels"), value: totalHotels.toLocaleString() },
    { title: t("admin_dashboard.total_rooms"), value: totalRooms.toLocaleString() },
    { title: t("admin_dashboard.managers"), value: totalManagers.toLocaleString() },
    { title: t("admin_dashboard.gain"), value: gain.toLocaleString() },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="baslik">{t("admin_dashboard.title")}</h1>

      <div className="stats-container">
        {stats.map((stat, idx) => (
          <div className="stat-card" key={idx}>
            <h3>{stat.value}</h3>
            <p>{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="middle-container">
        <div className="calendar-widget">
          <h3>{t("admin_dashboard.calendar")}</h3>
          <Calendar onChange={setDate} value={date} />
          <p>{t("admin_dashboard.selected_date")}: {date.toDateString()}</p>
        </div>

        <div className="weather-widget">
          <h3>{t("admin_dashboard.weather")} (Istanbul)</h3>
          {weather.temp ? (
            <>
              <img src={weather.icon} alt="Weather Icon" />
              <p>{weather.temp}°C - {weather.condition}</p>
            </>
          ) : (
            <p>{t("admin_dashboard.loading_weather")}</p>
          )}
        </div>
      </div>

      <div className="chart-container">
        <h3>{t("admin_dashboard.reservations_chart")}</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={displayedData}>
            <CartesianGrid stroke="#555" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#fff" tick={{ fill: "#fff" }} />
            <YAxis stroke="#fff" tick={{ fill: "#fff" }} />
            <Tooltip contentStyle={{ backgroundColor: "#222" }} />
            <Legend />
            {displayedData.length > 0 &&
              Object.keys(displayedData[0])
                .filter(key => key !== "name")
                .map((city, i) => (
                  <Line key={i} type="monotone" dataKey={city} stroke="#8884d8" />
                ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bottom-container">
        <div className="pie-chart">
          <h3>{t("admin_dashboard.managers_per_city")}</h3>
          <PieChart width={250} height={250}>
            <Pie
              data={managersPerCity}
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
              dataKey="value"
            >
              {managersPerCity.map((_, idx) => (
                <Cell
                  key={idx}
                  fill={
                    idx === 0
                      ? "var(--background-color)"
                      : idx === 1
                      ? "var(--secondary-color)"
                      : idx === 2
                      ? "var(--accent-color)"
                      : "var(--hover-color)"
                  }
                />
              ))}
            </Pie>
          </PieChart>
          <ul>
            {managersPerCity.map((item, idx) => (
              <li key={idx}>
                {item.name}: {item.value} {t("admin_dashboard.managers_label")}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
