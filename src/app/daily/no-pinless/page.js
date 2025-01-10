"use client";
import React, { useEffect, useState } from 'react';
import { generateNoPinlessQuery } from '@/components/noPinlessQueryGenerator'; // Import fungsi untuk query
import Swal from 'sweetalert2';

export default function NoPinlessPage() {
  const [noPinUserQuery, setNoPinUserQuery] = useState('');
  const [qrisPinlessQuery, setQrisPinlessQuery] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const { noPinUserQuery, qrisPinlessQuery } = generateNoPinlessQuery();
    setNoPinUserQuery(noPinUserQuery);
    setQrisPinlessQuery(qrisPinlessQuery);
    
    // Format date for display
    const today = new Date();
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${day}/${month}/${year}`;
    };
    
    setFormattedDate(formatDate(today)); // Store the formatted date for use in headings
  }, []);

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Copied!',
          text: 'Mantab Pemalas!',
          timer: 1500,
          showConfirmButton: false,
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to copy the query!',
        });
      }
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">No Pinless Query Generator</h1>

      {/* No Pin User Query Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            No Pin User Query: {`tgl ${formattedDate}`}
          </h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => copyToClipboard(noPinUserQuery)}
          >
            Copy to Clipboard
          </button>
        </div>
        <pre className="bg-white p-4 rounded-lg overflow-auto text-sm">
          {noPinUserQuery}
        </pre>
      </div>

      {/* QRIS Pinless Query Section */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            QRIS Pinless trx Query: {`tgl ${formattedDate}`}
          </h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => copyToClipboard(qrisPinlessQuery)}
          >
            Copy to Clipboard
          </button>
        </div>
        <pre className="bg-white p-4 rounded-lg overflow-auto text-sm">
          {qrisPinlessQuery}
        </pre>
      </div>
    </div>
  );
}
