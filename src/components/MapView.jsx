import React, { useRef, useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import markerIcon2x  from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon    from 'leaflet/dist/images/marker-icon.png';
import markerShadow  from 'leaflet/dist/images/marker-shadow.png';

import '../styles/hotel.css';

// Leaflet default icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl:       markerIcon,
  shadowUrl:     markerShadow
});

function HoverMarker({ id, position, popup, onNavigate }) {
  const markerRef = useRef(null);
  const [popupOpen, setPopupOpen] = useState(false);

  // Touch cihaz mı?
  const isTouch = useMemo(
    () =>
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0),
    []
  );

  // Desktop hover aç/kapa
  const onMouseOver = () => {
    if (!isTouch && markerRef.current) markerRef.current.openPopup();
  };
  const onMouseOut = () => {
    if (!isTouch && markerRef.current) markerRef.current.closePopup();
  };

  // Click: 
  // • Desktop → onNavigate varsa gezin, yoksa popup aç/kapa
  // • Mobile  → ilk tap aç, ikinci tap gezin
  const onClick = (e) => {
    e.originalEvent.stopPropagation();

    if (isTouch) {
      if (popupOpen) {
        onNavigate?.();
      } else if (markerRef.current) {
        markerRef.current.openPopup();
        setPopupOpen(true);
      }
    } else {
      if (onNavigate) {
        onNavigate();
      } else if (markerRef.current) {
        // TourDetails gibi navigation yoksa click’te de popup aç/kapa olsun
        markerRef.current.openPopup();
      }
    }
  };

  // Mobilde sayfaya tıklayınca popup’ı kapat
  useEffect(() => {
    if (!isTouch) return;
    const handler = () => {
      if (popupOpen && markerRef.current) {
        markerRef.current.closePopup();
        setPopupOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [popupOpen, isTouch]);

  return (
    <Marker
      key={id}
      position={position}
      ref={markerRef}
      eventHandlers={{
        click:    onClick,
        mouseover:onMouseOver,
        mouseout: onMouseOut
      }}
    >
      {popup && (
        <Popup
          className="map-popup-compact-wrapper"
          minWidth={120}
          maxWidth={260}
          closeButton={false}
          autoPan={false}
          keepInView={false}
        >
          <div
            onMouseEnter={() => !isTouch && markerRef.current?.openPopup()}
            onMouseLeave={() => !isTouch && markerRef.current?.closePopup()}
          >
            {popup}
          </div>
        </Popup>
      )}
    </Marker>
  );
}

export default function MapView({ center, zoom = 13, markers = [] }) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map(({ id, position, popup, onClick }) => (
        <HoverMarker
          key={id}
          id={id}
          position={position}
          popup={popup}
          onNavigate={onClick}
        />
      ))}
    </MapContainer>
  );
}
