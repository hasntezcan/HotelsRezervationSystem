// amenityIconConfig.js
import { 
  FaWifi, 
  FaUtensils, 
  FaSwimmer, 
  FaDumbbell, 
  FaCocktail, 
  FaParking, 
  FaBed, 
  FaHotel, 
  FaSpa, 
  FaSwimmingPool,
  FaSwimmer as FaPool 
} from 'react-icons/fa';
import { 
  MdBeachAccess, 
  MdBusinessCenter, 
  MdOutlineViewInAr, 
  MdPool 
} from 'react-icons/md';
import { GiScubaMask, GiTwoCoins, GiRiver } from 'react-icons/gi'; 
import { FiSunset } from "react-icons/fi"
import { FaHelicopterSymbol, FaHouseFloodWater} from "react-icons/fa6";

export const AMENITY_ICON_MAP = {
  "Free Wi-Fi":         FaWifi,
  "Ücretsiz Wi-Fi":   FaWifi,
  "Breakfast Included":  FaUtensils,
  "Kahvaltı Dahil":   FaUtensils,
  "Swimming Pool":       FaSwimmingPool,
  "Yüzme Havuzu":           FaSwimmingPool,
  "Private Pool":        MdPool,
  "Özel Havuz":         MdPool,
  "Gym":                 FaDumbbell,
  "Spor Salonu":      FaDumbbell,
  "Bar":                 FaCocktail,
  "Beachfront":          FaHouseFloodWater,
  "Deniz Kenarı":       FaHouseFloodWater,
  "Private Beach":       MdBeachAccess,
  "Özel Plaj":        MdBeachAccess,
  "City View":           MdOutlineViewInAr,
  "Şehir Manzarası":     MdOutlineViewInAr,
  "Riverside View":      GiRiver,
  "Nehir Manzarası":      GiRiver,
  "Sunset View":         FiSunset,
  "Gün Batımı Manzarası": FiSunset,
  "Skyline View":        FaBed,
  "Skyline Manzarası":        FaBed,
  "Luxury Suites":       FaHotel,
  "Lüks Süitler":       FaHotel,
  "Restaurant":          FaUtensils,
  "Restoran":          FaUtensils,
  "Free Parking":        FaParking,
  "Ücretsiz Otopark":        FaParking,
  "Business Center":     MdBusinessCenter,
  "İş Merkezi":     MdBusinessCenter,
  "Helipad":            FaHelicopterSymbol,
  "Helikopter Pisti":     FaHelicopterSymbol,
  "Beach View":          MdBeachAccess,
  "Plaj Manzarası":       MdBeachAccess,
  "Luxury Spa":          FaSpa,
  "Lüks Spa":          FaSpa,
  "Massage Therapy":     FaSpa,
  "Masaj Terapisi":     FaSpa,
  "Infinity Pool":       FaPool,
  "Sonsuzluk Havuzu":       FaPool,
  "Scuba Diving":        GiScubaMask,
  "Dalgıçlık":        GiScubaMask,
  "Cocktail Bar":        FaCocktail,
  "Kokteyl Barı":        FaCocktail
};
  
export function getAmenityIcon(name) {
  const IconComponent = AMENITY_ICON_MAP[name] || GiTwoCoins; // fallback
  return <IconComponent size={18} style={{ flexShrink: 0, color: 'var(--accent-color)' }} />;
}
