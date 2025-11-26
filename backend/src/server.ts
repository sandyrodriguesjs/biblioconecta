import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoutes";
import booksRoutes from "./routes/booksRoutes";
import booksCirculationRoutes from "./routes/booksCirculationRoutes";
import emprestimosRoutes from "./routes/emprestimosRoutes";

const app = express();
const prisma = new PrismaClient();

const allowedOrigins = [
  "http://localhost:3000",               // Ambiente de desenvolvimento
  "https://biblioconecta.vercel.app",   // Produção (Vercel)
];

//CORS dinâmico
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Origem bloqueada pelo CORS:", origin);
      return callback(new Error("CORS blocked"), false);
    },
    credentials: true,
  })
);

app.use(express.json());

// Rotas
app.use("/", userRoutes);
app.use("/", booksRoutes);
app.use("/", booksCirculationRoutes);
app.use("/", emprestimosRoutes);

const PORT = 3333;
app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
);
