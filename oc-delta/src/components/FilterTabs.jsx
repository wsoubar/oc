const FILTERS = [
  { key: 'all', label: 'Todas' },
  { key: 'active', label: 'Pendentes' },
  { key: 'completed', label: 'Concluídas' },
]

export default function FilterTabs({ value, onChange, counts }) {
  return (
    <div role="group" aria-label="Filtrar tarefas" className="inline-flex rounded-xl bg-slate-100 p-1">
      {FILTERS.map((filter) => {
        const active = value === filter.key
        return (
          <button
            key={filter.key}
            type="button"
            onClick={() => onChange(filter.key)}
            aria-pressed={active}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              active ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {filter.label}
            <span className="ml-1.5 text-xs text-slate-400">{counts[filter.key]}</span>
          </button>
        )
      })}
    </div>
  )
}
