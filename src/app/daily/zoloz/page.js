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

      <div className="p-4 bg-blue-100 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">
          Jika masih gagal atau bingung tanyakan pada Rizki
        </h3>
      </div>
    </div>
  );
}