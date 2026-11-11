const now = Date.now()
const hour = 60 * 60 * 1000
const day = 24 * hour

export const seedTodos = [
  {
    id: 'seed-1',
    text: 'Revisar propostas da semana',
    completed: false,
    createdAt: now - 3 * hour,
  },
  {
    id: 'seed-2',
    text: 'Comprar mantimentos para o fim de semana',
    completed: false,
    createdAt: now - 2 * hour,
  },
  {
    id: 'seed-3',
    text: 'Estudar React hooks avançados',
    completed: false,
    createdAt: now - day,
  },
  {
    id: 'seed-4',
    text: 'Marcar consulta médica anual',
    completed: false,
    createdAt: now - day,
  },
  {
    id: 'seed-5',
    text: 'Enviar relatório mensal para a equipe',
    completed: true,
    createdAt: now - 2 * day,
  },
]
