import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../shared/search-bar.css";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [people, setPeople] = useState(1);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!city || !people || !startDate || !endDate) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    // Arama kriterlerini URL'ye parametre olarak ekleyerek yönlendirme yapıyoruz
    navigate(`/search-results?city=${city}&startDate=${startDate?.toISOString()}&endDate=${endDate?.toISOString()}&people=${people}`);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Şehir Seçin"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()}
        placeholderText="Başlangıç Tarihi"
        className="date-picker"
      />

      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate || new Date()}
        placeholderText="Bitiş Tarihi"
        className="date-picker"
      />

      <input
        type="number"
        placeholder="Kişi Sayısı"
        value={people}
        onChange={(e) => setPeople(e.target.value)}
        min="1"
      />

      <button onClick={handleSearch}>Ara</button>
    </div>
  );
};

export default SearchBar;
