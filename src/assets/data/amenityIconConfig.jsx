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
  "Breakfast Included":  FaUtensils,
  "Swimming Pool":       FaSwimmingPool,
  "Private Pool":        MdPool,
  "Gym":                 FaDumbbell,
  "Bar":                 FaCocktail,
  "Beachfront":          FaHouseFloodWater,
  "Private Beach":       MdBeachAccess,
  "City View":           MdOutlineViewInAr,
  "Riverside View":      GiRiver,
  "Sunset View":         FiSunset,
  "Skyline View":        FaBed,
  "Luxury Suites":       FaHotel,
  "Restaurant":          FaUtensils,
  "Free Parking":        FaParking,
  "Business Center":     MdBusinessCenter,
  "Helipad":            FaHelicopterSymbol,
  "Beach View":          MdBeachAccess,
  "Luxury Spa":          FaSpa,
  "Massage Therapy":     FaSpa,
  "Infinity Pool":       FaPool,
  "Scuba Diving":        GiScubaMask,
  "Cocktail Bar":        FaCocktail
};
  
export function getAmenityIcon(name) {
  const IconComponent = AMENITY_ICON_MAP[name] || GiTwoCoins; // fallback
  return <IconComponent size={18} style={{ flexShrink: 0 }} />;
}
