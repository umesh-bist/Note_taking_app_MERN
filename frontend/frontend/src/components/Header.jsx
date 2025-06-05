import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-indigo-600 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">📝 NoteApp</Link>
        </h1>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <nav className="hidden md:flex space-x-6">
          <Link to="/notes" className="hover:underline">My Notes</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/signup" className="hover:underline">Sign Up</Link>
        </nav>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-indigo-600 text-sm">
          <Link to="/notes" onClick={() => setMenuOpen(false)} className="block">My Notes</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="block">Login</Link>
          <Link to="/signup" onClick={() => setMenuOpen(false)} className="block">Sign Up</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
