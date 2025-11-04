// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed das roles...");

  // 🔹 Cria as roles ADMIN e USER
  await prisma.roles.createMany({
    data: [
      {
        nome: "ADMIN",
      },
      {
        nome: "USER",
      },
    ],
    skipDuplicates: true, // Evita erro se já existirem
  });

  console.log("✅ Roles 'ADMIN' e 'USER' criadas (ou já existentes).");

  // (Opcional) Exibir no console
  const roles = await prisma.roles.findMany();
  console.table(roles);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("🌱 Seed concluído com sucesso!");
  })
  .catch(async (e) => {
    console.error("❌ Erro ao rodar o seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
