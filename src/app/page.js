import NavBar from "../components/nav/navbar"; // Path ke Navbar yang sudah dibuat

const HomeScreen = () => {
  return (
    <div>
      {/* Navbar */}
      <NavBar />

      {/* Content Page */}
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center mb-8">Welcome to the TechOps Tools Hub</h1>
        <p className="text-center text-lg">This is your go-to platform for all daily operations and utilities tools.</p>
      </main>
    </div>
  );
};

export default HomeScreen;
