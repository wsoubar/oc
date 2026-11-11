export default function Footer({ activeCount, hasCompleted, onClear }) {
  return (
    <footer className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
      <span>
        {activeCount === 1 ? '1 tarefa restante' : `${activeCount} tarefas restantes`}
      </span>
      <button
        type="button"
        onClick={onClear}
        disabled={!hasCompleted}
        className="font-medium transition hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-slate-500"
      >
        Limpar concluídas
      </button>
    </footer>
  )
}
