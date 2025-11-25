import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ReservationDeleteService {
  async execute(id_reserva: number) {
    const reserva = await prisma.reservas.findUnique({
      where: { id_reserva }
    });

    if (!reserva) {
      throw new Error("Reserva não encontrada.");
    }

    // Exemplar volta para DISPONIVEL
    await prisma.exemplares.update({
      where: { id_exemplar: reserva.id_exemplar },
      data: { status: "DISPONIVEL" }
    });

    // Deletar reserva
    await prisma.reservas.delete({
      where: { id_reserva }
    });

    return { message: "Reserva cancelada e removida com sucesso." };
  }
}
