import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Captures an HTML element and saves it as a PDF.
 * @param elementId The ID of the HTML element to capture.
 * @param fileName The name of the PDF file to be saved.
 */
export const generatePagePDF = async (elementId: string, fileName: string = "document.pdf") => {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element with ID '${elementId}' not found.`);
    return;
  }

  try {
    const canvas = await html2canvas(element, { scale: 2 }); // Scale increases quality
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(fileName);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
