"use client";

import { useEffect, useMemo, useState } from "react";

const filters = [
  { label: "Todas", value: "all" },
  { label: "Pendentes", value: "pending" },
  { label: "Concluídas", value: "completed" },
];

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [taskText, setTaskText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTasks = window.localStorage.getItem("tasks");

    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch {
        window.localStorage.removeItem("tasks");
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [isLoaded, tasks]);

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    if (currentFilter === "pending") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  }), [currentFilter, tasks]);

  const pendingCount = filteredTasks.filter((task) => !task.completed).length;

  function addTask(event) {
    event.preventDefault();
    const trimmedText = taskText.trim();
    if (!trimmedText) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: `${Date.now()}-${Math.random()}`, text: trimmedText, completed: false },
    ]);
    setTaskText("");
  }

  function toggleComplete(id) {
    setTasks((currentTasks) => currentTasks.map((task) => (
      task.id === id ? { ...task, completed: !task.completed } : task
    )));
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8 sm:py-12">
      <section className="task-card mx-auto w-full max-w-[600px] rounded-2xl p-6 sm:p-8" aria-labelledby="page-title">
        <h1 id="page-title" className="text-center text-2xl font-bold sm:text-[1.75rem]">
          📝 Minhas Tarefas
        </h1>
        <p className="subtitle mb-8 mt-2 text-center text-base">
          Gerencie suas tarefas de forma simples e eficiente
        </p>

        <form className="mb-6 flex flex-col gap-3 sm:flex-row" onSubmit={addTask}>
          <label className="sr-only" htmlFor="task-input">Nova tarefa</label>
          <input
            id="task-input"
            className="task-input min-w-0 flex-1 rounded-xl border-2 px-5 py-3.5 text-base outline-none transition-colors"
            type="text"
            placeholder="Adicione uma nova tarefa..."
            autoComplete="off"
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)}
          />
          <button className="add-button rounded-xl px-6 py-3.5 text-base font-semibold transition-colors" type="submit">
            Adicionar
          </button>
        </form>

        <div className="mb-6 flex flex-wrap justify-center gap-3" aria-label="Filtrar tarefas">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`filter-button rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${currentFilter === filter.value ? "active" : ""}`}
              type="button"
              aria-pressed={currentFilter === filter.value}
              onClick={() => setCurrentFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <p className="task-count mb-5 text-center text-sm">
          Tarefa(s): {tasks.length} | Pendentes: {pendingCount}
        </p>

        <ul className="space-y-3" aria-live="polite">
          {filteredTasks.length === 0 ? (
            <li className="empty-state py-8 text-center">Nenhuma tarefa encontrada 😊</li>
          ) : filteredTasks.map((task) => (
            <li className={`task-item flex items-center gap-4 rounded-[10px] p-4 ${task.completed ? "completed" : ""}`} key={task.id}>
              <input
                className="task-checkbox h-5 w-5 cursor-pointer"
                type="checkbox"
                checked={task.completed}
                aria-label={`Marcar ${task.text} como ${task.completed ? "pendente" : "concluída"}`}
                onChange={() => toggleComplete(task.id)}
              />
              <span className="task-text min-w-0 flex-1 break-words text-base">{task.text}</span>
              <button className="delete-button rounded-lg px-2 py-2 text-sm font-semibold transition-colors sm:px-4" type="button" onClick={() => deleteTask(task.id)}>
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
