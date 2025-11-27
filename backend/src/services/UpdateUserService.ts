import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { cloudinary } from "../config/cloudinary";
import fs from "fs";

const prisma = new PrismaClient();

interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  fotoFilePath?: string;
}

export class UpdateUserService {
  async execute(userId: number, data: UpdateUserData) {
    if (!userId) {
      throw new Error("ID do usuário não encontrado.");
    }

    const { name, email, password, fotoFilePath } = data;

    const user = await prisma.usuarios.findUnique({
      where: { id_usuario: userId },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    let fotoURL = user.foto_url;

    if (fotoFilePath) {
      if (user.foto_url) {
        const publicId = user.foto_url.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`usuarios/${publicId}`);
        }
      }

      const upload = await cloudinary.uploader.upload(fotoFilePath, {
        folder: "usuarios",
      });

      fotoURL = upload.secure_url;

      fs.unlinkSync(fotoFilePath);
    }

    const updatedUser = await prisma.usuarios.update({
      where: { id_usuario: userId },
      data: {
        name,
        email,
        foto_url: fotoURL,
        ...(hashedPassword && { password: hashedPassword }),
      },
      select: {
        id_usuario: true,
        name: true,
        email: true,
        status: true,
        data_cadastro: true,
        foto_url: true,
      },
    });

    return updatedUser;
  }
}
