import MultipleQueryGenerator from "@/components/MultipleQueryGenerator";

export const metadata = {
  title: "Multiple Query Generator",
  description: "Generate and format data for SQL queries easily",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start mt-4">
      <MultipleQueryGenerator />
    </div>
  );
}