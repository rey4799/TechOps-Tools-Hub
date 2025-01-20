'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';  // Import Axios

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
      const response = await axios.post("http://13.229.248.10/csv-to-excel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",  // Set response type to blob for downloading files
      });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(response.data);
      link.download = selectedFile.name.replace('.csv', '.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      Swal.fire({
        icon: 'success',
        title: 'Wow!',
        text: 'File berhasil dikonversi ke Excel.',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      setError('An error occurred while uploading the file');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred. Please try again later.',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-blue-50 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <img
        src="https://upload.wikimedia.org/wikipedia/id/2/21/Daniel_Radcliffe_di_film_Harry_Potter_and_The_Order_of_Phoenix.jpg"
        alt="CSV to Excel"
        className="w-32 h-32 rounded-full mb-4"
      />
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Convert CSV to Excel</h1>
      <p className="text-gray-600 mb-6 text-center">Upload CSV file anda, maka secara ajaib file akan berubah menjadi Excel spreadsheet.</p>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {isUploading && <p className="text-blue-600">Uploading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isUploading ? 'Converting...' : 'Convert to Excel'}
      </button>

      <div className="mt-6 text-sm text-gray-500">
        <p>Need help? <a href="#" className="text-blue-600 hover:underline">Tanyakan pada Tito</a>.</p>
      </div>
    </div>
  );
}
