# 📌 1. Requisitos Funcionais Implementados

## ** Autenticação de Usuário**
- Login com validação de credenciais.
- Autenticação via **JWT**.
- Rotas protegidas por middleware.

---

## ** Cadastro de Usuário**
- Registro de novos usuários.
- Campos básicos: **nome**, **email**, **senha**.
- Validação de email único.
- Backend e frontend funcionando junto.

---

## ** Perfil do Usuário**
Página de perfil contendo:
- Dados da conta.
- Histórico mensal.
- Empréstimos realizados.
- Reservas realizadas.
- Consulta autenticada via JWT.

---

## ** Consulta ao Catálogo de Livros**
- Exibição de todos os livros cadastrados.
- Filtro por **categoria**.
- Busca por **título** e **autor**.

---

## ** Visualização de Detalhes do Livro**
O modal apresenta:
- Título
- Autor
- Sinopse
- Categoria
- Disponibilidade  
Integração direta com backend para status dos exemplares.

---

## ** Cadastro de Livros (Admin)**
CRUD completo:
- Criar
- Editar
- Listar
- Deletar  
Suporte a upload de imagem de capa via **multer**.

---

## ** Cadastro e Gestão de Exemplares**
- Um livro possui múltiplos exemplares.
- Cada exemplar possui identificação própria.
- Status dos exemplares:
  - Disponível  
  - Emprestado  
  - Reservado  

---

## ** Empréstimo de Livros**
- Registrar empréstimo.
- Alterar status do exemplar para **Emprestado**.
- Gravar empréstimo no histórico do usuário.

---

## ** Devolução de Livros**
- Registrar devolução.
- Alterar status do exemplar para **Disponível** ou **Reservado** (se houver fila).
- Registro atualizado no histórico.

---

## ** Renovação de Empréstimo**
- Usuário pode renovar empréstimo.
- Regras implementadas:
  - Renovação limitada a **1 vez**.
  - Impede renovação se houver reserva.
  - Verifica status do usuário.
  - Atualiza novo prazo (mais 14 dias).

---

## ** Sistema de Reservas**
- Usuário pode reservar livros quando todos os exemplares estão emprestados.
- Backend cria objeto **reserva**.
- Implementação de **fila FIFO**.
- Ao devolver:
  - Se existir reserva → exemplar fica **Reservado** para o próximo da fila.

---

## ** Histórico Mensal**
Implementado no backend em `GetReadingHistoryCurrentMonth`, incluindo:
- Livros emprestados.
- Livros reservados.
- Livros lidos no mês.

---

## ** CRUD Administrativo**
Administrador pode:
- Cadastrar livros.
- Cadastrar usuários.
- Gerenciar exemplares.
- Visualizar reservas.
- Visualizar empréstimos.

---

# 📌 2. Regras de Negócio Implementadas

## **RN01 — E-mail Único**
- Validação no backend impedindo duplicidade.

---

## **RN02 — Status do Usuário**
Status:
- **Ativo**
- **Bloqueado**  

Restrições do bloqueado:
- Não pode emprestar.
- Não pode renovar.

---

## **RN03 — Regras de Empréstimo**
- Usuário deve estar **Ativo**.
- Exemplar deve estar **Disponível**.
- Prazo padrão: **14 dias corridos**.
- Limite: **3** empréstimos simultâneos por usuário.

---

## **RN04 — Regras de Reserva**
- Só é possível reservar se todos os exemplares estiverem emprestados.
- Limite: **2 reservas** por usuário.
- Fila de reserva do tipo **FIFO**.
- Ao devolver um exemplar:
  - Se houver reserva: exemplar muda para **Reservado**.

---

## **RN05 — Regras de Devolução**
- Atualiza status do exemplar.
- Verifica reservas ao devolver.
- Se houver atraso:
  - Usuário fica **Bloqueado**.
- Devolução registrada no histórico.

---
