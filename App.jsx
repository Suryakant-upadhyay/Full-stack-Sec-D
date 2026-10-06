import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "lab-sheet-03-tasks";

function AddTaskForm({ onAddTask }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const value = text.trim();

    if (!value) {
      setError("Please enter a task.");
      return;
    }

    if (value.length < 3) {
      setError("Task must contain at least 3 characters.");
      return;
    }

    const added = onAddTask(value);

    if (!added) {
      setError("That task already exists.");
      return;
    }

    setText("");
    setError("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-wrap">
        <input
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            if (error) setError("");
          }}
          placeholder="What needs to be done?"
          aria-label="New task"
          maxLength={100}
        />
        {error && <p className="error">{error}</p>}
      </div>
      <button className="primary-btn" type="submit">
        Add Task
      </button>
    </form>
  );
}

function TaskList({ tasks, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">✓</div>
        <h3>No tasks yet</h3>
        <p>Add your first task above and start getting things done.</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li className={`task ${task.completed ? "completed" : ""}`} key={task.id}>
          <button
            className="check-btn"
            type="button"
            onClick={() => onToggle(task.id)}
            aria-label={task.completed ? "Mark task active" : "Mark task completed"}
          >
            {task.completed ? "✓" : ""}
          </button>

          <span className="task-text">{task.text}</span>

          <button
            className="delete-btn"
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.text}`}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTask(text) {
    const duplicate = tasks.some(
      (task) => task.text.toLowerCase() === text.toLowerCase()
    );

    if (duplicate) return false;

    setTasks((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        text,
        completed: false
      }
    ]);

    return true;
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function clearCompleted() {
    setTasks((current) => current.filter((task) => !task.completed));
  }

  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((task) => !task.completed);
    if (filter === "completed") return tasks.filter((task) => task.completed);
    return tasks;
  }, [tasks, filter]);

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - activeCount;

  return (
    <div className="page">
      <main className="app-card">
        <header className="app-header">
          <div>
            <p className="eyebrow">FULL STACK LAB · LAB SHEET 03</p>
            <h1>React To-Do App</h1>
            <p className="subtitle">
              Manage tasks with React state, components, validation and local storage.
            </p>
          </div>
          <div className="progress-ring" aria-label={`${completedCount} completed`}>
            <strong>{completedCount}</strong>
            <span>done</span>
          </div>
        </header>

        <AddTaskForm onAddTask={addTask} />

        <section className="toolbar" aria-label="Task filters">
          <div className="filters">
            {["all", "active", "completed"].map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? "filter active" : "filter"}
                onClick={() => setFilter(item)}
              >
                {item[0].toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          <span className="count">
            {activeCount} {activeCount === 1 ? "task" : "tasks"} left
          </span>
        </section>

        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggle={toggleTask}
        />

        {completedCount > 0 && (
          <button className="clear-btn" type="button" onClick={clearCompleted}>
            Clear completed tasks
          </button>
        )}
      </main>

      <footer>
        Built with React · Lab Sheet 03 · Suryakant Upadhyay
      </footer>
    </div>
  );
}

export default App;
