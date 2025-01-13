"use client";

import React, { useState } from 'react';

export default function QueryFormatter() {
  const [template, setTemplate] = useState('');
  const [rawData, setRawData] = useState('');
  const [formattedQuery, setFormattedQuery] = useState('');

  const formatQuery = () => {
    if (!template) {
      alert('Please select a query template.');
      return;
    }

    if (!rawData.trim()) {
      alert('Please paste the raw data.');
      return;
    }

    // Split the raw data by whitespace (spaces, tabs, newlines)
    const values = rawData
      .split(/\s+/)
      .map(value => `'${value.trim()}'`)
      .join(', ');

    let queryTemplate = '';
    if (template === 'A') {
      // Query Template A
      queryTemplate = `SELECT NIK,CIF,FIRST_NAME,MIDDLE_NAME,LAST_NAME FROM MAV_PROFILE.PROFILE p WHERE p.CIF IN (${values})`;
    } else if (template === 'B') {
      // Query Template B
      queryTemplate = `
        SELECT t1.KTP_IMAGE, t1.ZOLOZ_IMAGE, t1.NIK
        FROM MAV_PROVISIONING.USER_DOCUMENTUM t1 
        JOIN (
          SELECT NIK, MAX(UPDATED_TIME) AS max_updated_time
          FROM MAV_PROVISIONING.USER_DOCUMENTUM ud2 
          WHERE NIK IN (${values})
          GROUP BY NIK
        ) t2
        ON t1.NIK = t2.NIK AND t1.updated_time = t2.max_updated_time
      `;
    }

    setFormattedQuery(queryTemplate);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">SQL Query Formatter</h1>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700">Select Query Template:</label>
        <div className="flex space-x-4 mt-3">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="A"
              checked={template === 'A'}
              onChange={() => setTemplate('A')}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Get NIK</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="B"
              checked={template === 'B'}
              onChange={() => setTemplate('B')}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Zoloz, FR & KTP Image</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700" htmlFor="rawData">
          Paste values (one row of raw data):
        </label>
        <textarea
          id="rawData"
          rows="5"
          value={rawData}
          onChange={e => setRawData(e.target.value)}
          className="mt-3 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          placeholder="Enter raw values here..."
        ></textarea>
      </div>

      <button
        onClick={formatQuery}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
      >
        Format Query
      </button>

      {formattedQuery && (
        <div className="mt-8">
          <label className="block text-lg font-medium text-gray-700">Formatted SQL Query:</label>
          <div className="mt-3 bg-gray-100 p-4 rounded-lg shadow-inner">
            <pre className="whitespace-pre-wrap text-gray-800">{formattedQuery}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
