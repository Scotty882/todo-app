import { useState } from "react";
import "./index.css";

export default function App() {
  // Keep a stable id for each task (better keys, easier deletes)
  const [tasks, setTasks] = useState([
    { id: 1, text: "items1" },
    { id: 2, text: "items2" },
    { id: 3, text: "items3" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    // case-insensitive duplicate check
    const exists = tasks.some(t => t.text.toLowerCase() === text.toLowerCase());
    if (exists) return;

    setTasks(prev => [...prev, { id: Date.now(), text }]);
    setInputValue("");
  };

  const removeItem = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* Header */}
      <header className="py-8 shadow-sm bg-white">
        <h1 className="text-4xl font-bold text-center">To-Do List</h1>
      </header>

      {/* Main (centered) */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {/* Add form */}
        <form onSubmit={handleAdd} className="w-full max-w-xl flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a task…"
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            autoFocus
            aria-label="Task name"
          />
          <button
            type="submit"
            className="rounded-lg px-5 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-[0.99]"
          >
            Add
          </button>
        </form>

        {/* Task list */}
        <ul className="w-full max-w-xl mt-8 space-y-3 list-none p-0">
          {tasks.length === 0 && (
            <li className="text-center text-gray-500">No tasks yet. Add one above.</li>
          )}

          {tasks.map(({ id, text }) => (
            <li
              key={id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
            >
              <span className="text-lg">{text}</span>

              <button
                onClick={() => removeItem(id)}
                aria-label={`Remove ${text}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-red-50 hover:text-red-600"
                title="Remove"
              >
                ✖️
              </button>
            </li>
          ))}
        </ul>
      </main>

      {/* Footer anchored to bottom */}
      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} My Todo App
      </footer>
    </div>
  );
}