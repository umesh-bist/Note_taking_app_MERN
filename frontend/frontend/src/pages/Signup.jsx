import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [Form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/signup", Form);
      alert("You are Registered Successfully");
      setForm({ name: "", email: "", password: "" });
      navigate("/login");
    } catch (error) {
      alert("Signup not completed");
      setForm({ name: "", email: "", password: "" });
      navigate("/signup");
      console.error("Error occurred:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl"
      >
        <h1 className="w-full text-center text-3xl font-bold text-white bg-gradient-to-r from-black to-gray-800 py-4 rounded-t-2xl shadow-md">
          Signup
        </h1>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            value={Form.name}
            onChange={(e) => setForm({ ...Form, name: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            value={Form.email}
            onChange={(e) => setForm({ ...Form, email: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="********"
            value={Form.password}
            autoComplete="current-password"
            onChange={(e) => setForm({ ...Form, password: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold shadow-md transition duration-300 transform hover:scale-105 active:scale-95"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
