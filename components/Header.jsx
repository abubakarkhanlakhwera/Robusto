import React from 'react';

function Header() {
  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Tasks</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        + Add Task
      </button>
    </header>
  );
}

export default Header;
