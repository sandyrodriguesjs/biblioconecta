
---

## ⚙️ Decisões Técnicas e Justificativas

### ✔ Backend Monolítico com Node.js + TypeScript
**Motivos da escolha:**
- Estrutura simples para equipes menores.  
- Deploy mais fácil e custo menor.  
- Node.js lida muito bem com I/O simultâneo.  
- TypeScript garante segurança, tipagem e escalabilidade do código.

### ✔ Frontend SPA com React + TypeScript
**Motivos da escolha:**
- Experiência do usuário rápida e fluida.  
- Grande ecossistema de bibliotecas.  
- Componentização facilita escalabilidade da interface.  
- TS reduz bugs e melhora a manutenção.

### ✔ API REST
**Motivos da escolha:**
- Simples, universal e altamente padronizada.  
- Separação clara entre frontend e backend.  
- JSON leve e eficiente.  
- Facilitador de integrações futuras.

---

## 📚 Resumo Final da Arquitetura

- **Backend:** Monolítico, Node.js + TypeScript, gerencia toda a lógica.  
- **Frontend:** SPA em React + TypeScript, UI moderna e responsiva.  
- **Comunicação:** API REST JSON, padronizada e independente.  
- **Banco de Dados:** PostgreSQL via Prisma.


