import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PaymentName from "./PaymentName";
import PaymentRoom from "./PaymentRoom";
import PaymentCard from "./PaymentCard";
import PaymentPay from "./PaymentPay";
import { AuthContext } from "../../context/AuthContext";
import "./../../styles/PaymentPage.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Step 1: User Information (PaymentName)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Step 3: Card Information (PaymentCard)
  const [cardName, setCardName] = useState("");
  const [cardSurname, setCardSurname] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");

  // Load pending booking and inject userId
  const [pendingBooking, setPendingBooking] = useState(null);

  useEffect(() => {
    const storedBooking = localStorage.getItem("pendingBooking");
    const storedUserId = localStorage.getItem("userId");

    if (storedBooking) {
      const parsed = JSON.parse(storedBooking);
      if (storedUserId) {
        parsed.userId = parseInt(storedUserId); // Inject userId into booking payload
      } else {
        console.warn("User ID is missing from localStorage.");
        parsed.userId = null;
      }
      setPendingBooking(parsed);
    }
  }, []);

  // Auto-fill personal details if available
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handlePaymentClick = async () => {
    if (!pendingBooking || !pendingBooking.userId) {
      alert("Cannot proceed without a valid user ID.");
      return;
    }

    const bookingPayload = {
      userId: pendingBooking.userId,
      roomId: pendingBooking.roomId,
      checkInDate: pendingBooking.startDate,
      checkOutDate: pendingBooking.endDate,
      quantity: pendingBooking.quantity || 1,
      numGuests: pendingBooking.numGuests,
      pricePerNight: pendingBooking.pricePerNight,
      totalPrice: pendingBooking.totalAmount,
    };

    try {
      const response = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to complete booking.");
      }

      localStorage.removeItem("pendingBooking");
      navigate("/thank-you");
    } catch (error) {
      alert("Booking failed: " + error.message);
    }
  };

  if (!pendingBooking) {
    return (
      <div className="payment-container">
        <p>
          No booking information found. Please go back and select a room, date
          range, and guest details.
        </p>
      </div>
    );
  }

  return (
    <div className="payment-layout">
      {/* Left Column */}
      <div className="payment-content">
        <div className="payment-box">
          <PaymentName
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
          />
        </div>

        <div className="payment-box">
          <PaymentRoom />
        </div>

        <div className="payment-box">
          <PaymentCard
            cardName={cardName}
            setCardName={setCardName}
            cardSurname={cardSurname}
            setCardSurname={setCardSurname}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            expiryMonth={expiryMonth}
            setExpiryMonth={setExpiryMonth}
            expiryYear={expiryYear}
            setExpiryYear={setExpiryYear}
            cvc={cvc}
            setCvc={setCvc}
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="payment-sidebar">
        <PaymentPay
          hotelName={pendingBooking.hotelName || "Default Hotel Name"}
          photo={pendingBooking.photo}
          address={pendingBooking.address || ""}
          checkInDate={pendingBooking.startDate}
          checkOutDate={pendingBooking.endDate}
          price={pendingBooking.totalAmount}
          firstName={firstName}
          lastName={lastName}
          email={email}
          phone={phone}
          cardName={cardName}
          cardSurname={cardSurname}
          cardNumber={cardNumber}
          expiryMonth={expiryMonth}
          expiryYear={expiryYear}
          cvc={cvc}
          bookingData={pendingBooking}
          onPaymentClick={handlePaymentClick}
        />
      </div>
    </div>
  );
};

export default PaymentPage;
