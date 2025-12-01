import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoutes";
import booksRoutes from "./routes/booksRoutes";
import booksCirculationRoutes from "./routes/booksCirculationRoutes";
import emprestimosRoutes from "./routes/emprestimosRoutes";
import { setupSwagger } from "./swagger/swaggerCOnfig";

export const app = express();
const prisma = new PrismaClient();

const allowedOrigins = [
  "http://localhost:3000",              
  "https://biblioconecta.vercel.app", 
];

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

setupSwagger(app);

app.get("/", (req, res) => {
  res.send("API BiblioConecta funcionando 🚀");
});

app.use("/", userRoutes);
app.use("/", booksRoutes);
app.use("/", booksCirculationRoutes);
app.use("/", emprestimosRoutes);

const PORT = 3333;
app.listen(PORT, () =>
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
);
