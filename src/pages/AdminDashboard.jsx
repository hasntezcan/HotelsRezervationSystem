import React, { useState, useEffect } from "react";
import "../styles/AdminDashboard.css";
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

// Örnek veriler
const stats = [
    { title: "Total Hotels", value: "11,361" },
    { title: "Total Rooms", value: "431,225"},
    { title: "Managers", value: "32,441"},
    { title: "Gain", value: "1,325,134" },
];

const reservationData = [
    { name: "January", Paris: 300, Bali: 200, Tokyo: 400, London: 350 },
    { name: "February", Paris: 250, Bali: 180, Tokyo: 420, London: 370 },
    { name: "March", Paris: 280, Bali: 210, Tokyo: 450, London: 400 },
    { name: "April", Paris: 300, Bali: 230, Tokyo: 470, London: 420 },
    { name: "May", Paris: 320, Bali: 250, Tokyo: 500, London: 450 },
    { name: "June", Paris: 350, Bali: 280, Tokyo: 530, London: 480 },
    { name: "July", Paris: 400, Bali: 300, Tokyo: 550, London: 500 },
    { name: "August", Paris: 420, Bali: 310, Tokyo: 570, London: 520 },
    { name: "September", Paris: 390, Bali: 290, Tokyo: 540, London: 500 },
    { name: "October", Paris: 370, Bali: 270, Tokyo: 520, London: 480 },
    { name: "November", Paris: 340, Bali: 250, Tokyo: 490, London: 450 },
    { name: "December", Paris: 310, Bali: 220, Tokyo: 460, London: 420 },
];

const managerData = [
    { name: "Paris", value: 120 },
    { name: "Bali", value: 95 },
    { name: "Tokyo", value: 100 },
    { name: "London", value: 110 },
];

const mailData = [
    { from: "John Doe", email: "john@example.com", subject: "Meeting Request" },
    { from: "Jane Smith", email: "jane@example.com", subject: "Invoice Issue" },
    { from: "Hotel Manager", email: "manager@hotel.com", subject: "Reservation Question" },
];

const profitLossData = [
    { name: "January", revenue: 50000, tax: -10000, hotelShare: -20000 },
    { name: "February", revenue: 52000, tax: -11000, hotelShare: -21000 },
    { name: "March", revenue: 53000, tax: -10500, hotelShare: -22000 },
    { name: "April", revenue: 55000, tax: -12000, hotelShare: -23000 },
    { name: "May", revenue: 60000, tax: -12500, hotelShare: -25000 },
];

const AdminDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [weather, setWeather] = useState({ temp: "", condition: "", icon: "" });
  
  // Ekran genişliğini takip eden state
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Hava durumu verisini çek
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

    // Ekran boyutu değiştikçe isMobile güncelle
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // İçinde bulunduğumuz ay index'i (Ocak=0, Şubat=1 vs.)
  const currentMonthIndex = new Date().getMonth();
  // Mobilde sadece ayın index'i kadar veriyi slice ile alıyoruz
  const displayedData = isMobile
    ? reservationData.slice(0, currentMonthIndex + 1)
    : reservationData;

  return (
    <div className="dashboard-container">
      <h1 clasName="baslik">Admin Dashboard</h1>
      {/* Üst Kısımdaki Kartlar */}
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <h3>{stat.value}</h3>
            <p>{stat.title}</p>
            {/* isterseniz stat.percentage ekleyebilirsiniz */}
          </div>
        ))}
      </div>

      {/* Takvim - Mailbox - Hava Durumu */}
      <div className="middle-container">
        <div className="calendar-widget">
          <h3>Calendar</h3>
          <Calendar onChange={setDate} value={date} />
          <p>Selected Date: {date.toDateString()}</p>
        </div>

        <div className="mailbox-widget">
          <h3>Company Mailbox</h3>
          <table>
            <thead>
              <tr>
                <th>From</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Read</th>
              </tr>
            </thead>
            <tbody>
              {mailData.map((mail, index) => (
                <tr key={index}>
                  <td>{mail.from}</td>
                  <td>{mail.email}</td>
                  <td>{mail.subject}</td>
                  <td>
                    <button className="reply-btn">Read</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="weather-widget">
          <h3>Today's Weather (Istanbul)</h3>
          {weather.temp ? (
            <>
              <img src={weather.icon} alt="Weather Icon" />
              <p>{weather.temp}°C - {weather.condition}</p>
            </>
          ) : (
            <p>Loading weather...</p>
          )}
        </div>
      </div>

      {/* Aylık Rezervasyon Sayıları (White text & Mobil kısıtlama) */}
      <div className="chart-container">
        <h3>Monthly Reservations by City</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={displayedData}>
            {/* Grid çizgileri gri veya daha koyu bir renk: */}
            <CartesianGrid stroke="#555" strokeDasharray="3 3" />
            {/* X ve Y eksenleri, tick (yazılar) beyaz */}
            <XAxis dataKey="name" stroke="#fff" tick={{ fill: "#fff" }} />
            <YAxis stroke="#fff" tick={{ fill: "#fff" }} />
            {/* Tooltip arka plan ve metin rengi */}
            <Tooltip
              contentStyle={{ backgroundColor: "#222", borderColor: "#222" }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
            />
            {/* Legend (isteğe bağlı) */}
            <Legend wrapperStyle={{ color: "#fff" }} />
            {/* Çizgiler farklı renklerde kalabilir */}
            <Line type="monotone" dataKey="Paris" stroke="#8884d8" />
            <Line type="monotone" dataKey="Bali" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Tokyo" stroke="#ff7300" />
            <Line type="monotone" dataKey="London" stroke="#d62728" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Alt Kısım: Pie Chart & Bar Chart */}
      <div className="bottom-container">
        <div className="pie-chart">
          <h3>Managers Per City</h3>
          <PieChart width={250} height={250}>
            <Pie data={managerData} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label>
              {managerData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index === 0 ? "var(--background-color)" :
                    index === 1 ? "var(--secondary-color)" :
                    index === 2 ? "var(--accent-color)" :
                    "var(--hover-color)"
                  }
                />
              ))}
            </Pie>
          </PieChart>
          <ul>
            {managerData.map((city, index) => (
              <li key={index}>{city.name}: {city.value} Managers</li>
            ))}
          </ul>
        </div>

        <div className="bar-chart">
          <h3>Profit & Loss</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={profitLossData}>
              <XAxis dataKey="name" stroke="#fff" tick={{ fill: "#fff" }} />
              <YAxis stroke="#fff" tick={{ fill: "#fff" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#222", borderColor: "#222" }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend wrapperStyle={{ color: "#fff" }} />
              <Bar dataKey="revenue" fill="#00C49F" />
              <Bar dataKey="tax" fill="red" />
              <Bar dataKey="hotelShare" fill="orange" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
