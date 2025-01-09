import JsonViewer from '@/components/JsonViewer';

export const metadata = {
    title: "JSON Viewer",
    description: "Easily view and format JSON data. Search and explore JSON data efficiently with our JSON viewer tool.",
  };

export default function JsonViewerPage() {
  return (
    <div>
      <JsonViewer />
    </div>
  );
}
