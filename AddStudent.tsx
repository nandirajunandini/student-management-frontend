"use client";

import { useState, FormEvent } from "react";
import axios from "axios";

interface Props {
  refresh: () => void;
}

export default function AddStudent({ refresh }: Props) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    course: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!form.name || !form.age || !form.email || !form.course) {
      setErrorMsg("All fields are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMsg("Please login first!");
        return;
      }

      await axios.post(
        "http://127.0.0.1:5000/api/students/",
        {
          name: form.name,
          age: Number(form.age),
          email: form.email,
          course: form.course,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Pass token
        }
      );

      setSuccessMsg("Student added successfully!");
      setForm({ name: "", age: "", email: "", course: "" });
      refresh();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.error || "Failed to add student. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-8 rounded-2xl shadow-xl"
    >
      <h2 className="text-2xl font-bold text-gray-700 text-center">Add Student</h2>

      {errorMsg && (
        <p className="bg-red-100 text-red-700 p-2 rounded text-center">
          {errorMsg}
        </p>
      )}
      {successMsg && (
        <p className="bg-green-100 text-green-700 p-2 rounded text-center">
          {successMsg}
        </p>
      )}

      <input
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="number"
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Age"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
        required
      />
      <input
        type="email"
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Course"
        value={form.course}
        onChange={(e) => setForm({ ...form, course: e.target.value })}
        required
      />

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition">
        Add Student
      </button>
    </form>
  );
}
