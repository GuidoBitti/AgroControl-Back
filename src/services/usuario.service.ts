import * as repository from "../repositories/usuario.repository";

export const getAll = () => {
  return repository.getAll();
};

// export const getById = (id: number) => {
//   return repository.getById(id);
// };

// export const create = (descripcion: string) => {
//   return repository.create(descripcion);
// };

// export const update = (
//   id: number,
//   descripcion: string
// ) => {
//   return repository.update(id, descripcion);
// };

// export const remove = (id: number) => {
//   return repository.remove(id);
// };