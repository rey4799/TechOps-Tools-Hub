'use client';

import { useState } from 'react';

export default function CsvToExcelForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/csv-to-excel', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = selectedFile.name.replace('.csv', '.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
        alert('File successfully converted to Excel');
      } else {
        const result = await response.json();
        setError(result.message);
      }
    } catch (error) {
      setError('An error occurred while uploading the file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h1>CSV to Excel Converter</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {isUploading && <p>Uploading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleUpload} disabled={isUploading}>
        Convert to Excel
      </button>
    </div>
  );
}
