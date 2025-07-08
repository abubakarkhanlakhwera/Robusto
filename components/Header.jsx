'use client';

export default function Header({ activeProjectName }) {
  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <h1 className="text-lg font-semibold">
        {activeProjectName ? `Project: ${activeProjectName}` : 'Tasks'}
      </h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        + Add Task
      </button>
    </header>
  );
}
