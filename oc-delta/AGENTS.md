# AGENTS.md

Aplicação de tarefas (todo) em React 19 + Vite 8 + Tailwind CSS v4, com interface em português do Brasil. Pacote único, sem TypeScript. Não é um repositório git.

## Comandos

- `npm run dev`: servidor de desenvolvimento.
- `npm run build`: build de produção em `dist/`. Ele também serve como verificação, pois não há testes nem typecheck.
- `npm run lint`: executa `oxlint` com `.oxlintrc.json`. Rode antes de finalizar uma alteração.
- `npm run preview`: serve o build gerado.
- Não há scripts de teste, typecheck ou formatador. Não invente comandos para eles.

## Arquitetura

- `src/main.jsx` monta o `App` e importa `src/index.css`.
- `src/App.jsx` concentra o estado de filtro e repassa dados e ações aos componentes em `src/components/`.
- `src/hooks/useTodos.js` é a única fonte de estado e de persistência.
- `src/data/seed.js` contém as tarefas de exemplo.
- `dist/` é gerado pelo build e está no `.gitignore`. Não edite.

## Persistência

- A chave do localStorage é `todo-app:v1`, definida em `src/hooks/useTodos.js`.
- As tarefas de exemplo são carregadas somente quando a chave não existe. Uma lista salva vazia (`[]`) continua vazia.
- JSON inválido ou que não seja array cai de volta para `seedTodos`.
- Se mudar o formato dos itens, crie uma nova versão da chave (`v2`) ou faça migração. Não altere o formato sob a mesma chave.

## Convenções

- Tailwind v4 é configurado pelo plugin em `vite.config.js` e pelo bloco `@theme` em `src/index.css`. Não existe `tailwind.config.js`.
- Animações personalizadas `animate-todo-enter` e `animate-todo-exit` são definidas no `@theme` de `src/index.css`.
- A fonte Inter é carregada por `<link>` em `index.html`, e não por `@import` no CSS. Um `@import` depois de `@import "tailwindcss"` quebra o build.
- O lint proíbe chamadas impuras durante a renderização, como `new Date()` ou `Date.now()`. Use `useState(() => ...)` quando precisar delas.
- O React Compiler não está habilitado.
- A interface, mensagens e textos de exemplo ficam em português do Brasil.
- O `README.md` é o boilerplate do template Vite e não descreve o projeto.
