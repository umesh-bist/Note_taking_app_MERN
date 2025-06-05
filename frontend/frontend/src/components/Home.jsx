import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-sky-100 to-blue-200">
      <Header />

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

      <Footer />
    </div>
  );
};

export default Home;
