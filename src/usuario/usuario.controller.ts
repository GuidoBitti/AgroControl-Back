import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Usuario } from './usuario.entity.js'

export class UsuarioController {

  async getAll(req: Request, res: Response) {
    try {
      const usuarios = await orm.em.find(Usuario, {}, { populate: ['rol'] })

      return res.status(200).json(usuarios)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener los usuarios',
      })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const usuario = await orm.em.findOne(Usuario, { id: id }, { populate: ['rol'] })

      if (!usuario) {
        return res.status(404).json({
          message: 'usuario no encontrado',
        })
      }

      return res.status(200).json(usuario)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener el usuario',
      })
    }
  }


  async create(req: Request, res: Response) {
    try {
      const usuario = orm.em.create(Usuario, req.body)
      await orm.em.flush()
      return res.status(201).json(usuario)
    }catch (error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al crear el usuario',
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const usuario = await orm.em.findOne(Usuario, { id: id })

      if (!usuario) {
        return res.status(404).json({
          message: 'usuario no encontrado',
        })
      }

      const { nombre, apellido, email, password, rol, organizacion } = req.body

      if (nombre !== undefined) {
        usuario.nombre = nombre
      }
      if (apellido !== undefined) {
        usuario.apellido = apellido
      }
      if (email !== undefined) {
        usuario.email = email
      }
      if (password !== undefined) {
        usuario.password = password
      }
      if (rol !== undefined) {
        usuario.rol = rol
      }
      if (organizacion !== undefined) {
        usuario.organizacion = organizacion
      }

      await orm.em.flush()

      return res.status(200).json(usuario)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al actualizar el usuario',
      })
    }
  }

    async remove(req: Request, res: Response) {
    try{
      const id = Number(req.params.id)
      const usuario = await orm.em.findOne(Usuario, { id: id })
      if(!usuario) {
        return res.status(404).json({
          message: 'Usuario no encontrado',
        })
      }
      await orm.em.remove(usuario)
      await orm.em.flush()
      return res.status(200).json({
        message: 'Usuario eliminado',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al eliminar el usuario',
      })
    }
  }
}