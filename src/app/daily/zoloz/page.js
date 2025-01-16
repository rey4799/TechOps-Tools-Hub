import MergeFiltering from "@/components/merge-filtering";

export default function ZolozPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Merge and Filtering Zoloz Data</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-medium text-gray-800 mb-4">How to use:</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Unggah file CSV yang ingin kamu gabungkan, jangan sampai salah ya!</li>
          <li>Masukkan ID yang mau kamu saring (satu ID per baris, jangan bingung).</li>
          <li>Tekan tombol "Filter Data", biar data jadi lebih keren.</li>
          <li>Tekan tombol "Download Filtered Excel" buat download data yang sudah disaring, biar langsung bisa dipakai.</li>
        </ol>
      </div>

      <div className="mb-6">
        <MergeFiltering />
      </div>

      {/* New Text Section */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Query Kibana Zoloz</h3>
        <pre className="text-gray-700 bg-white p-4 rounded-lg overflow-x-auto">
          {`{
  "terms": {
    "zolozId": [
      <DATA_HERE>
    ]
  }
}`}
        </pre>
        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Query DB Zoloz</h3>
        <pre className="text-gray-700 bg-white p-4 rounded-lg overflow-x-auto">
          {`SELECT tu.ZOLOZ_TRANSACTION_ID, tu.NIK, tu.CIF, a.ACCOUNT_NUMBER, tu.SCENARIO, tu.CREATED_TIME 
FROM MAV_PROVISIONING.TEMPORARY_USER tu 
LEFT JOIN MAV_PROFILE.PROFILE p ON tu.nik = p.NIK 
LEFT JOIN MAV_VIEW.ACCOUNT_READ a ON p.CIF = a.CIF 
WHERE tu.ZOLOZ_TRANSACTION_ID IN (
  <DATA_HERE>
)`}
        </pre>
        <h3 className="text-lg font-semibold text-gray-800 mt-6">
          <a
            href="https://elk-kibana01-dc2-mvrk.bni.co.id:5601/app/r/s/fODVq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Kibana Version Wond
          </a>
        </h3>
        <h3 className="text-lg font-semibold text-gray-800 mt-2">
          <a
            href="https://elk-kibana01-dc2-mvrk.bni.co.id:5601/app/r/s/C8G2z"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Depeer Sama Faceattack
          </a>
        </h3>
      </div>

      <div className="p-4 bg-blue-100 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">
          Jika masih gagal atau bingung tanyakan pada Rizki
        </h3>
      </div>
    </div>
  );
}
