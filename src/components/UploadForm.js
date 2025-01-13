'use client';
import { useState } from 'react';

const UploadForm = () => {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFiles(e.target.files); // Update the state with the selected files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]); // Append each file to FormData
    }

    try {
      const response = await fetch('/api/process-gtm-report', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.blob(); // Receive the merged CSV as a blob
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'merged_data.csv'; // Trigger download of merged data
        link.click();
      } else {
        setError('Failed to process files');
      }
    } catch (err) {
      setError('An error occurred while processing the files');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <h1>Upload GTM Report Files</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          accept=".csv"
          multiple
          onChange={handleFileChange}
        />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Submit'}
        </button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {result && (
        <div>
          <h2>Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
