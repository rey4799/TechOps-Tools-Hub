"use client";
import { useState } from "react";

export default function JsonViewer() {
  // Nilai default JSON sample dari desain HTML
  const defaultJson = `{
  "guru": [
    {
      "namaDepan": "Rohma",
      "namaBelakang": "Melati"
    },
    {
      "namaDepan": "Sinta",
      "namaBelakang": "Azzahra"
    },
    {
      "namaDepan": "Dodi",
      "namaBelakang": "Kurniawan"
    }
  ]
}`;
  const [jsonInput, setJsonInput] = useState(defaultJson);
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi untuk memformat JSON
  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const pretty = JSON.stringify(parsed, null, 2);
      setFormattedJson(pretty);
      setError("");
    } catch (e) {
      setError("Invalid JSON format. Please check your input.");
      setFormattedJson("");
    }
  };

  // Mengupdate pencarian di output
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Jika ada pencarian, filter baris JSON yang mengandung query
  const filteredJson = formattedJson
    ? formattedJson
        .split("\n")
        .filter((line) =>
          line.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .join("\n")
    : "";

  return (
    <>
      {/* Pastikan Tailwind dan FontAwesome sudah di-include di _app.js atau di head */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">JSON Viewer</h1>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Panel Kiri: Input JSON */}
          <div className="flex-1 bg-white border rounded shadow p-4">
            {/* Header dengan tombol ikon */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <button className="text-gray-500" title="File">
                  <i className="fas fa-file"></i>
                </button>
                <button className="text-gray-500" title="Folder Open">
                  <i className="fas fa-folder-open"></i>
                </button>
                <button className="text-gray-500" title="Save">
                  <i className="fas fa-save"></i>
                </button>
                <button className="text-gray-500" title="Undo">
                  <i className="fas fa-undo"></i>
                </button>
                <button className="text-gray-500" title="Redo">
                  <i className="fas fa-redo"></i>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-gray-500" title="Settings">
                  <i className="fas fa-cog"></i>
                </button>
              </div>
            </div>
            {/* Textarea untuk input JSON */}
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              spellCheck="false"
              className="w-full h-[800px] border p-2 rounded"
            />
            {/* Tombol Format JSON */}
            <button
              onClick={handleFormatJson}
              className="w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Format JSON
            </button>
            {error && (
              <p className="text-red-600 text-center mt-2">{error}</p>
            )}
          </div>
          {/* Panel Kanan: Output JSON */}
          <div className="flex-1 bg-white border rounded shadow p-4">
            {/* Header dengan tombol ikon */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <button className="text-gray-500" title="File">
                  <i className="fas fa-file"></i>
                </button>
                <button className="text-gray-500" title="Folder Open">
                  <i className="fas fa-folder-open"></i>
                </button>
                <button className="text-gray-500" title="Save">
                  <i className="fas fa-save"></i>
                </button>
                <button className="text-gray-500" title="Undo">
                  <i className="fas fa-undo"></i>
                </button>
                <button className="text-gray-500" title="Redo">
                  <i className="fas fa-redo"></i>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-gray-500" title="Settings">
                  <i className="fas fa-cog"></i>
                </button>
              </div>
            </div>
            {/* Search input untuk output JSON */}
            {formattedJson && (
              <input
                type="text"
                placeholder="Search in formatted JSON..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-2 border rounded mb-2"
              />
            )}
            {/* Tampilan output JSON */}
            <div className="bg-gray-100 border p-2 h-[800px] overflow-auto">
              <pre className="text-sm">
                {formattedJson
                  ? filteredJson || formattedJson
                  : "Formatted JSON will appear here."}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
