# Minhas Tarefas

Aplicação responsiva para criar, concluir, filtrar e excluir tarefas. Os dados ficam salvos no `localStorage` do navegador.

## Tecnologias

- Next.js com App Router e React
- Tailwind CSS 4
- JavaScript

> O Next.js gerencia o servidor de desenvolvimento e a compilação da aplicação com seu bundler Webpack. Vite não participa desta arquitetura: ele não é um bundler suportado pelo Next.js. Por isso, o projeto usa os comandos nativos do Next.js em vez de manter uma configuração Vite sem função.

## Requisitos

- Node.js 20.9 ou superior
- npm

## Executar localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Compilar para produção

```bash
npm run build
npm start
```

## Estrutura

- `app/page.jsx`: interface e interações da lista de tarefas
- `app/layout.jsx`: estrutura global e metadados
- `app/globals.css`: Tailwind CSS, identidade visual e estilos da interface
- `postcss.config.mjs`: integração do Tailwind CSS com PostCSS
