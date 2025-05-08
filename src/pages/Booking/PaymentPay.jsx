import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import defaultPhoto from "../../assets/images/hotelImages.jpg";
import "./../../styles/PaymentPage.css";

const PaymentPay = ({ booking, guestInfo, cardInfo, onPaymentClick }) => {
  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { hotelId, roomId, startDate: checkInDate, endDate: checkOutDate, totalAmount: price } = booking;
  const { firstName, lastName, email, phone } = guestInfo;
  const { cardName, cardSurname, cardNumber, expiryMonth, expiryYear, cvc } = cardInfo;

  useEffect(() => {
    async function fetchData() {
      try {
        const [hotelRes, roomRes] = await Promise.all([
          fetch(`http://localhost:8080/api/hotels/${hotelId}`),
          fetch(`http://localhost:8080/api/rooms/${roomId}`)
        ]);
        if (!hotelRes.ok || !roomRes.ok) {
          throw new Error(`Fetch error: ${hotelRes.status}, ${roomRes.status}`);
        }
        const [hotelData, roomData] = await Promise.all([
          hotelRes.json(),
          roomRes.json()
        ]);
        console.log("Fetched hotel images:", hotelData.images);
        setHotel(hotelData);
        setRoom(roomData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [hotelId, roomId]);

  if (loading) return <div>Loading reservation...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!hotel || !room) return <div>Data not found.</div>;

  // Map image field flexibly: try url, imageUrl, path, src
  const rawImages = Array.isArray(hotel.images) ? hotel.images : [];
  const images = rawImages.length > 0
    ? rawImages.map(img => img.url || img.imageUrl || img.path || img.src || defaultPhoto)
    : [defaultPhoto];

  const handlePrev = () => setCurrentImageIndex(i => (i === 0 ? images.length - 1 : i - 1));
  const handleNext = () => setCurrentImageIndex(i => (i === images.length - 1 ? 0 : i + 1));
  const currentImage = images[currentImageIndex];

  // Validation
  const isCardComplete = cardNumber.replace(/\s/g, "").length === 16;
  const isCvcValid = cvc.length === 3 || cvc.length === 4;
  const isEmailValid = email.includes("@");
  const isFormValid = firstName && lastName && email && isEmailValid && phone && cardName && cardSurname && cardNumber && isCardComplete && expiryMonth && expiryYear && cvc && isCvcValid;

  const findMissing = () => {
    const missing = [];
    if (!firstName) missing.push("First Name");
    if (!lastName) missing.push("Last Name");
    if (!email || !isEmailValid) missing.push("Valid Email");
    if (!phone) missing.push("Phone");
    if (!cardName) missing.push("Card Name");
    if (!cardSurname) missing.push("Card Surname");
    if (!cardNumber || !isCardComplete) missing.push("Card Number (16 digits)");
    if (!expiryMonth) missing.push("Expiry Month");
    if (!expiryYear) missing.push("Expiry Year");
    if (!cvc || !isCvcValid) missing.push("CVC (3 or 4 digits)");
    return missing;
  };

  const generateInvoice = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 20, 20);
    doc.setFontSize(12);
    doc.text(`Guest: ${firstName} ${lastName}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 50);
    doc.text(`Phone: ${phone}`, 20, 60);
    doc.text(`Hotel: ${hotel.name}`, 20, 80);
    doc.text(`Address: ${hotel.address}`, 20, 90);
    doc.text(`Room: ${room.name}`, 20, 100);
    doc.text(`Dates: ${checkInDate} - ${checkOutDate}`, 20, 110);
    doc.text(`Total Price: $${Number(price).toFixed(2)}`, 20, 130);
    doc.save("invoice.pdf");
  };

  const handlePayment = () => {
    if (!isFormValid) {
      alert("Please fill all fields:\n" + findMissing().join("\n"));
      return;
    }
    onPaymentClick();
    generateInvoice();
  };

  return (
    <div className="paymentPay-container">
      <div className="paymentPay-card">
        <div className="paymentPay-carousel">
          <button className="carousel-button prev" onClick={handlePrev}>❮</button>
          <img
            src={currentImage}
            alt={`${hotel.name} image ${currentImageIndex + 1}`}
            className="paymentPay-img"
          />
          <button className="carousel-button next" onClick={handleNext}>❯</button>
        </div>
        <div className="paymentPay-content">
          <h3 className="paymentPay-name">{hotel.name}</h3>
          <p className="paymentPay-address">{hotel.address}</p>
          <div className="paymentPay-summary">
            <p><strong>Dates:</strong> {checkInDate} – {checkOutDate}</p>
            <p><strong>Room:</strong> {room.name}</p>
          </div>
          <div className="paymentPay-price">
            Price: ${Number(price).toFixed(2)}
          </div>
          <button className="myGreenBookNowButton" onClick={handlePayment}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPay;