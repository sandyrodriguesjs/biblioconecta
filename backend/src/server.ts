import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoutes";
import booksRoutes from "./routes/booksRoutes";
import booksCirculationRoutes from "./routes/booksCirculationRoutes";

const app = express();
const prisma = new PrismaClient();

// ✅ Configuração de CORS
app.use(
  cors({
    origin: "http://localhost:3000", // URL do seu frontend
    credentials: true,               // Permite envio de cookies/autenticação
  })
);

app.use(express.json());

// Rotas
app.use("/", userRoutes);
app.use("/", booksRoutes);
app.use("/", booksCirculationRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
