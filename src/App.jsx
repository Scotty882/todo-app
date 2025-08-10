import { useState } from "react";
import "./index.css";

export default function App() {
  // List of tasks
  const [tasks, setTasks] = useState([]);

  // Use to store user input
  const [taskValue, setTaskValue] = useState("");
  const [dueDateValue, setDueDateValue] = useState("");

  // Duplicate flag
  const [isDuplicate, setIsDuplicate] = useState(false);

  // Add a new task
  const handleAdd = (e) => {
    // Stop submission refreshing the page
    e.preventDefault();

    // Removes leading/trailing whitespace
    const text = taskValue.trim();
    const dueDate = dueDateValue.trim();

    // If empty, do nothing
    if (!text) return;

    // Duplicate check
    if (tasks.some(t => t.text.toLowerCase() === text.toLowerCase())) {
      setIsDuplicate(true);
      setTaskValue("");
      console.log("Duplicate task detected:", text);
      return;
    }
    else {
      setIsDuplicate(false);
    }

    // Add new task to the list
    setTasks(prev => [...prev, { id: Date.now(), text, dueDate}]);

    // Cleaes the input field
    setTaskValue("");
    setDueDateValue("");
  };

  // Remove a task
  const removeItem = (id) => {
    // Replaces array with new array excluding the removed task
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* Header */}
      <header className="py-10 shadow-sm bg-white">
        <h1 className="text-4xl font-bold text-center">To-Do List</h1>
      </header>

      {/* Main (centered) */}
      <main className="flex-1 flex flex-col items-center justify-center mx-6">
        {/* If duplicate, show message */}
        {isDuplicate && (
          <div className="mb-4 text-red-600">
            Task already exists. Please enter a different task.
          </div>
          
        )}

        {/* Add form */}
        <form onSubmit={handleAdd} className="flex w-full max-w-xl gap-3">
          <input
            type="text"
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
            placeholder="Type a task…"
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            autoFocus
            aria-label="Task name"
          />

          <input
            type="date"
            value={dueDateValue}
            onChange={(e) => setDueDateValue(e.target.value)}
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

          {/* If no tasks, show a message */}
          {tasks.length === 0 && (
            <li className="text-center text-gray-500">No tasks yet. Add one above.</li>
          )}
          
          {/* Task headers */}
          {tasks.length > 0 && (
            <div className="flex justify-between mb-2">
              <p className="text-lg font-semibold mb-2">Tasks:</p>
              <p className="text-lg font-semibold mb-2 mx-22">Due Date:</p>
            </div>
          )}
        
          {tasks.map(({ id, text, dueDate}) => (
            <li
              key={id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
            >
              <span className="text-lg flex-1">{text}</span>

              <span className="text-lg px-10">{dueDate}</span>

              {/* Remove button */}
              <button
                onClick={() => removeItem(id)}
                aria-label={`Remove ${text}`}
                className="inline-flex h-8 w-8 items-center justify-center text-gray-600"
                title="Remove"
              >
                X
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