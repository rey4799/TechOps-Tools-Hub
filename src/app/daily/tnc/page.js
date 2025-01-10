"use client";
import React, { useEffect, useState } from 'react';
import { generateTncQuery } from '@/components/tncQueryGenerator';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function TncPage() {
  const [tncProvisioningQuery, setTncProvisioningQuery] = useState('');
  const [tncConsentQuery, setTncConsentQuery] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const { tncProvisioningQuery, tncConsentQuery } = generateTncQuery();
    setTncProvisioningQuery(tncProvisioningQuery);
    setTncConsentQuery(tncConsentQuery);

    // Set current date formatted as DD_MMM_YYYY (e.g. 11_Jan_2025)
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = today.toLocaleString('default', { month: 'short' });
    const year = today.getFullYear();
    setCurrentDate(`${day}_${month}_${year}`);
  }, []);

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        // SweetAlert on success
        Swal.fire({
          icon: 'success',
          title: 'Copied!',
          text: 'Anjay Malas!',
          timer: 1500,
          showConfirmButton: false
        });
      },
      (err) => {
        // SweetAlert on failure
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
      <h1 className="text-2xl font-bold mb-4">TNC Daily Query Generator</h1>

      {/* TNC Provisioning Query Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            TNC Provisioning Query: tnc_provisioning_{currentDate}
          </h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => copyToClipboard(tncProvisioningQuery)}
          >
            Copy to Clipboard
          </button>
        </div>
        <pre className="bg-white p-4 rounded-lg overflow-auto text-sm">
          {tncProvisioningQuery}
        </pre>
      </div>

      {/* TNC Consent Query Section */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            TNC Consent Query: tnc_consent_{currentDate}
          </h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => copyToClipboard(tncConsentQuery)}
          >
            Copy to Clipboard
          </button>
        </div>
        <pre className="bg-white p-4 rounded-lg overflow-auto text-sm">
          {tncConsentQuery}
        </pre>
      </div>
    </div>
  );
}
