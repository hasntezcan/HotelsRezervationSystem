import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
//hotels.css
import '../styles/hotel.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

const MapView = ({ center, zoom = 13, markers = [] }) => (
  <MapContainer
    center={center}
    zoom={zoom}
    style={{ height: '400px', width: '100%' }}
  >
    <TileLayer
      attribution='&copy; <a href="https://osm.org/copyright">OSM</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {/** ← İşte burayı düzelttik: markers.map ile dönüyoruz */}
    {markers.map(({ id, position, popup }) => (
      <Marker key={id} position={position}>
        {popup && (
          <Popup className="map-popup-compact-wrapper" minWidth={120} maxWidth={120}>
            {popup}
          </Popup>
        )}
      </Marker>
    ))}
  </MapContainer>
);

export default MapView;
