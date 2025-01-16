"use client";
import React, { useEffect, useState } from 'react';
import { generateTncQuery } from '@/components/tncQueryGenerator';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function TncPage() {
  const [tncProvisioningQuery, setTncProvisioningQuery] = useState('');
  const [tncConsentQuery, setTncConsentQuery] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [yesterdayDate, setYesterdayDate] = useState(''); // State for yesterday's date

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

    // Set yesterday's date
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayDay = String(yesterday.getDate()).padStart(2, '0');
    const yesterdayMonth = yesterday.toLocaleString('default', { month: 'short' });
    const yesterdayYear = yesterday.getFullYear();
    setYesterdayDate(`${yesterdayDay}_${yesterdayMonth}_${yesterdayYear}`);
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
            TNC Provisioning Query: tnc_provisioning_{yesterdayDate}
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
            TNC Consent Query: tnc_consent_{yesterdayDate}
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
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Sharepoint TNC Report</h3>
    <p>
      For the Sharepoint TNC Report, you can access it through the following link:
      <a
        href="https://bankbnitbk.sharepoint.com/sites/MAVERICK/Shared%20Documents/Forms/AllItems.aspx?csf=1&web=1&e=9oOwOg&CID=dd3aaa58%2D7adb%2D4e90%2Da2c0%2D55a724693afe&FolderCTID=0x01200018B3204F20A001499104FB0B53612AF4&id=%2Fsites%2FMAVERICK%2FShared%20Documents%2FGeneral%2F01%20PMO%2F99%20Others%2FPROVISIONING%20REPORTING%20GTM%2Fterms%20consent"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500"
      >
        Sharepoint TNC Report
      </a>
    </p>
  </div>
    </div>
  );
}
