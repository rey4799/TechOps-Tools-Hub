// app/utilities/page.js

export const metadata = {
    title: "Utilities",
    description: "List of available utility tools",
  };
  
  export default function UtilitiesPage() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold text-gray-800">Utilities</h1>
        <ul className="space-y-4 mt-4">
          <li>
            <a href="/utilities/csv-to-excel" className="text-lg text-blue-600 hover:underline">
              CSV to Excel
            </a>
          </li>
          <li>
            <a href="/utilities/merge-filter" className="text-lg text-blue-600 hover:underline">
              Merge and Filtering Data
            </a>
          </li>
          <li>
            <a href="/utilities/multiple-query-generator" className="text-lg text-blue-600 hover:underline">
              Multiple Query Generator
            </a>
          </li>
          <li>
            <a href="/utilities/base64-to-image" className="text-lg text-blue-600 hover:underline">
              Base64 to Image Preview
            </a>
          </li> 
          <li>
            <a href="/utilities/json-viewer" className="text-lg text-blue-600 hover:underline">
             Json Viewer
            </a>
          </li>
        </ul>
      </div>
    );
  }
  