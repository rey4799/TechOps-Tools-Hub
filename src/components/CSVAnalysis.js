"use client";

import { useState } from 'react';

export default function CSVAnalysis() {
  const [csvFile, setCsvFile] = useState(null);
  const [bankCodeFile, setBankCodeFile] = useState(null);

  // Handle CSV file selection
  const handleCsvFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  // Handle bank code file selection
  const handleBankCodeFileChange = (e) => {
    setBankCodeFile(e.target.files[0]);
  };

  // Handle file upload and request to the server
  const handleFileUpload = async () => {
    if (!csvFile || !bankCodeFile) {
      alert('Please select both CSV and bank code files');
      return;
    }

    // Prepare form data to send the files
    const formData = new FormData();
    formData.append('csvFile', csvFile);
    formData.append('bankCodeFile', bankCodeFile);

    try {
      // Send POST request to the server with the files
      const response = await fetch('/api/daily-recap', {
        method: 'POST',
        body: formData,
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error('Error generating the report');
      }

      // Convert the response to a blob (Excel file)
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'daily-recap.xlsx'; // Specify the file name for download
      link.click();
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error while processing your request.');
    }
  };

  return (
    <div>
      <h1>CSV to Excel with Bank Code Analysis</h1>
      <div>
        <label>
          Select CSV file:
          <input type="file" accept=".csv" onChange={handleCsvFileChange} />
        </label>
      </div>
      <div>
        <label>
          Select Bank Code file (Excel):
          <input type="file" accept=".xlsx" onChange={handleBankCodeFileChange} />
        </label>
      </div>
      <button onClick={handleFileUpload}>Convert to Excel</button>
    </div>
  );
}
