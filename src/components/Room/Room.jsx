import React from 'react';
import { Row, Col } from 'reactstrap';
import room1 from '../../assets/images/Room_1.jpg';
import room2 from '../../assets/images/Room_2.jpg';

const Room = ({ selectedRoom, onRoomSelect }) => {
  // İki oda örneği; her oda ayrı pricePerNight içeriyor.
  const rooms = [
    {
      id: 'standard',
      name: 'Standard Room',
      image: room1,
      pricePerNight: 50,
      desc: 'A cozy room for up to 2 guests.',
      amenities: [
        { icon: 'ri-ruler-line', text: '30 m²' },
        { icon: 'ri-user-line', text: 'Max 2 people' },
        { icon: 'ri-forbid-line', text: 'Non-smoking' },
        { icon: 'ri-wifi-line', text: 'Free Wi-Fi' },
      ],
    },
    {
      id: 'family',
      name: 'Family Room',
      image: room2,
      pricePerNight: 80,
      desc: 'Spacious option for the whole family.',
      amenities: [
        { icon: 'ri-ruler-line', text: '50 m²' },
        { icon: 'ri-user-line', text: 'Max 4 people' },
        { icon: 'ri-forbid-line', text: 'Non-smoking' },
        { icon: 'ri-wifi-line', text: 'Free Wi-Fi' },
      ],
    },
  ];

  return (
    <Row>
      {rooms.map((room) => {
        const isSelected = selectedRoom === room.id;

        return (
          <Col lg="6" md="6" sm="12" className="mb-4" key={room.id}>
            <div
              className={`room-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onRoomSelect(room.id)}
            >
              <img src={room.image} alt={room.name} className="room-image" />
              <h5 className="room-title">{room.name}</h5>
              {/* Fiyatı her odada gösteriyoruz */}
              <p className="room-price">
                ${room.pricePerNight} <span>/ night</span>
              </p>
              <div className="room-desc-amenities">
                <p className="room-desc">{room.desc}</p>
                <ul className="room__amenities">
                  {room.amenities.map((amenity, idx) => (
                    <li key={idx}>
                      <i className={amenity.icon}></i> {amenity.text}
                    </li>
                  ))}
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