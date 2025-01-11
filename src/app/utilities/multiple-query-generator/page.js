import MultipleQueryGenerator from "@/components/MultipleQueryGenerator";

export const metadata = {
  title: "Multiple Query Generator",
  description: "Generate and format data for SQL queries easily",
};

export default function Home() {
  return (
    <div className="h-full flex justify-center items-start mt-4">
      <MultipleQueryGenerator />
    </div>
  );
}