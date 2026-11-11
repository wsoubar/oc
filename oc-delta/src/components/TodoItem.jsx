import { useRef, useState } from 'react'
import { Check, Pencil, Trash2 } from 'lucide-react'

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const [removing, setRemoving] = useState(false)
  const cancelRef = useRef(false)

  const startEdit = () => {
    cancelRef.current = false
    setDraft(todo.text)
    setEditing(true)
  }

  const save = () => {
    const text = cancelRef.current ? todo.text : draft.trim()
    cancelRef.current = false
    setEditing(false)
    if (text && text !== todo.text) {
      onUpdate(todo.id, text)
    }
  }

  const cancel = () => {
    cancelRef.current = true
    setEditing(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') save()
    if (event.key === 'Escape') cancel()
  }

  const handleAnimationEnd = (event) => {
    if (removing && event.target === event.currentTarget) onDelete(todo.id)
  }

  return (
    <li
      onAnimationEnd={handleAnimationEnd}
      className={`group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm transition hover:border-indigo-200 hover:shadow-md ${
        removing ? 'animate-todo-exit' : 'animate-todo-enter'
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
        aria-pressed={todo.completed}
        className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition active:scale-90 ${
          todo.completed
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-slate-300 hover:border-indigo-400'
        }`}
      >
        {todo.completed && <Check className="size-3.5 stroke-[3]" />}
      </button>

      {editing ? (
        <input
          autoFocus
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={save}
          onKeyDown={handleKeyDown}
          aria-label="Editar tarefa"
          className="min-w-0 flex-1 rounded-lg border border-indigo-300 px-2 py-1 text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-100"
        />
      ) : (
        <span
          onDoubleClick={startEdit}
          className={`min-w-0 flex-1 break-words text-[15px] transition ${
            todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'
          }`}
        >
          {todo.text}
        </span>
      )}

      {!editing && (
        <div className="flex gap-1 transition md:opacity-0 md:group-hover:opacity-100 md:focus-within:opacity-100">
          <button
            type="button"
            onClick={startEdit}
            aria-label="Editar tarefa"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Pencil className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setRemoving(true)}
            aria-label="Excluir tarefa"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      )}
    </li>
  )
}
