import { useState } from 'react'
import './index.css'

function App() {
  const [tasks, setTasks] = useState(['items1', 'items2', 'items3'])

  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (inputValue.trim() === "") return;
    if (inputValue && !tasks.includes(inputValue)) {
      setTasks([...tasks, inputValue])
      setInputValue("");
    }
  }

  const removeItem = (task) => {
    setTasks(tasks.filter((_, i) => i !== task))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="mt-10 text-center text-6xl font-bold">
        <h1>To-Do List</h1>
      </header>
      
      <main className="flex-1 mt-30 text-center">
        <input 
          type="text" 
          placeholder="Type item..."
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button onClick={addItem}>
          Add Item
        </button>

        <ul className="mt-20 text-4xl list-none p-0">
          {tasks.map((task, i) => (
            <li key={i}>
              {task}
                <button 
                  onClick={() => removeItem(i)}  
                >
                  ❌
                </button>
            </li>
          ))}
        </ul>

      </main>

      <footer className="text-center text-4xl">
        <p>Footer</p>
      </footer>
    </div>
  )
}

export default App
