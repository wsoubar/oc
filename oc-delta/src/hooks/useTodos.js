import { useCallback, useEffect, useState } from 'react'
import { seedTodos } from '../data/seed.js'

const STORAGE_KEY = 'todo-app:v1'

function createId() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return seedTodos

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : seedTodos
  } catch {
    return seedTodos
  }
}

export function useTodos() {
  const [todos, setTodos] = useState(loadTodos)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = useCallback((text) => {
    setTodos((prev) => [
      { id: createId(), text, completed: false, createdAt: Date.now() },
      ...prev,
    ])
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    )
  }, [])

  const updateTodo = useCallback((id, text) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)))
  }, [])

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }, [])

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }, [])

  return { todos, addTodo, toggleTodo, updateTodo, deleteTodo, clearCompleted }
}
