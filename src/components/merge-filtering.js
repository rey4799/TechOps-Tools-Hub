"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default function MergeFiltering() {
  const [fileData, setFileData] = useState([]);
  const [inputIds, setInputIds] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Fungsi untuk menangani unggah file CSV
  const handleFileUpload = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    const allData = [];

    if (files.length > 0) {
      fileArray.forEach((file) => {
        Papa.parse(file, {
          complete: function (results) {
            // Normalisasi kolom saat parsing CSV
            const normalizedData = results.data.map((row) => ({
              ...row,
              zolozId: row.zolozId || row.ZOLOZ_TRANSACTION_ID || "", // Gabungkan ZOLOZ_TRANSACTION_ID ke zolozId
            }));

            allData.push(normalizedData);

            if (allData.length === fileArray.length) {
              // Gabung data dari semua file
              const mergedData = mergeData(allData);
              setFileData(mergedData);
            }
          },
          header: true,
        });
      });
    }
  };

  // Fungsi untuk menggabungkan data berdasarkan zolozId
  const mergeData = (dataArray) => {
    const merged = dataArray.flat(); // Menggabungkan data menjadi satu array
    const groupedData = merged.reduce((acc, row) => {
      const zolozId = row.zolozId; // Gunakan kolom zolozId yang sudah digabungkan
      if (!acc[zolozId]) {
        acc[zolozId] = row;
      } else {
        // Gabungkan data jika zolozId sudah ada
        Object.keys(row).forEach((key) => {
          if (!acc[zolozId][key] && row[key]) {
            acc[zolozId][key] = row[key];
          }
        });
      }
      return acc;
    }, {});

    return Object.values(groupedData); // Ubah objek menjadi array
  };

  // Fungsi untuk menangani filter berdasarkan input ID sesuai urutan
  const handleFilter = () => {
    const ids = inputIds.split("\n").map((id) => id.trim());
    const filtered = [];

    // Proses setiap ID dari input sesuai urutan
    ids.forEach((id) => {
      const matchedRow = fileData.find((row) => row.zolozId === id);
      if (matchedRow) {
        filtered.push(matchedRow); // Tambahkan data yang ditemukan sesuai urutan input
      } else {
        // Jika tidak ditemukan, tambahkan baris baru dengan zolozId
        const newRow = { zolozId: id };
        filtered.push(newRow);
      }
    });

    setFilteredData(filtered);
  };

  // Fungsi untuk mengunduh file dalam format Excel
  const downloadExcel = () => {
    // Buat workbook baru
    const wb = XLSX.utils.book_new();

    // Buat worksheet dari data yang sudah difilter
    const ws = XLSX.utils.json_to_sheet(filteredData);

    // Tambahkan worksheet ke workbook
    XLSX.utils.book_append_sheet(wb, ws, "Filtered Data");

    // Simpan file Excel
    const fileName = `FilteredData-${new Date().toISOString()}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Upload CSV Files</h2>
        <input
          type="file"
          accept=".csv"
          multiple
          onChange={handleFileUpload}
          className="block mt-2"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Enter IDs to Filter (one per line)</h2>
        <textarea
          value={inputIds}
          onChange={(e) => setInputIds(e.target.value)}
          rows={6}
          className="w-full p-2 border rounded mt-2"
        />
      </div>

      <button
        onClick={handleFilter}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Filter Data
      </button>

      {filteredData.length > 0 && (
        <button
          onClick={downloadExcel}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Download Filtered Excel
        </button>
      )}
    </div>
  );
}
