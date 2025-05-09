// src/pages/Booking/PaymentPay.jsx
import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import "./../../styles/PaymentPage.css";
import defaultPhoto from "../../assets/images/hotelImages.jpg";
import logoSrc from "../../assets/images/logo.png"; // ← Logo’yu buradan import et
import { useTranslation } from "react-i18next";


const PaymentPay = ({ booking, guestInfo, cardInfo, onPaymentClick }) => {
  const navigate = useNavigate();
  const invoiceRef = useRef();

  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    hotelId,
    roomId,
    id: invoiceNo,
    startDate: checkInDate,
    endDate: checkOutDate,
    totalAmount: netPrice // net price (before tax)
  } = booking;

  const { firstName, lastName, email, phone } = guestInfo;

  useEffect(() => {
    async function fetchData() {
      try {
        const [hRes, rRes] = await Promise.all([
          fetch(`http://localhost:8080/api/hotels/${hotelId}`),
          fetch(`http://localhost:8080/api/rooms/${roomId}`)
        ]);
        if (!hRes.ok || !rRes.ok) throw new Error("Fetch error");
        const [hData, rData] = await Promise.all([hRes.json(), rRes.json()]);
        setHotel(hData);
        setRoom(rData);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [hotelId, roomId]);

  if (loading) return <div>Loading reservation...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!hotel || !room) return <div>Data not found.</div>;

  // carousel için eski, çalışan mantık
  const rawImages = Array.isArray(hotel.images) ? hotel.images : [];
  const images = rawImages.length > 0
    ? rawImages.map(img => img.url || img.imageUrl || img.path || img.src || defaultPhoto)
    : [defaultPhoto];

  const handlePrev = () =>
    setCurrentImageIndex(i => (i === 0 ? images.length - 1 : i - 1));
  const handleNext = () =>
    setCurrentImageIndex(i => (i === images.length - 1 ? 0 : i + 1));
  const currentImage = images[currentImageIndex];

  // calculate nights
  const inDate = new Date(checkInDate);
  const outDate = new Date(checkOutDate);
  const msPerDay = 1000 * 60 * 60 * 24;
  const nights = Math.ceil((outDate - inDate) / msPerDay) || 0;

  // pricing
  const subtotal = netPrice;
  const taxRate = 0.10;
  const taxAmount = +(subtotal * taxRate).toFixed(2);
  const total = +(subtotal + taxAmount).toFixed(2);

  const handlePayment = async () => {
    await onPaymentClick();
    const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(img, "PNG", 0, 0, w, h);
    window.open(URL.createObjectURL(pdf.output("blob")), "_blank");
  };

  return (
    <>
      {/* User‐facing booking card */}
      <div className="paymentPay-container">
        <div className="paymentPay-card">
          {images.length > 0 && (
            <div className="paymentPay-carousel">
              <button className="carousel-button prev" onClick={handlePrev}>❮</button>
              <img
                src={currentImage}
                alt={`${hotel.name} image ${currentImageIndex + 1}`}
                className="paymentPay-img"
              />
              <button className="carousel-button next" onClick={handleNext}>❯</button>
            </div>
          )}
          <div className="paymentPay-content">
            <h3>{hotel.name}</h3>
            <p>{hotel.address}</p>
            <p><strong>Check-in:</strong> {checkInDate}</p>
            <p><strong>Check-out:</strong> {checkOutDate}</p>
            <p><strong>Nights:</strong> {nights}</p>
            <div className="paymentPay-summary">
              <p><strong>Net Price:</strong> ${netPrice.toFixed(2)}</p>
              <p><strong>Tax (10%):</strong> ${taxAmount.toFixed(2)}</p>
            </div>
            <div className="paymentPay-price">
              <strong>Total:</strong> ${total.toFixed(2)}
            </div>
            <button className="myGreenBookNowButton" onClick={handlePayment}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Invisible invoice template */}
      <div
        ref={invoiceRef}
        style={{
          position: "absolute",
          top: -9999,
          left: -9999,
          width: 600,
          padding: 24,
          paddingTop: 60,
          background: "#fff",
          fontFamily: "Arial, sans-serif"
        }}
      >
        {/* Logo ve başlık */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <h1 style={{ margin: 0, fontSize: 34, textAlign: "left", }}>INVOICE</h1>
          <img
            src={logoSrc}            
            alt="Logo"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              height: 100,
              marginBottom: 4
            }}
          />
          <address style={{
            position: "absolute",
            top: 90,
            right: 0,
            fontStyle: "normal",
            fontSize: 12,
            opacity: 0.8,
            textAlign: "right"
          }}>
            Cibali, Kadir Has Cd.<br/>
            34083 Cibali, İstanbul
          </address>
        </div>

        {/* Fatura meta verileri */}
        <div style={{ marginBottom: 16,marginTop: "100px" }}>
          <p style={{ margin: "4px 0" }}><strong>Invoice Date:</strong> {new Date().toLocaleDateString()}</p>
          <p style={{ margin: "4px 0" }}><strong>Tax Number:</strong> 12345678901</p>
          <p style={{ margin: "4px 0" }}><strong>To:</strong> {firstName} {lastName}</p>
          <p style={{ margin: "4px 0" }}><strong>Hotel Name:</strong> {hotel.name}</p>
          <p style={{ margin: "4px 0" }}><strong>Hotel Address:</strong> {hotel.address}</p>
          <p style={{ margin: "4px 0" }}><strong>Check-in date:</strong> {checkInDate}</p>
          <p style={{ margin: "4px 0" }}><strong>Check-out date:</strong> {checkOutDate}</p>
          <p style={{ margin: "4px 0" }}><strong>Number of nights:</strong> {nights}</p>
        </div>

        {/* Fatura tablosu */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: 8, background: "#f7f7f7" }}>
                Description
              </th>
              <th style={{ border: "1px solid #ccc", padding: 8, textAlign: "right", background: "#f7f7f7" }}>
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>
                Room charge ({nights} nights × ${(netPrice/(nights||1)).toFixed(2)})
              </td>
              <td style={{ border: "1px solid #ccc", padding: 8, textAlign: "right" }}>
                ${subtotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>Tax (10%)</td>
              <td style={{ border: "1px solid #ccc", padding: 8, textAlign: "right" }}>
                ${taxAmount.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: 8, fontWeight: "bold", background: "#f0f4f8" }}>
                Total
              </td>
              <td style={{ border: "1px solid #ccc", padding: 8, textAlign: "right", fontWeight: "bold", background: "#f0f4f8" }}>
                ${total.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PaymentPay;
