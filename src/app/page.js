const HomeScreen = () => {
  return (
    <div>
      {/* Content Page */}
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center mb-8">Welcome to the TechOps Tools Hub</h1>
        <p className="text-center text-lg mb-8">This is your go-to platform for all daily operations and utilities tools.</p>

        {/* Cards Section */}
        <div className="flex justify-center gap-8">
          <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-600 text-white rounded-lg shadow-lg w-80 p-6 hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold mb-4">Daily Operations</h2>
            <p className="text-lg mb-4">Access all your daily tasks and reports from this section.</p>
            <a
              href="/daily"
              className="inline-block px-6 py-2 bg-white text-red-600 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Go to Daily
            </a>
          </div>

          {/* Utilities Card */}
          <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white rounded-lg shadow-lg w-80 p-6 hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold mb-4">Utilities</h2>
            <p className="text-lg mb-4">Use our powerful utilities for tasks like CSV to Excel conversion and more.</p>
            <a
              href="/utilities"
              className="inline-block px-6 py-2 bg-white text-teal-600 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Go to Utilities
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;
