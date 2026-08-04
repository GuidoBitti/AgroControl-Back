import { Request, Response } from "express";
import * as service from "../services/usuario.service";

export const getAll = async (
  req: Request,
  res: Response
) => {
  const usuarios = await service.getAll();
  
  res.json(usuarios);
};

// export const getById = async (
//   req: Request,
//   res: Response
// ) => {
//   const rol = await service.getById(
//     Number(req.params.id)
//   );

//   if (!rol) {
//     return res.status(404).json({
//       message: "Rol no encontrado"
//     });
//   }

//   res.json(rol);
// };

// export const create = async (
//   req: Request,
//   res: Response
// ) => {
//   const { descripcion } = req.body;

//   const rol = await service.create(descripcion);

//   res.status(201).json(rol);
// };

// export const update = async (
//   req: Request,
//   res: Response
// ) => {
//   const { descripcion } = req.body;

//   const rol = await service.update(
//     Number(req.params.id),
//     descripcion
//   );

//   res.json(rol);
// };

// export const remove = async (
//   req: Request,
//   res: Response
// ) => {
//   await service.remove(Number(req.params.id));

//   res.status(204).send();
// };