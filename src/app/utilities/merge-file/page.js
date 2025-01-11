"use client";
import React, { useState } from "react";

export default function MergeFile() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleDownload = async () => {
    if (files.length === 0) {
      alert("Please upload CSV files first.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      // Menambahkan file yang dipilih ke formData
      Array.from(files).forEach((file) => {
        formData.append("file", file);
      });

      const response = await fetch("/api/merge-files", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to merge CSV files");
      }

      // Membaca file CSV yang diunduh
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "merged_data.csv"; // Nama file yang diunduh
      link.click();
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
    </div>
  );
}
