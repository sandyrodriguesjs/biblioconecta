import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ListPendingReservationsService {
  async execute() {
    return prisma.reservas.findMany({
      where: {
        status: "ATIVA",            
        exemplar: {
          status: "RESERVADO"  
        }
      },
      include: {
        usuario: {
          select: { id_usuario: true, name: true, email: true }
        },
        livro: {
          select: { id_livro: true, titulo: true, autor: true, capa_url: true }
        },
        exemplar: {
          select: { id_exemplar: true, codigo_exemplar: true, status: true }
        }
      },
      orderBy: {
        data_reserva: "asc"
      }
    });
  }
}
