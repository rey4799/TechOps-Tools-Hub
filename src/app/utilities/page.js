// app/utilities/page.js

export const metadata = {
  title: "Utilities",
  description: "List of available utility tools",
};

export default function UtilitiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Utilities</h1>
      <ul className="space-y-6 mt-4">
        <li className="transition-transform transform hover:scale-105 flex items-center space-x-3">
          <i className="fas fa-file-csv text-2xl text-blue-600" />
          <a href="/utilities/csv-to-excel" className="block p-4 bg-blue-100 rounded-lg shadow-md text-lg text-blue-700 hover:bg-blue-200">
            CSV to Excel
          </a>
        </li>
        <li className="transition-transform transform hover:scale-105 flex items-center space-x-3">
          <i className="fas fa-file-archive text-2xl text-green-600" />
          <a href="/utilities/merge-file" className="block p-4 bg-green-100 rounded-lg shadow-md text-lg text-green-700 hover:bg-green-200">
            Merge File (CSV)
          </a>
        </li>
        <li className="transition-transform transform hover:scale-105 flex items-center space-x-3">
          <i className="fas fa-code text-2xl text-yellow-600" />
          <a href="/utilities/multiple-query-generator" className="block p-4 bg-yellow-100 rounded-lg shadow-md text-lg text-yellow-700 hover:bg-yellow-200">
            Multiple Query Generator
          </a>
        </li>
        <li className="transition-transform transform hover:scale-105 flex items-center space-x-3">
          <i className="fas fa-image text-2xl text-red-600" />
          <a href="/utilities/base64-to-image" className="block p-4 bg-red-100 rounded-lg shadow-md text-lg text-red-700 hover:bg-red-200">
            Base64 to Image Preview
          </a>
        </li>
        <li className="transition-transform transform hover:scale-105 flex items-center space-x-3">
          <i className="fas fa-eye text-2xl text-purple-600" />
          <a href="/utilities/json-viewer" className="block p-4 bg-purple-100 rounded-lg shadow-md text-lg text-purple-700 hover:bg-purple-200">
            JSON Viewer
          </a>
        </li>
      </ul>
    </div>
  );
}
