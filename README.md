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
cd backend
npm test

---

## 7. Acesso ao Sistema

### Ambiente local
- Frontend: http://localhost:3000
- Backend: http://localhost:3333

---

### Ambiente hospedado
- Frontend: https://biblioconecta.vercel.app
- Backend: https://biblioconecta-back.onrender.com

---

## 8. Público-Alvo e Validação

### Público-Alvo
- Bibliotecas escolares
- Universidades
- Pequenos centros de leitura
- Alunos e leitores em geral

### Validação
O processo de validação foi realizado por meio de:
- Testes internos da equipe
- Ajustes na experiência do usuário
- Feedbacks que resultaram em melhorias, como:
  - Inclusão de filtro por categorias
  - Ajuste do modal de detalhes
  - Organização do dashboard administrativo

---

## 9. Equipe de Desenvolvimento

Contribuidores 

---

## Conclusão

O BiblioConecta é um sistema sólido, funcional e moderno, ideal para gerenciar bibliotecas com eficiência.
Sua arquitetura clara e o uso de tecnologias atuais tornam o projeto escalável e de fácil manutenção.
