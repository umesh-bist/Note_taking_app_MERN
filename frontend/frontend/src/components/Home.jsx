import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { path: '/notes', label: 'My Notes' },
  { path: '/login', label: 'Login' },
  { path: '/signup', label: 'Sign Up' },
];

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const renderLinks = (className = '') =>
    navLinks.map(({ path, label }) => (
      <Link key={path} to={path} className={className} onClick={() => setMenuOpen(false)}>
        {label}
      </Link>
    ));

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-sky-100 to-blue-200">
      <header className="bg-indigo-600 text-white sticky top-0 z-50 shadow-md">
        <div className="flex justify-between items-center px-4 py-4 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">
            <Link to="/">📝 NoteApp</Link>
          </h1>

          <button
            className="md:hidden focus:outline-none text-xl"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          <nav className="hidden md:flex space-x-6">
            {renderLinks('hover:underline')}
          </nav>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 bg-indigo-600 text-sm">
            {renderLinks('block')}
          </div>
        )}
      </header>

      <main className="flex-grow flex justify-center items-center px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center mt-10 mb-10">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">📒 Note Taking App</h1>
          <p className="text-gray-700 mb-6">
            New here? <span className="font-semibold">Sign up to get started</span><br />
            Already have an account? Login and manage your notes.
          </p>

          <div className="flex flex-col gap-4">
            <Link
              to="/signup"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 border-t w-full">
        <div className="px-4 py-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} NoteApp. Built with 💻 MERN + Redux-Saga.
        </div>
      </footer>
    </div>
  );
};

export default Home;
