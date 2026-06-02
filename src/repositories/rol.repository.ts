import prisma from "../config/prisma";

export const getAll = async () => {
  return prisma.rol.findMany();
};

export const getById = async (id: number) => {
  return prisma.rol.findUnique({
    where: { id }
  });
};

export const create = async (descripcion: string) => {
  return prisma.rol.create({
    data: { descripcion }
  });
};

export const update = async (
  id: number,
  descripcion: string
) => {
  return prisma.rol.update({
    where: { id },
    data: { descripcion }
  });
};

export const remove = async (id: number) => {
  return prisma.rol.delete({
    where: { id }
  });
};