import CsvToExcelForm from "../../../components/CsvToExcelForm";

export const metadata = {
  title: "CSV to Excel",
  description: "Convert CSV files into Excel format.",
};

export default function CsvToExcelPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">CSV to Excel Converter</h1>
      <CsvToExcelForm />
    </div>
  );
}
