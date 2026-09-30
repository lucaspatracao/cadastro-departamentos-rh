# Cadastro de Departamentos (RH)

Aplicação React de página única para cadastrar departamentos (Nome + Sigla) e
visualizar a lista sendo atualizada dinamicamente, sem reload da página.

## Tecnologias

- React + Vite
- JSON Server (backend simulado)
- Bootstrap 5
- Fetch API + Hooks (`useState`, `useEffect`, custom `useFetch`)

## Como rodar

```bash
# 1. Instale as dependências
npm install

# 2. Suba o backend simulado (aba 1)
npm run server

# 3. Suba a aplicação React (aba 2)
npm run dev
```

Acesse `http://localhost:5173`.
API disponível em `http://localhost:3000/departments`.

## Estrutura

```
src/
├── components/
│   ├── DepartmentForm.jsx
│   └── DepartmentList.jsx
├── hooks/
│   └── useFetch.js
├── App.jsx
├── main.jsx
└── index.css
```

## Funcionalidades

- [x] GET inicial com `useEffect` (deps `[]`) e estado de `loading`
- [x] Formulário controlado com validação de sigla (2 a 5 letras)
- [x] POST com `method`, `headers` e `body` corretos
- [x] Botão desabilitado + "Enviando..." durante o POST
- [x] Atualização da lista via `setDepartments(prev => [...prev, novo])`
- [x] Bloqueio de sigla duplicada
- [x] Custom Hook `useFetch`