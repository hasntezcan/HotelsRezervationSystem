import React, { useState, useEffect } from "react";
import "../styles/ManagerDashboard.css";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ManagerDashboard = () => {
  const [hotels, setHotels] = useState(120);
  const [reservations, setReservations] = useState({ daily: 45, weekly: 320, monthly: 1300 });
  const [revenue, setRevenue] = useState(25000);
  const [cancellationRate, setCancellationRate] = useState(7);
  const [recentHotels, setRecentHotels] = useState(["Grand Plaza Hotel", "Sunrise Inn", "Luxury Stay"]);
  const [recentReservations, setRecentReservations] = useState([
    { name: "John Doe", room: "202", date: "12/03/2024" },
    { name: "Jane Smith", room: "405", date: "11/03/2024" },
  ]);
  const [weather, setWeather] = useState({ temp: "", condition: "", icon: "" });
  const [date, setDate] = useState(new Date());

  // Gelir-Gider verileri
  const transactions = [
    { date: "03/01", type: "Income", description: "Hotel Commission", amount: 5000 },
    { date: "03/02", type: "Income", description: "Booking Fee", amount: 1200 },
    { date: "03/03", type: "Expense", description: "Platform Maintenance", amount: -800 },
    { date: "03/05", type: "Expense", description: "Marketing Costs", amount: -1500 },
    { date: "03/06", type: "Income", description: "Hotel Partnership", amount: 3000 },
  ];

  // Toplam gelir ve gider hesaplama
  const totalIncome = transactions.filter(t => t.type === "Income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "Expense").reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netProfit = totalIncome - totalExpense;

  useEffect(() => {
    // Hava durumu API çağrısı
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
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Manager Dashboard</h1>

      {/* Kartlar */}
      <div className="dashboard-cards">
        <div className="card">Total Hotels: {hotels}</div>
        <div className="card">Daily Reservations: {reservations.daily}</div>
        <div className="card">Weekly Reservations: {reservations.weekly}</div>
        <div className="card">Monthly Reservations: {reservations.monthly}</div>
        <div className="card">Total Revenue: ${revenue}</div>
        <div className="card">Cancellation Rate: {cancellationRate}%</div>
      </div>

      {/* Takvim ve Hava Durumu */}
      <div className="dashboard-main">
        {/* Takvim */}
        <div className="calendar-widget">
          <h3>Calendar</h3>
          <Calendar onChange={setDate} value={date} />
          <p>Selected Date: {date.toDateString()}</p>
        </div>
      {/* Mailbox Widget */}
<div className="mailbox-widget">
  <h3>Company Mailbox</h3>
  <table>
    <thead>
      <tr>
        <th>From</th>
        <th>Email</th>
        <th>Subject</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>john@example.com</td>
        <td>Meeting Request</td>
        <td><a href="mailto:john@example.com" className="reply-btn">Reply</a></td>
      </tr>
      <tr>
        <td>Jane Smith</td>
        <td>jane@example.com</td>
        <td>Invoice Issue</td>
        <td><a href="mailto:jane@example.com" className="reply-btn">Reply</a></td>
      </tr>
      <tr>
        <td>Hotel Manager</td>
        <td>manager@hotel.com</td>
        <td>Reservation Question</td>
        <td><a href="mailto:manager@hotel.com" className="reply-btn">Reply</a></td>
      </tr>
    </tbody>
  </table>
</div>

        {/* Hava Durumu */}
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

      {/* Son Eklenen Oteller & Rezervasyonlar */}
      <div className="tables-container">
        <div className="recent-hotels">
          <h3>Recently Added Hotels</h3>
          <ul>{recentHotels.map((hotel, index) => (<li key={index}>{hotel}</li>))}</ul>
        </div>

        <div className="recent-reservations">
          <h3>Latest Reservations</h3>
          <ul>{recentReservations.map((res, index) => (<li key={index}>{res.name} - Room {res.room} - {res.date}</li>))}</ul>
        </div>
      </div>

      {/* Gelir Gider Tablosu (Sayfanın En Altına Yerleştirildi) */}
      <div className="income-expense-container">
        <h3>Income & Expense Overview</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Description</th>
              <th>Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <tr key={index} className={t.type === "Income" ? "income" : "expense"}>
                <td>{t.date}</td>
                <td>{t.type}</td>
                <td>{t.description}</td>
                <td>{t.amount > 0 ? `+${t.amount}` : t.amount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3"><strong>Total Income</strong></td>
              <td className="income">+{totalIncome}</td>
            </tr>
            <tr>
              <td colSpan="3"><strong>Total Expense</strong></td>
              <td className="expense">-{totalExpense}</td>
            </tr>
            <tr>
              <td colSpan="3"><strong>Net Profit</strong></td>
              <td className={netProfit >= 0 ? "income" : "expense"}>
                {netProfit >= 0 ? `+${netProfit}` : netProfit}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ManagerDashboard;
