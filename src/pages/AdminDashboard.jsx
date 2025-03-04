import React, { useState, useEffect } from "react";
import "../styles/AdminDashboard.css";
import { 
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, 
    BarChart, Bar, PieChart, Pie, Cell 
} from "recharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const stats = [
    { title: "Email Sent", value: "11,361", percentage: "+14%" },
    { title: "Sales Obtained", value: "431,225", percentage: "+21%" },
    { title: "New Clients", value: "32,441", percentage: "+5%" },
    { title: "Traffic Received", value: "1,325,134", percentage: "+43%" },
];

const lineData = [
    { name: "plane", us: 400, france: 240, japan: 100 },
    { name: "helicopter", us: 300, france: 210, japan: 180 },
    { name: "boat", us: 350, france: 260, japan: 150 },
    { name: "train", us: 200, france: 140, japan: 250 },
    { name: "bus", us: 450, france: 290, japan: 320 },
    { name: "car", us: 500, france: 330, japan: 200 },
];

const barData = [
    { name: "AD", donut: 400, fries: 150, kebab: 100 },
    { name: "AE", donut: 300, fries: 120, kebab: 80 },
    { name: "AF", donut: 350, fries: 180, kebab: 120 },
    { name: "AG", donut: 200, fries: 90, kebab: 70 },
    { name: "AL", donut: 450, fries: 220, kebab: 180 },
];

const pieData = [
    { name: "Revenue", value: 70 },
    { name: "Cost", value: 30 },
];

const mailData = [
    { from: "John Doe", email: "john@example.com", subject: "Meeting Request" },
    { from: "Jane Smith", email: "jane@example.com", subject: "Invoice Issue" },
    { from: "Hotel Manager", email: "manager@hotel.com", subject: "Reservation Question" },
];

const AdminDashboard = () => {
    const [date, setDate] = useState(new Date());
    const [weather, setWeather] = useState({ temp: "", condition: "", icon: "" });

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const apiKey = "d8979e0f88b7755b0afbcc390b89b16e"; // API Anahtarınızı ekleyin
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
            {/* Üst Kısımdaki Kartlar */}
            <div className="stats-container">
                {stats.map((stat, index) => (
                    <div className="stat-card" key={index}>
                        <h3>{stat.value}</h3>
                        <p>{stat.title}</p>
                        <span>{stat.percentage}</span>
                    </div>
                ))}
            </div>

            {/* Orta Kısım: Takvim - Mailbox - Hava Durumu */}
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

            {/* Çizgi Grafiği */}
            <div className="chart-container">
                <h3>Revenue Generated</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="us" stroke="#8884d8" />
                        <Line type="monotone" dataKey="france" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="japan" stroke="#ff7300" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Kampanya & Satış Verileri */}
            <div className="bottom-container">
                <div className="pie-chart">
                    <h3>Campaign</h3>
                    <PieChart width={200} height={200}>
                        <Pie data={pieData} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label>
                            {pieData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={index === 0 ? "#00C49F" : "#FF8042"} />
                            ))}
                        </Pie>
                    </PieChart>
                </div>

                <div className="bar-chart">
                    <h3>Sales Quantity</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={barData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="donut" stackId="a" fill="#8884d8" />
                            <Bar dataKey="fries" stackId="a" fill="#82ca9d" />
                            <Bar dataKey="kebab" stackId="a" fill="#ffc658" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
