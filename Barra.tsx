import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-gray-800 p-3 text-white flex justify-start space-x-5">
      <Link to="/">Inicio</Link>
      <Link to="/history">Historial</Link>
    </nav>
  );
}