"use client";
import { useState } from 'react';

export default function JsonViewer() {
  const [jsonInput, setJsonInput] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFormatJson = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const prettyJson = JSON.stringify(parsedJson, null, 2); // Indentasi 2 spasi
      setFormattedJson(prettyJson);
      setError('');
    } catch (e) {
      setError('Invalid JSON format. Please check your input.');
      setFormattedJson('');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredJson = formattedJson
    .split('\n')
    .filter((line) =>
      line.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .join('\n');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6">
      <div className="w-full max-w-6xl p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">JSON Viewer</h1>

        {/* Layout dengan 2 kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kolom Kiri: Input JSON */}
          <div>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste your JSON here"
              className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-gray-700"
            />
            <button
              onClick={handleFormatJson}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 transition duration-300"
            >
              Format JSON
            </button>
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          </div>

          {/* Kolom Kanan: Hasil JSON */}
          <div>
            {formattedJson && (
              <div>
                <input
                  type="text"
                  placeholder="Search in formatted JSON..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                <pre className="bg-gray-100 text-left p-4 rounded-lg overflow-x-auto max-h-[80vh] border border-gray-200 text-gray-700">
                  {filteredJson || formattedJson}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
