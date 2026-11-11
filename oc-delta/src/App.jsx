import { useMemo, useState } from 'react'
import { useTodos } from './hooks/useTodos.js'
import Header from './components/Header.jsx'
import TodoInput from './components/TodoInput.jsx'
import FilterTabs from './components/FilterTabs.jsx'
import TodoList from './components/TodoList.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const { todos, addTodo, toggleTodo, updateTodo, deleteTodo, clearCompleted } = useTodos()
  const [filter, setFilter] = useState('all')

  const completedCount = todos.filter((todo) => todo.completed).length
  const activeCount = todos.length - completedCount

  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((todo) => !todo.completed)
    if (filter === 'completed') return todos.filter((todo) => todo.completed)
    return todos
  }, [todos, filter])

  const counts = {
    all: todos.length,
    active: activeCount,
    completed: completedCount,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/60 to-violet-50 text-slate-800 antialiased">
      <main className="mx-auto max-w-xl px-4 py-12 sm:py-16">
        <div className="rounded-3xl border border-white bg-white/80 p-6 shadow-xl shadow-indigo-100/50 backdrop-blur sm:p-8">
          <Header total={todos.length} completed={completedCount} />

          <div className="mt-6">
            <TodoInput onAdd={addTodo} />
          </div>

          <div className="mt-6">
            <FilterTabs value={filter} onChange={setFilter} counts={counts} />
          </div>

          <div className="mt-4">
            <TodoList
              todos={visibleTodos}
              filter={filter}
              onToggle={toggleTodo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          </div>

          <Footer
            activeCount={activeCount}
            hasCompleted={completedCount > 0}
            onClear={clearCompleted}
          />
        </div>
      </main>
    </div>
  )
}
