import { NextResponse } from "next/server";
import JSZip from "jszip";
import Papa from "papaparse";

// Function to validate base64 string (accept only valid base64 characters)
function isValidBase64(str) {
  try {
    const cleanedStr = str.replace(/[^A-Za-z0-9+/=]/g, ""); // Remove invalid characters
    return cleanedStr.length % 4 === 0 && /^[A-Za-z0-9+/=]+$/.test(cleanedStr);
  } catch (error) {
    return false;
  }
}

export async function POST(req) {
  try {
    const { csvData } = await req.json();
    const zip = new JSZip();
    const folderKTP = zip.folder("KTP");
    const folderFR = zip.folder("FR");

    // Parse CSV using papaparse with appropriate options
    const parsedData = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
      delimiter: ",",     // CSV delimiter
      quoteChar: '"',     // To handle quoted fields
      escapeChar: '"',    // To handle escape characters within fields
    });

    const rows = parsedData.data;
    let validRowCount = 0;

    rows.forEach((row, index) => {
      const ktpImage = row["KTP_IMAGE"]?.trim();
      const frImage = row["ZOLOZ_IMAGE"]?.trim();
      const nik = row["NIK"]?.trim();

      console.log(`Row ${index + 1}: NIK=${nik}, KTP=${ktpImage}, ZOLOZ=${frImage}`);

      // Process KTP Image
      if (ktpImage && isValidBase64(ktpImage)) {
        const cleanedKtpImage = ktpImage.replace(/[^A-Za-z0-9+/=]/g, ""); // Clean up invalid characters
        const ktpFilePath = `${nik}_KTP.jpg`;
        folderKTP.file(ktpFilePath, cleanedKtpImage, { base64: true });
      } else {
        console.log(`Invalid KTP base64 for NIK=${nik}`);
      }

      // Process FR Image
      if (frImage && isValidBase64(frImage)) {
        const cleanedFrImage = frImage.replace(/[^A-Za-z0-9+/=]/g, ""); // Clean up invalid characters
        const frFilePath = `${nik}_FR.jpg`;
        folderFR.file(frFilePath, cleanedFrImage, { base64: true });
      } else {
        console.log(`Invalid ZOLOZ base64 for NIK=${nik}`);
      }

      validRowCount++;
    });

    // Generate the zip and return it as a blob
    const content = await zip.generateAsync({ type: "nodebuffer" });
    return new NextResponse(content, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="images.zip"',
      },
    });
  } catch (err) {
    console.error("Error processing CSV:", err);
    return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
