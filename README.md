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

## 💻 Telas do Sistema (Web)

### 👤 Telas do Usuário

<p align="center">
  <img src="./validation/screenshot/login.jpg" width="400"/>
  <img src="./validation/screenshot/home.jpg" width="400"/>
  <img src="./validation/screenshot/cardlivro.jpg" width="400"/>
</p>

<p align="center">
  <img src="./validation/screenshot/detalheslivro.jpg" width="400"/>
  <img src="./validation/screenshot/perfilusuario.jpg" width="400"/>
</p>

---

### 🛠️ Telas do Administrador

<p align="center">
  <img src="./validation/screenshot/acervo.jpg" width="400"/>
  <img src="./validation/screenshot/gerenciamento.jpg" width="400"/>
  <img src="./validation/screenshot/emprestimos.jpg" width="400"/>
</p>

<p align="center">
  <img src="./validation/screenshot/reservas.jpg" width="400"/>
</p>


---

## 3. Visão geral da arquitetura

A arquitetura do **BiblioConecta** segue uma abordagem simples, organizada e escalável, estruturada da seguinte forma:

### **Backend**
Aplicação monolítica desenvolvida em **Node.js com TypeScript**, responsável por concentrar:

- Regras de negócio  
- Validações  
- Autenticação  
- Controle de empréstimos e reservas  
- Acesso ao banco de dados via **Prisma ORM**

Toda a lógica crítica do sistema está centralizada no backend, garantindo segurança e consistência.

### **Frontend**
SPA (Single Page Application) construída com **React + Next.js + TypeScript**, responsável por:

- Interface do usuário  
- Navegação entre páginas  
- Painel administrativo  
- Catálogo de livros  
- Filtros e buscas  
- Experiência visual usando **Tailwind CSS** e animações com **Framer Motion**

### **Comunicação**
Toda a comunicação entre frontend e backend ocorre **exclusivamente via API REST**, usando:

- **Axios** para requisições HTTP  
- Tokens **JWT** para persistência de sessão  
- Endpoints públicos e protegidos por middleware  



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
