import Base64ToImagePreview from '@/components/Base64ToImagePreview';

export const metadata = {
    title: "Base64 to Image Converter",
    description: "Convert Base64 encoded data to an image and preview it instantly with our simple tool.",
  };

export default function Base64ToImagePage() {
  return (
    <div className="flex justify-center items-center h-full">
      <Base64ToImagePreview />
    </div>
  );
}
