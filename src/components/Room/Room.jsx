import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';

const Room = ({ hotelId, selectedRoom, onRoomSelect }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/rooms/hotel/${hotelId}`);
        console.log('Rooms API response:', response.data);
        setRooms(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setRooms([]);
      }
    };

    if (hotelId) {
      fetchRooms();
    }
  }, [hotelId]);

  return (
    <Row>
      {rooms.map((room) => {
        const isSelected = selectedRoom && selectedRoom.id === room.id;
        const primaryImage = room.images?.find(img => img.isPrimary) || room.images?.[0];
        const imageUrl = primaryImage ? primaryImage.imageUrl : 'https://via.placeholder.com/400x300?text=No+Image';

        return (
          <Col lg="6" md="6" sm="12" className="mb-4" key={room.id}>
            <div
              className={`room-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onRoomSelect(room)} // pass entire room object
            >
              <img src={imageUrl} alt={room.name} className="room-image" />
              <h5 className="room-title">{room.name}</h5>
              <p className="room-price">
                ${room.pricePerNight} <span>/ night</span>
              </p>
              <div className="room-desc-amenities">
                <p className="room-desc">{room.description}</p>
                <ul className="room__amenities">
                  <li>
                    <i className="ri-ruler-line"></i> {room.roomSize} m²
                  </li>
                  <li>
                    <i className="ri-user-line"></i> Max {room.capacity} people
                  </li>
                  <li>
                    <i className="ri-hotel-bed-line"></i> {room.bedType}
                  </li>
                  <li>
                    <i className="ri-wifi-line"></i> Free Wi-Fi
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default Room;