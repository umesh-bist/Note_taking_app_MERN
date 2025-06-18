import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
<style>

  
</style>

  return (
    <div style={{fontFamily:'sans-serif', backgroundColor:'gray-300',fontSize:'100%'}} className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-gray-100 to-gray-200 scrollbar-hide ">
      <Header />

      <main className="flex-grow flex justify-center items-center px-4">
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center mt-10 mb-10 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">📒 Note Taking App</h1>
          <p className="text-gray-600 mb-6">
            New here? <span className="font-semibold text-gray-700">Sign up to get started</span><br />
            Already have an account? Login and manage your notes.
          </p>

          <div className="flex flex-col gap-4">
            <Link
              to="/signup"
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="border border-gray-500 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300"
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
