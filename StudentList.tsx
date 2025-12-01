"use client";

import { Student } from "../types/Student";
import { useRouter } from "next/navigation";

interface Props {
  students: Student[];
  deleteStudent?: (id: number) => void;
  refresh?: () => void;
  hideActions?: boolean;
}

export default function StudentList({
  students,
  deleteStudent,
  refresh,
  hideActions = false,
}: Props) {
  const router = useRouter();
  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 p-6">

      {/* Show Add/Home only for Admin */}
      {role === "admin" && !hideActions && (
        <div className="w-full max-w-6xl flex justify-between mb-6">
          <button
            onClick={() => router.push("/add-student")}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            ➕ Add Student
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            🏠 Home
          </button>
        </div>
      )}

      {/* Student Table */}
      <div className="w-full max-w-6xl">
        <table className="w-full text-white border border-gray-700 rounded">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Course</th>

              {!hideActions && <th className="p-3 text-left">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-gray-700">
                <td className="p-3">{s.id}</td>
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.age}</td>
                <td className="p-3">{s.email}</td>
                <td className="p-3">{s.course}</td>

                {!hideActions && (
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => router.push(`/dashboard/admin/edit-student/${s.id}`)}
                      className="bg-blue-500 px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (deleteStudent && confirm("Delete this student?")) {
                          deleteStudent(s.id);
                          refresh && refresh();
                        }
                      }}
                      className="bg-red-500 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
