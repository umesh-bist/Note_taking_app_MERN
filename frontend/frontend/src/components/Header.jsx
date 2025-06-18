import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">📝 NoteApp</Link>
        </h1>

        <button
          className="md:hidden focus:outline-none text-white text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <nav className="hidden md:flex space-x-6">
          <Link to="/login" className="hover:text-gray-300 transition">Login</Link>
          <Link to="/signup" className="hover:text-gray-300 transition">Sign Up</Link>
        </nav>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-gray-700 text-sm">
          <Link to="/login" onClick={() => setMenuOpen(false)} className="block hover:text-gray-300 transition">Login</Link>
          <Link to="/signup" onClick={() => setMenuOpen(false)} className="block hover:text-gray-300 transition">Sign Up</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
