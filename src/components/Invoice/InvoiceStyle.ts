// src/pages/Booking/InvoiceStyle.ts
import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 24,               // sayfa kenar boşluğu
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF", // fatura kağıdı beyazı
    borderWidth: 1,
    borderColor: "#CCCCCC",     // ince gri sınır
    borderRadius: 8,
    padding: 16,                // içerik boşluğu
    // react-pdf gölge desteği yok ama alt satırda bir trik var:
    // shadow: { offset: [0, 2], blur: 4, color: '#00000020' }
  },
  section: {
    marginBottom: 12,
    // zaten var olan
    margin: 10,
    padding: 10,
  },
});
