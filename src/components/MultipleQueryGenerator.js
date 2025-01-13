'use client';

import { useState } from 'react';
import Swal from 'sweetalert2'; // Impor SweetAlert2

export default function MultipleQueryGenerator() {
  const [dataInput, setDataInput] = useState('');
  const [separatorInput, setSeparatorInput] = useState(',');
  const [colonInput, setColonInput] = useState("'");
  const [queryInput, setQueryInput] = useState('');
  const [formattedData, setFormattedData] = useState('');
  const [finalQuery, setFinalQuery] = useState('');

  const formatAndCopy = () => {
    if (!dataInput) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Kocak dong, data nya mana iya?',
        confirmButtonText: 'OK',
      });
      return;
    }

    const lines = dataInput
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line);

    const formatted = lines
      .map((line) => `${colonInput}${line}${colonInput}`)
      .join(separatorInput);

    const finalQueryText = queryInput.replace('<DATA_HERE>', formatted);
    setFormattedData(formatted);
    setFinalQuery(finalQueryText);

    Swal.fire({
      icon: 'success',
      title: 'Mantab!',
      text: 'Sabi betul',
      confirmButtonText: 'OK',
    });
  };

  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text.replace(/\r?\n|\r/g, '')).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Copied!',
        text: message,
        confirmButtonText: 'OK',
      });
    });
  };

  return (
    // <div className="max-w-4xl mx-auto px-4 py-6">    
    <div className="flex flex-col items-center bg-blue-50 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-4">
      <img
        src="https://media.licdn.com/dms/image/v2/D5612AQFopquLe3AA1g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1705671472203?e=2147483647&v=beta&t=vCfQ4nhFM_a-p1hNyhqFWC3yhcgWk0Muywwz4ldITuo"
        alt="Query Generator"
        className="w-32 h-42 "
      />
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Multiple Query Generator</h1>
      <p className="text-gray-600 mb-6 text-center">yuk dibantu Generate dan format data lebih mudah</p>

      <textarea
        className="mb-4 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="5"
        placeholder="Enter your data (each item on a new line)"
        value={dataInput}
        onChange={(e) => setDataInput(e.target.value)}
      ></textarea>

      <input
        className="mb-4 p-2 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Enter Separator (e.g., ',')"
        value={separatorInput}
        onChange={(e) => setSeparatorInput(e.target.value)}
      />

      <input
        className="mb-4 p-2 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Enter Colon (e.g., `')"
        value={colonInput}
        onChange={(e) => setColonInput(e.target.value)}
      />

      <textarea
        className="mb-4 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        placeholder="Enter query (e.g., 'select * from coba where nik in (<DATA_HERE>)')"
        value={queryInput}
        onChange={(e) => setQueryInput(e.target.value)}
      ></textarea>

      <button
        onClick={formatAndCopy}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
      >
        Generate
      </button>

      <div className="w-full mt-6">
        <h3 className="text-lg font-medium">Formatted Data:</h3>
        <input
          className="p-2 border-2 border-gray-300 rounded-lg w-full mt-2"
          type="text"
          readOnly
          value={formattedData}
        />
        <button
          onClick={() => copyToClipboard(formattedData, 'Formatted data copied to clipboard!')}
          className="bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-600 mt-2"
        >
          Copy Formatted Data
        </button>
      </div>

      <div className="w-full mt-6">
        <h3 className="text-lg font-medium">Final Query:</h3>
        <input
          className="p-2 border-2 border-gray-300 rounded-lg w-full mt-2"
          type="text"
          readOnly
          value={finalQuery}
        />
        <button
          onClick={() => copyToClipboard(finalQuery, 'Query copied to clipboard!')}
          className="bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-600 mt-2"
        >
          Copy Query
        </button>
      </div>
    </div>
  );
}
