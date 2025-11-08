// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  //Cria as roles ADMIN e USER
  await prisma.roles.createMany({
    data: [
      {
        nome: "ADMIN",
      },
      {
        nome: "USER",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Roles 'ADMIN' e 'USER' criadas (ou já existentes).");

  // (Opcional) Exibir no console
  const roles = await prisma.roles.findMany();
  console.table(roles);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
