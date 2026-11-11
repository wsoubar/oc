import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const text = value.trim()
    if (!text) return
    onAdd(text)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="O que você precisa fazer?"
        aria-label="Nova tarefa"
        className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100"
      />
      <button
        type="submit"
        aria-label="Adicionar tarefa"
        disabled={!value.trim()}
        className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
      >
        <Plus className="size-5" />
        <span className="hidden sm:inline">Adicionar</span>
      </button>
    </form>
  )
}
