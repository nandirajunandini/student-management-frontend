export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">🎓 Student Management</h1>

        <div className="flex gap-6">
          <a href="/" className="hover:underline">Home</a>
          <a href="/add-student" className="hover:underline">Add Student</a>
        </div>
      </div>
    </nav>
  );
}
