import prisma from "../config/prisma";

export const getAll = async () => {
  return prisma.usuario.findMany();
};

// export const getById = async (id: number) => {
//   return prisma.rol.findUnique({
//     where: { id }
//   });
// };

// export const create = async (descripcion: string) => {
//   return prisma.rol.create({
    
//   });
// };

// export const update = async (
//   id: number,
// ) => {
//   return prisma.rol.update({
//     where: { id },
    
//   });
// };

// export const remove = async (id: number) => {
//   return prisma.rol.delete({
//     where: { id }
//   });
// };