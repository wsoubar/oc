# Clare

Gestão pessoal de tarefas em React e TypeScript, com tema claro e layout responsivo.

## Executar

```sh
npm install
npm run dev
```

## Validar

```sh
npm run build
```

Tarefas, projetos e ordenação são gravados automaticamente no localStorage (`clare-v1`). Os dados pertencem ao navegador atual; limpar os dados do site remove as informações. Não há servidor nem sincronização. Dados inválidos são preservados sem sobrescrita e um aviso aparece na interface.

Inclui edição, conclusão, reabertura, exclusão, projetos, prioridades, prazos locais, pesquisa, filtros e progresso calculado. Hoje e Próximas mostram apenas tarefas pendentes; Todas inclui concluídas.
