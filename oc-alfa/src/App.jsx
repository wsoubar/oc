import { useEffect, useMemo, useState } from 'react'
import './App.css'

const initialTasks = [
  { id: 1, title: 'Planejar a semana', detail: 'Revisar prioridades e organizar os próximos passos', category: 'Planejamento', due: 'Hoje', priority: 'Alta', completed: false },
  { id: 2, title: 'Responder e-mails importantes', detail: 'Dar retorno para o time de produto e clientes', category: 'Trabalho', due: 'Hoje', priority: 'Média', completed: false },
  { id: 3, title: 'Atualizar apresentação do projeto', detail: 'Adicionar os resultados da última sprint', category: 'Trabalho', due: 'Amanhã', priority: 'Média', completed: false },
  { id: 4, title: 'Fazer compras da semana', detail: 'Frutas, café e ingredientes para o jantar', category: 'Pessoal', due: 'Sexta, 24 mai', priority: 'Baixa', completed: true },
]

const icons = {
  inbox: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4.8A1.8 1.8 0 0 1 5.8 3h12.4A1.8 1.8 0 0 1 20 4.8v11.4a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 16.2V4.8Z" /><path d="M4 13h3.1a2 2 0 0 0 1.8 1.2h2.2a2 2 0 0 0 1.8-1.2H20" /></svg>,
  calendar: <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M7.5 3.5v3M16.5 3.5v3M3.5 9h17M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01" /></svg>,
  clock: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5v5l3.2 2" /></svg>,
  check: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4L19 7" /></svg>,
  plus: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>,
  search: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>,
  bell: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9.8c0-3.5-2.1-5.8-6-5.8s-6 2.3-6 5.8c0 6-2.2 6.2-2.2 7.2h16.4c0-1-2.2-1.2-2.2-7.2ZM9.8 20h4.4" /></svg>,
  more: <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>,
  chevron: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>,
}

const navigation = [
  { id: 'all', label: 'Todas as tarefas', icon: 'inbox' },
  { id: 'today', label: 'Hoje', icon: 'calendar' },
  { id: 'upcoming', label: 'Próximas', icon: 'clock' },
  { id: 'completed', label: 'Concluídas', icon: 'check' },
]

const todayLabel = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
}).format(new Date()).toUpperCase()

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = window.localStorage.getItem('todo-app-tasks')
      return savedTasks ? JSON.parse(savedTasks) : initialTasks
    } catch {
      return initialTasks
    }
  })
  const [activeView, setActiveView] = useState('all')
  const [search, setSearch] = useState('')
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    window.localStorage.setItem('todo-app-tasks', JSON.stringify(tasks))
  }, [tasks])

  const completedCount = tasks.filter((task) => task.completed).length
  const remainingCount = tasks.length - completedCount
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0

  const visibleTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    return tasks.filter((task) => {
      const matchesView =
        activeView === 'all' ||
        (activeView === 'today' && task.due === 'Hoje' && !task.completed) ||
        (activeView === 'upcoming' && task.due !== 'Hoje' && !task.completed) ||
        (activeView === 'completed' && task.completed)
      const matchesSearch = !normalizedSearch || `${task.title} ${task.detail} ${task.category}`.toLowerCase().includes(normalizedSearch)
      return matchesView && matchesSearch
    })
  }, [activeView, search, tasks])

  const addTask = (event) => {
    event.preventDefault()
    const title = newTask.trim()
    if (!title) return
    setTasks((currentTasks) => [{ id: Date.now(), title, detail: 'Adicionada agora', category: 'Pessoal', due: 'Hoje', priority: 'Baixa', completed: false }, ...currentTasks])
    setNewTask('')
  }

  const toggleTask = (id) => {
    setTasks((currentTasks) => currentTasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
  }

  const countForView = (viewId) => {
    if (viewId === 'all') return remainingCount
    if (viewId === 'today') return tasks.filter((task) => task.due === 'Hoje' && !task.completed).length
    if (viewId === 'upcoming') return tasks.filter((task) => task.due !== 'Hoje' && !task.completed).length
    return completedCount
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><span></span><span></span><span></span></div><span>clarity</span></div>
        <div className="sidebar-label">Workspace</div>
        <nav className="main-nav" aria-label="Navegação principal">
          {navigation.map((item) => <button className={`nav-item ${activeView === item.id ? 'active' : ''}`} key={item.id} type="button" onClick={() => setActiveView(item.id)}><span className="nav-icon">{icons[item.icon]}</span><span>{item.label}</span><span className="nav-count">{countForView(item.id)}</span></button>)}
        </nav>

        <div className="sidebar-section">
          <div className="sidebar-label sidebar-label-row"><span>Listas</span><button type="button" className="small-add" aria-label="Adicionar lista">{icons.plus}</button></div>
          <div className="list-link"><span className="list-dot dot-purple"></span>Trabalho<span className="list-total">8</span></div>
          <div className="list-link"><span className="list-dot dot-yellow"></span>Pessoal<span className="list-total">4</span></div>
          <div className="list-link"><span className="list-dot dot-blue"></span>Planejamento<span className="list-total">3</span></div>
        </div>

        <div className="sidebar-bottom">
          <div className="upgrade-card"><span className="sparkle">✦</span><strong>Organize melhor<br />seu dia</strong><p>Tenha mais clareza sobre o que importa.</p><button type="button">Conheça o Clarity Pro <span>{icons.chevron}</span></button></div>
          <div className="profile"><div className="avatar">MC</div><div><strong>Marina Costa</strong><span>Plano gratuito</span></div><button type="button" aria-label="Mais opções">{icons.more}</button></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-separator">/</span><strong>Minhas tarefas</strong></div><div className="topbar-actions"><label className="search-box"><span>{icons.search}</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar tarefas" aria-label="Buscar tarefas" /><kbd>⌘ K</kbd></label><button className="icon-button notification" type="button" aria-label="Notificações">{icons.bell}<i></i></button><div className="mini-avatar">MC</div></div></header>

        <div className="content-wrap">
          <section className="welcome-row"><div><p className="eyebrow">{todayLabel}</p><h1>Bom dia, Marina <span>✦</span></h1><p className="welcome-copy">Um passo de cada vez. Você está no caminho certo.</p></div><button className="primary-button" type="button" onClick={() => document.querySelector('.new-task-input')?.focus()}>{icons.plus} Nova tarefa</button></section>

          <section className="summary-grid" aria-label="Resumo das tarefas">
            <div className="summary-card highlight-card"><div className="summary-icon purple-icon">{icons.inbox}</div><div><span>Tarefas pendentes</span><strong>{remainingCount}</strong><small><b>+12%</b> vs. semana passada</small></div><div className="mini-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
            <div className="summary-card"><div className="summary-icon green-icon">{icons.check}</div><div><span>Concluídas</span><strong>{completedCount}</strong><small>de {tasks.length} tarefas no total</small></div></div>
            <div className="summary-card progress-card"><div className="progress-ring" style={{ '--progress': `${progress * 3.6}deg` }}><strong>{progress}%</strong></div><div><span>Progresso semanal</span><strong className="progress-title">Muito bem!</strong><small>Continue assim</small></div></div>
          </section>

          <section className="tasks-section">
            <div className="section-heading"><div><h2>{navigation.find((item) => item.id === activeView)?.label}</h2><p>{visibleTasks.length} {visibleTasks.length === 1 ? 'tarefa encontrada' : 'tarefas encontradas'}</p></div><div className="view-options"><button type="button" className="view-option active">Lista</button><button type="button" className="view-option">Quadro</button></div></div>
            <form className="new-task-form" onSubmit={addTask}><span className="new-task-plus">{icons.plus}</span><input className="new-task-input" value={newTask} onChange={(event) => setNewTask(event.target.value)} placeholder="Adicionar uma nova tarefa..." aria-label="Nome da nova tarefa" />{newTask && <button type="submit" className="add-task-button">Adicionar</button>}</form>
            <div className="task-list">
              {visibleTasks.map((task) => <article className={`task-card ${task.completed ? 'completed' : ''}`} key={task.id}><button className="task-checkbox" type="button" onClick={() => toggleTask(task.id)} aria-label={task.completed ? `Reabrir ${task.title}` : `Concluir ${task.title}`}>{task.completed && icons.check}</button><div className="task-main"><h3>{task.title}</h3><p>{task.detail}</p></div><span className={`category-tag ${task.category.toLowerCase()}`}><i></i>{task.category}</span><span className="task-due">{task.due}</span><span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span><button className="task-menu" type="button" onClick={() => deleteTask(task.id)} aria-label={`Excluir ${task.title}`}>{icons.more}</button></article>)}
              {!visibleTasks.length && <div className="empty-state"><div className="empty-icon">{icons.check}</div><h3>Nada por aqui</h3><p>Adicione uma tarefa ou ajuste sua busca.</p></div>}
            </div>
            {activeView !== 'completed' && completedCount > 0 && <button className="completed-link" type="button" onClick={() => setActiveView('completed')}>{icons.check} Ver {completedCount} tarefa{completedCount > 1 ? 's' : ''} concluída{completedCount > 1 ? 's' : ''}</button>}
          </section>
        </div>
        <footer className="app-footer"><span>Feito para dias mais leves.</span><span>Última sincronização: agora</span></footer>
      </main>
    </div>
  )
}

export default App
