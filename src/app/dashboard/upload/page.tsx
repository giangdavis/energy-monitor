export default function UploadPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Bulk Upload</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="max-w-xl">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center">
            <p className="text-gray-400 mb-4">Drag and drop your CSV file here, or click to select</p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">
              Select File
            </button>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            <p>Supported format: CSV with columns "Date" and "Usage (kWh)"</p>
            <p>Example: 2025-01-01, 12.5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
