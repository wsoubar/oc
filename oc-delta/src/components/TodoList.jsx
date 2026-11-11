import { ClipboardList } from 'lucide-react'
import TodoItem from './TodoItem.jsx'

const EMPTY_MESSAGES = {
  all: ['Nenhuma tarefa por aqui', 'Adicione sua primeira tarefa acima.'],
  active: ['Tudo em dia!', 'Você não tem tarefas pendentes.'],
  completed: ['Nada concluído ainda', 'Conclua uma tarefa para vê-la aqui.'],
}

export default function TodoList({ todos, filter, onToggle, onUpdate, onDelete }) {
  if (todos.length === 0) {
    const [title, subtitle] = EMPTY_MESSAGES[filter]
    return (
      <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-slate-200 px-6 py-12 text-center">
        <div className="mb-3 rounded-full bg-indigo-50 p-3 text-indigo-500">
          <ClipboardList className="size-6" />
        </div>
        <p className="font-semibold text-slate-700">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
