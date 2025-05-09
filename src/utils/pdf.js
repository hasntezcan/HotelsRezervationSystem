// src/utils/pdf.js
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./setupPdfWorker";

export async function createInvoiceBlob() {
  const el = document.getElementById("invoice-root");
  const canvas = await html2canvas(el, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "pt", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  return pdf.output("blob");
}

export async function saveInvoiceAndOpen() {
  const blob = await createInvoiceBlob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("invoicePdfBase64", reader.result);
      window.open("/invoice", "_blank");
      resolve();
    };
    reader.readAsDataURL(blob);
  });
}
