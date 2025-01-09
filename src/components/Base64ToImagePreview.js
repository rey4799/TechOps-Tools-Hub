"use client";
import { useState } from 'react';

export default function Base64ToImagePreview() {
  const [base64String, setBase64String] = useState('');
  const [previewSrc, setPreviewSrc] = useState('');

  const handleInputChange = (e) => {
    setBase64String(e.target.value);
  };

  const handlePreview = () => {
    if (base64String) {
      setPreviewSrc(base64String);
    } else {
      alert('Please enter a valid Base64 string!');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-md w-full text-center">
        <img
          src="https://images.ctfassets.net/u4vv676b8z52/190emKcedRfHxG8kw9QdVO/1a6baa6ac771fa56267a074168527db8/magnifying-glass-678x446.gif?fm=jpg&q=80" 
          alt="Base64 Icon"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Base64 to Image Converter</h1>
        <p className="text-gray-600 mb-6">kita ubah string tidak jelas ini menjadi gambar</p>
        <textarea
          value={base64String}
          onChange={handleInputChange}
          placeholder="Enter Base64 String"
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
        />
        
        <button
          onClick={handlePreview}
          className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 mb-4"
        >
          Preview Image
        </button>

        {previewSrc && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Image Preview:</h3>
            <img
              src={previewSrc}
              alt="Base64 Preview"
              className="w-full h-auto border-2 border-gray-200 rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
