import React from "react";
import { useTranslation } from "react-i18next";
import "./../../styles/PaymentRoom.css";

const PaymentRoom = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="PaymentRoom__title">{t("payment_room.step2")}</h2>

      {/* Highlights */}
      <h3 className="PaymentRoom__subtitle">{t("payment_room.highlights")}</h3>
      <ul className="PaymentRoom__grid-list">
        <li className="PaymentRoom__item-box">{t("payment_room.free_parking")}</li>
        <li className="PaymentRoom__item-box">{t("payment_room.free_wifi")}</li>
        <li className="PaymentRoom__item-box">{t("payment_room.pet_friendly")}</li>
        <li className="PaymentRoom__item-box">{t("payment_room.reception")}</li>
      </ul>

      {/* Room Information */}
      <div className="PaymentRoom__room-box">
        <h3 className="PaymentRoom__subtitle">{t("payment_room.luxury_room")}</h3>
        <ul className="PaymentRoom__grid-list">
          <li className="PaymentRoom__item-box">{t("payment_room.breakfast")}</li>
          <li className="PaymentRoom__item-box">{t("payment_room.bed")}</li>
          <li className="PaymentRoom__item-box">{t("payment_room.smoking")}</li>
          <li className="PaymentRoom__item-box">{t("payment_room.room_service")}</li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentRoom;
