import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import "./../../styles/PaymentPage.css";
import defaultPhoto from "../../assets/images/hotelImages.jpg";
import logoSrc from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";

const PaymentPay = ({ booking, guestInfo, cardInfo, onPaymentClick }) => {
  const navigate = useNavigate();
  const invoiceRef = useRef();
  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Promo code & discount logic
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "KHAS10") {
      setDiscount(0.10);
      alert("Promo code applied! 10% discount");
    } else if (code === "KHAS20") {
      setDiscount(0.20);
      alert("Promo code applied! 20% discount");
    } else if (code === "SPECIAL30") {
      setDiscount(0.30);
      alert("Promo code applied! 30% discount");
    } else {
      setDiscount(0);
      alert("Invalid promo code.");
    }
  };

  const {
    hotelId,
    roomId,
    startDate: checkInDate,
    endDate: checkOutDate,
    totalAmount: netPrice,
  } = booking;

  const { firstName, lastName, email, message } = guestInfo;

  useEffect(() => {
    async function fetchData() {
      try {
        const [hRes, rRes] = await Promise.all([
          fetch(`http://localhost:8080/api/hotels/${hotelId}`),
          fetch(`http://localhost:8080/api/rooms/${roomId}`),
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

  // Carousel logic
  const images = Array.isArray(hotel.images) && hotel.images.length > 0
    ? hotel.images.map(img => img.url || img.imageUrl || defaultPhoto)
    : [defaultPhoto];
  const handlePrev = () =>
    setCurrentImageIndex(i => (i === 0 ? images.length - 1 : i - 1));
  const handleNext = () =>
    setCurrentImageIndex(i => (i === images.length - 1 ? 0 : i + 1));
  const currentImage = images[currentImageIndex];

  // Date & pricing calculations
  const inDate = new Date(checkInDate);
  const outDate = new Date(checkOutDate);
  const msPerDay = 1000 * 60 * 60 * 24;
  const nights = Math.ceil((outDate - inDate) / msPerDay) || 0;

  // Apply discount before tax
  const discountedNet = +(netPrice * (1 - discount)).toFixed(2);
  const taxRate = 0.10;
  const taxAmount = +(discountedNet * taxRate).toFixed(2);
  const total = +(discountedNet + taxAmount).toFixed(2);

  const handlePayment = async () => {
  // 1) Call your payment handler
  await onPaymentClick(discountedNet);

  // 2) Render invoice DOM to canvas
  const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
  const img = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "pt", "a4");
  const w = pdf.internal.pageSize.getWidth();
  const h = (canvas.height * w) / canvas.width;
  pdf.addImage(img, "PNG", 0, 0, w, h);

  // 3) Extract PDF blob
  const pdfBlob = pdf.output("blob");

  // 4) Prepare FormData and send to backend
  const formData = new FormData();
  formData.append("file", pdfBlob, "invoice.pdf");
  formData.append("email", email);
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("message", message || "");  // ← BU SATIRI EKLEDIK

  try {
    await fetch("http://localhost:8080/api/email/send-invoice", {
      method: "POST",
      body: formData,
    });
    alert("Faturanız e-posta adresinize gönderildi.");
  } catch (e) {
    console.error("E-posta gönderilemedi:", e);
    alert("Fatura gönderiminde hata oluştu.");
  }

  // 5) Optionally preview PDF
  window.open(URL.createObjectURL(pdfBlob), "_blank");
};


  return (
    <>
      <div className="paymentPay-container">
        <div className="paymentPay-card">
          {images.length > 0 && (
            <div className="paymentPay-carousel">
              <button className="carousel-button prev" onClick={handlePrev}>❮</button>
              <img
                src={currentImage}
                alt={`${hotel.name} image`}
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

            <div className="paymentPay-promo">
              <input
                type="text"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handleApplyPromo}>Apply</button>
            </div>

            <div className="paymentPay-summary">
              <p><strong>Net Price:</strong> ${discountedNet.toFixed(2)}</p>
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

      {/* Hidden Invoice Template */}
      <div
        ref={invoiceRef}
        style={{ position: "absolute", top: -9999, left: -9999, width: 600, padding: 24, background: "#fff", fontFamily: "Arial, sans-serif" }}
      >
        <div style={{ position: "relative", marginBottom: 16 }}>
          <h1 style={{ margin: 0, fontSize: 34 }}>INVOICE</h1>
          <img
            src={logoSrc}
            alt="Logo"
            style={{ position: "absolute", top: 0, right: 0, height: 100 }}
          />
          <address style={{ position: "absolute", top: 90, right: 0, fontSize: 12, opacity: 0.8, textAlign: "right" }}>
            Cibali, Kadir Has Cd.<br />34083 Cibali, İstanbul
          </address>
        </div>
        <div style={{ marginBottom: 16, marginTop: 100 }}>
          <p><strong>Invoice Date:</strong> {new Date().toLocaleDateString()}</p>
          <p><strong>Tax Number:</strong> 12345678901</p>
          <p><strong>To:</strong> {firstName} {lastName}</p>
          <p><strong>Hotel Name:</strong> {hotel.name}</p>
          <p><strong>Check-in:</strong> {checkInDate}</p>
          <p><strong>Check-out:</strong> {checkOutDate}</p>
          <p><strong>Nights:</strong> {nights}</p>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: 8, background: "#f7f7f7" }}>Description</th>
              <th style={{ border: "1px solid #ccc", padding: 8, textAlign: "right", background: "#f7f7f7" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>
                Room charge ({nights} nights × ${(discountedNet / (nights || 1)).toFixed(2)})
              </td>
              <td style={{ border: "1px solid #ccc", padding: 8, textAlign: "right" }}>${discountedNet.toFixed(2)}</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: 8 }}>Tax (10%)</td>
              <td style={{ border: "1px solid #ccc", padding: 8, textAlign: "right" }}>${taxAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: 8, fontWeight: "bold", background: "#f0f4f8" }}>Total</td>
              <td style={{ border: "1px solid #ccc", padding: 8, textAlign: "right", fontWeight: "bold", background: "#f0f4f8" }}>${total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PaymentPay;
