export function Navbar({ children, left }) {
  return (
  <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wide">
            {children}
          </div>

          <div className="md:flex gap-6">
            <a href="#" className="hover:text-yellow-400 transition">{left}</a>
          </div>
        </div>
      </nav>
  );
}
