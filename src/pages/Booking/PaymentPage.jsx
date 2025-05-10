import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaymentName from "./PaymentName";
import PaymentRoom from "./PaymentRoom";
import PaymentCard from "./PaymentCard";
import PaymentPay from "./PaymentPay";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "../../shared/Errors/ToastContext";
import { useTranslation } from "react-i18next";
import "./../../styles/PaymentPage.css";

const PaymentPage = () => {
  useLayoutEffect(() => window.scrollTo(0, 0), []);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { showToast } = useToast();
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [cardName, setCardName] = useState("");
  const [cardSurname, setCardSurname] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");

  const [pendingBooking, setPendingBooking] = useState(null);

  useEffect(() => {
    const storedBooking = localStorage.getItem("pendingBooking");
    const storedUserId = localStorage.getItem("userId");

    if (storedBooking) {
      const parsed = JSON.parse(storedBooking);
      parsed.totalAmount = parseFloat(parsed.totalAmount);
      parsed.userId = storedUserId ? parseInt(storedUserId, 10) : null;
      setPendingBooking(parsed);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const validateForm = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^[0-9]{11}$/;
    const cardRegex = /^[0-9]{13,19}$/;
    const cvcRegex = /^[0-9]{3,4}$/;

    if (!firstName.trim() || !lastName.trim()) {
      showToast(t("payment_page.errors.name_required"), "error");
      return false;
    }
    if (!emailRegex.test(email.trim())) {
      showToast(t("payment_page.errors.email_invalid"), "error");
      return false;
    }
    if (!phoneRegex.test(phone.trim())) {
      showToast(t("payment_page.errors.phone_invalid"), "error");
      return false;
    }
    if (!cardName.trim() || !cardSurname.trim()) {
      showToast(t("payment_page.errors.card_name_required"), "error");
      return false;
    }
    if (!cardRegex.test(cardNumber.replace(/\s/g, ""))) {
      showToast(t("payment_page.errors.card_invalid"), "error");
      return false;
    }
    if (!expiryMonth || !expiryYear) {
      showToast(t("payment_page.errors.expiry_invalid"), "error");
      return false;
    }
    if (!cvcRegex.test(cvc)) {
      showToast(t("payment_page.errors.cvc_invalid"), "error");
      return false;
    }

    return true;
  };

  const handlePaymentClick = async () => {
    if (!pendingBooking || !pendingBooking.userId) {
      showToast(t("payment_page.errors.user_missing"), "error");
      return;
    }

    if (!validateForm()) return;

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      if (!response.ok) throw new Error(t("payment_page.errors.booking_failed"));
      localStorage.removeItem("pendingBooking");
      navigate("/thank-you");
    } catch (error) {
      showToast(error.message || t("payment_page.errors.generic"), "error");
    }
  };

  if (!pendingBooking) {
    return (
      <div className="payment-container">
        <p>{t("payment_page.errors.no_booking")}</p>
      </div>
    );
  }

  return (
    <div className="payment-layout">
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
          {/* Otelin amenities bilgisini gösterebilmek için hotelId prop’u ekledik */}
          <PaymentRoom hotelId={pendingBooking.hotelId} />
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

      <div className="payment-sidebar">
        <PaymentPay
          booking={pendingBooking}
          guestInfo={{ firstName, lastName, email, phone }}
          cardInfo={{ cardName, cardSurname, cardNumber, expiryMonth, expiryYear, cvc }}
          onPaymentClick={handlePaymentClick}
        />
      </div>
    </div>
  );
};

export default PaymentPage;
