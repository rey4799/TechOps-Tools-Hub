const HomeScreen = () => {
  return (
    <div>
      {/* Content Page */}
      <main className="flex-1 container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">Welcome to TechOps Tools Hub</h1>
        <p className="text-center text-lg text-gray-600 mb-10">
          Your go-to platform for all daily operations, utilities tools, and more.
        </p>

        {/* Cards Section */}
        <div className="flex flex-wrap justify-center gap-12">
          {/* Daily Operations Card */}
          <div className="w-full sm:w-80 bg-gradient-to-r from-purple-400 via-pink-500 to-red-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold mb-4">Daily Operations</h2>
            <p className="text-lg mb-6">Access daily tasks, reports, and summaries from here.</p>
            <a
              href="/daily"
              className="inline-block px-6 py-3 bg-white text-red-600 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Go to Daily
            </a>
          </div>

          {/* Utilities Card */}
          <div className="w-full sm:w-80 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <h2 className="text-2xl font-semibold mb-4">Utilities</h2>
            <p className="text-lg mb-6">Use tools like CSV to Excel conversion, JSON viewers, and more.</p>
            <a
              href="/utilities"
              className="inline-block px-6 py-3 bg-white text-teal-600 rounded-md font-semibold hover:bg-gray-100 transition"
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
