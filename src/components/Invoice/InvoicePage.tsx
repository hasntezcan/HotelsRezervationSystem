// src/components/Invoice.tsx
import React, { forwardRef } from 'react';

export interface NightlyRate { date: string; price: number; }
export interface Booking {
  id: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  nightlyRates: NightlyRate[];
  taxes: number;
  totalAmount: number;
  quantity?: number;
  authCode?: string;
}
export interface GuestInfo { firstName: string; lastName: string; email: string; phone: string; }
export interface Hotel { name: string; address: string; taxNumber?: string; }
export interface Room { name: string }

export interface InvoiceProps {
  booking: Booking;
  guestInfo: GuestInfo;
  hotel: Hotel;
  room: Room;
}

// forwardRef ile ref’i dışarıya expose ediyoruz
const Invoice = forwardRef<HTMLDivElement, InvoiceProps>(({
  booking,
  guestInfo,
  hotel,
  room
}, ref) => {
  const { id, createdAt, startDate, endDate, nightlyRates, taxes, totalAmount, quantity, authCode } = booking;
  const { firstName, lastName, email, phone } = guestInfo;
  const subtotal = nightlyRates.reduce((sum, r) => sum + r.price, 0);

  return (
    <div
      ref={ref}
      id="invoice-root"
      style={{
        position: 'absolute',
        top: -9999,
        left: -9999,
        width: 600,
        padding: 20,
        background: '#fff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* --- BURAYA EKLEDİK --- */}
      <div style={{ position: 'relative' }}>
        <h1 style={{ textAlign: 'left', marginBottom: '0.5rem',font:"Island Moments" }}>INVOICE</h1>
        {/* Logo & şirket adresi */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          textAlign: 'right',
          lineHeight: 1.2
        }}>
          <img
            src="../../assets/images/logo.png" /* <--- kendi logo yoluna göre güncelle */
            alt="Company Logo"
            style={{ height: 48, marginBottom: 4 }}
          />
          <address style={{ fontStyle: 'normal', fontSize: 12, opacity: 0.8 }}>
            Acme Street 123<br/>
            34 000 Istanbul
          </address>
        </div>
      </div>
      {/* --- BURAYA KADAR EKLENDİ --- */}

      <p><strong>Release Date:</strong> {new Date().toLocaleDateString()}</p>
      <p><strong>Tax Number:</strong> {hotel.taxNumber || '—'}</p>
      <p><strong>To:</strong> {firstName} {lastName}</p>
      <p><strong>Hotel Name:</strong> {hotel.name}</p>
      <p><strong>Hotel Address:</strong> {hotel.address}</p>
      <p><strong>Booked on:</strong> {new Date(createdAt).toLocaleDateString()}</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr>
            <th style={{border:'1px solid #ccc',padding:4}}>Check-in date</th>
            <th style={{border:'1px solid #ccc',padding:4}}>Check-out date</th>
            <th style={{border:'1px solid #ccc',padding:4}}>Price</th>
          </tr>
        </thead>
        <tbody>
          {nightlyRates.map((r,i) => (
            <tr key={i}>
              <td style={{border:'1px solid #ccc',padding:4}}>{r.date}</td>
              <td style={{border:'1px solid #ccc',padding:4}}>
                {nightlyRates[i+1]?.date || endDate}
              </td>
              <td style={{border:'1px solid #ccc',padding:4,textAlign:'right'}}>
                ${r.price.toFixed(2)}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={2} style={{border:'1px solid #ccc',padding:4}}>Subtotal</td>
            <td style={{border:'1px solid #ccc',padding:4,textAlign:'right'}}>
              ${subtotal.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{border:'1px solid #ccc',padding:4}}>Taxes and fees</td>
            <td style={{border:'1px solid #ccc',padding:4,textAlign:'right'}}>
              ${taxes.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{border:'1px solid #ccc',padding:4}}><strong>Room Total</strong></td>
            <td style={{border:'1px solid #ccc',padding:4,textAlign:'right'}}>
              <strong>${totalAmount.toFixed(2)}</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <p>Number of nights: {nightlyRates.length}</p>
      <p>Number of rooms: {quantity || 1}</p>
      <p>Authorization Code: {authCode || id}</p>
    </div>
  );
});

export default Invoice;
