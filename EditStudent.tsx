"use client";

import { Student } from "../types/Student";
import { useState, useEffect } from "react";
import axios from "axios";

interface Props {
  student: Student;
  refresh: () => void;
  cancel: () => void;
}

interface StudentForm {
  id?: number;
  name: string;
  email: string;
  age: string;
  course: string;
}

export default function EditStudent({ student, refresh, cancel }: Props) {
  const [form, setForm] = useState<StudentForm>({
    id: student.id,
    name: student.name || "",
    email: student.email || "",
    age: student.age ? student.age.toString() : "",
    course: student.course || "",
  });

  useEffect(() => {
    setForm({
      id: student.id,
      name: student.name || "",
      email: student.email || "",
      age: student.age ? student.age.toString() : "",
      course: student.course || "",
    });
  }, [student]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:5000/api/students/${student.id}`,
        { ...form, age: Number(form.age) },
        { headers: { Authorization: `Bearer ${token}` } } // ✅ pass token
      );
      refresh();
      cancel();
    } catch (err: any) {
      console.error("Failed to edit student:", err);
      alert(err.response?.data?.error || "Failed to edit student. Check console.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 via-white to-blue-50 p-4">
      <form className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Edit Student</h2>

        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        />
        <input
          type="email"
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Course"
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
          required
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={cancel}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
