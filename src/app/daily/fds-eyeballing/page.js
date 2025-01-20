"use client";
import { useState } from "react";
import { saveAs } from "file-saver";
import QueryFormatter from "@/components/QueryFormatter";

export default function FdsEyeballingPage() {
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileUpload = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const processCSV = async () => {
    if (!csvFile) {
      setMessage("Please select a CSV file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvData = event.target.result;

      try {
        const response = await fetch("/api/extract-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ csvData }),
        });

        if (response.ok) {
          const zipBlob = await response.blob();
          saveAs(zipBlob, "images.zip");
          setMessage("Images successfully extracted and zipped.");
        } else {
          const errorData = await response.json();
          setMessage("Error: " + errorData.error);
        }
      } catch (error) {
        setMessage("An error occurred: " + error.message);
      }
    };

    reader.readAsText(csvFile);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">FDS Eyeballing & Query Formatter</h1>
      
      {/* CSV Upload Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Extract Images from CSV</h2>
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileUpload} 
          className="mb-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:border-blue-300"
        />
        <button 
          onClick={processCSV} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Process CSV
        </button>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>

      {/* Query Formatter Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">SQL Query Formatter</h2>
        <QueryFormatter />
      </div>
    </div>
  );
}
