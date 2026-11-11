import { useState } from 'react'

export default function Header({ total, completed }) {
  const [now] = useState(() => new Date())
  const today = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  const dateLabel = today.charAt(0).toUpperCase() + today.slice(1)
  const percent = total ? Math.round((completed / total) * 100) : 0

  return (
    <header>
      <p className="text-sm font-medium text-indigo-500">{dateLabel}</p>
      <div className="mt-1 flex items-end justify-between gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Minhas Tarefas</h1>
        <span className="text-sm font-medium text-slate-500">
          {completed}/{total} concluídas
        </span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </header>
  )
}
