# BiblioConecta

Sistema web completo para gerenciamento de bibliotecas, permitindo o controle de livros, exemplares, usuários, empréstimos e reservas, com uma interface moderna e painel administrativo.

---

## 1. Objetivo do Sistema

O **BiblioConecta** foi desenvolvido com o propósito de:

- Centralizar e organizar o acervo de livros;
- Automatizar processos de **empréstimos** e **reservas**;
- Gerenciar usuários com diferentes permissões;
- Disponibilizar um **painel administrativo** com visão geral do sistema;
- Facilitar o acesso dos leitores ao catálogo e histórico pessoal.

---

## 2. Funcionalidades Existentes

A tabela abaixo apresenta apenas as funcionalidades realmente existentes no projeto:

| Funcionalidade        | Status                     |
|-----------------------|----------------------------|
| Login / Autenticação (JWT) | ✔ Completo           |
| CRUD de Livros        | ✔ Completo                 |
| CRUD de Exemplares    | ✔ Completo                 |
| Empréstimos           | ✔ Completo                 |
| Reservas              | ✔ Completo                 |
| Filtro por categoria  | ✔ Implementado no Frontend |
| Perfil do usuário     | ✔ Implementado             |
| Hitórico Mensal       | ✔ Implementado             |
    de livros lidos
---

## 3. Arquitetura do Sistema

O sistema segue uma arquitetura **Full Stack**, composta por:

### **Frontend — Next.js**
- Next.js 14 + React  
- Tailwind CSS  
- Axios  
- Framer Motion  
- Componentes reutilizáveis (BookCard, Modal, Sidebar, Navbar etc.)  
- Filtro de categorias  
- Página de perfil do usuário  
- Páginas de gerenciamento de Livros e Usuários 

### **Backend — Node.js / Express**
- Arquitetura monolítica
- API REST estruturada  
- Controllers, Services, Repositories e Middlewares de Autenticação
- Autenticação JWT  
- Criptografia de senhas com Bcrypt  
- CRUD de Livros e Exemplares  
- Lógica de Empréstimos e Reservas  
- Histórico mensal de livros lidos
- Definição de níveis de acesso (USER e ADMIN)

### **Banco de Dados — PostgreSQL**
- Modelagem via **Prisma ORM**  
- Relacionamentos entre:  
  - Usuários  
  - Livros  
  - Exemplares  
  - Empréstimos  
  - Reservas  
  - Roles (USER e ADMIN)

---

## 4. Tecnologias Utilizadas

### **Frontend**
- Next.js 14  
- Typescript
- React  
- Tailwind CSS  
- Axios  
- Lucide Icons  
- Framer Motion  

### **Backend**
- Node.js  
- Typescript
- Express  
- Prisma ORM  
- PostgreSQL  
- Bcrypt  
- JWT  
- Vitest
- Supertest

### **Ferramentas**
- Git / GitHub  
- VS Code 
- Vercel (Front)
- Render (Back)
- Neon DB (Banco)
- Prisma Studio  
- npm  

---

## 5. Instalação e Execução

### **Backend**

```bash
cd backend
npm install

---

### **Frontend**

```bash
cd frontend\web\biblioconecta
npm install

---

## 6. Testes

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
