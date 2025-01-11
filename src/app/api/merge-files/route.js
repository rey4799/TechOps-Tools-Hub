import { NextResponse } from "next/server";
import Papa from "papaparse";

// Fungsi untuk menyelaraskan kolom dan mengabaikan header tambahan
const normalizeColumns = (data, headers) => {
  return data.map((row) => {
    const normalizedRow = {};
    headers.forEach((header) => {
      normalizedRow[header] = row[header] || ''; // Jika kolom tidak ada, beri nilai kosong
    });
    return normalizedRow;
  });
};

// Fungsi untuk menggabungkan CSV
const mergeCSVFiles = (files) => {
  const allData = [];
  let headers = [];

  files.forEach((file, index) => {
    const fileContent = file.text();
    const parsedData = Papa.parse(fileContent, { header: true, skipEmptyLines: true });

    // Mengambil header hanya dari file pertama, file berikutnya tidak perlu header
    if (index === 0) {
      headers = parsedData.meta.fields; // Ambil header dari file pertama
    } else {
      parsedData.data.shift(); // Hapus header dari file-file berikutnya
    }

    // Menyelaraskan kolom dengan header standar
    const normalizedData = normalizeColumns(parsedData.data, headers);
    allData.push(...normalizedData); // Gabungkan semua data
  });

  return allData;
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("file"); // Mendapatkan semua file yang diunggah

    if (files.length === 0) {
      return new NextResponse("No files provided", { status: 400 });
    }

    // Menggabungkan CSV yang diunggah
    const mergedData = await Promise.all(
      files.map(async (file) => {
        const fileContent = await file.text();
        return Papa.parse(fileContent, { header: true, skipEmptyLines: true }).data;
      })
    );
    const allData = mergedData.flat(); // Gabungkan semua data

    // Mengonversi data gabungan menjadi CSV
    const csvOutput = Papa.unparse(allData);

    // Mengirimkan file CSV sebagai response
    const buffer = Buffer.from(csvOutput, "utf-8");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=merged_data.csv",
      },
    });
  } catch (error) {
    console.error("Error merging CSV files:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
