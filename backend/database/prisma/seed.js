"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// prisma/seed.ts
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
//# sourceMappingURL=seed.js.map