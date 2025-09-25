import { Link } from "react-router-dom";

export function Navbar({ children, left }) {
  return (
  <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
        <div className="flex justify-between items-center">
          <Link to={"/"} className="text-2xl font-bold tracking-wide">
            {children}
          </Link>

          <div className="md:flex gap-6">
            <Link href="/" className="hover:text-yellow-400 transition">{left}</Link>
          </div>
        </div>
      </nav>
  );
}
