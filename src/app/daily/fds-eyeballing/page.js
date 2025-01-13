// app/daily/fds-eyeballing/page.js

import QueryFormatter from "@/components/QueryFormatter";

export const metadata = {
  title: 'FDS Eyeballing',
  description: 'Page for FDS Eyeballing and SQL Query Formatter',
};

export default function FdsEyeballingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">FDS Eyeballing</h1>

      {/* Other existing content on this page */}
      
      {/* Integrate QueryFormatter component */}
      <QueryFormatter />
    </div>
  );
}
