"use client";
import React, { useState } from "react";
import axios from "axios";  // Import Axios

export default function MergeFile() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [timestampCheck, setTimestampCheck] = useState(false);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
    setTimestampCheck(false);
  };

  const handleDownload = async () => {
    if (files.length === 0) {
      alert("Please upload CSV files first.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);  // Ensure proper field name
      });

      const response = await axios.post("http://13.229.248.10/merge-csv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",  // Set response type to blob for downloading files
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(response.data);
      link.download = "merged_data.csv";  // Specify filename for download
      link.click();

      setTimestampCheck(true);
    } catch (error) {
      alert("Error occurred while merging files.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-gray-800">Merge CSV Files</h1>

      <div className="mt-4">
        <input
          type="file"
          multiple
          accept=".csv"
          onChange={handleFileChange}
          className="border border-gray-300 rounded p-2"
        />
      </div>

      <button
        onClick={handleDownload}
        disabled={loading || files.length === 0}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
      >
        {loading ? "Merging..." : "Download Merged CSV"}
      </button>

      {!timestampCheck && (
        <p className="mt-4 text-gray-600">
          Pengecekan dan pengurutan berdasarkan kolom "timestamp" belum dilakukan. Harap pastikan file CSV yang diunggah memiliki kolom timestamp yang valid.
        </p>
      )}
    </div>
  );
}
