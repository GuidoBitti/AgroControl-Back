import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Rol } from './rol.entity.js'

export class RolController {

  async getAll(req: Request, res: Response) {
    try {
      const rol = await orm.em.find(Rol, {})

      return res.status(200).json(rol)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener los rol',
      })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const rol = await orm.em.findOne(Rol, { id: id })

      if (!rol) {
        return res.status(404).json({
          message: 'Rol no encontrado',
        })
      }

      return res.status(200).json(rol)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener el rol',
      })
    }
  }


  async create(req: Request, res: Response) {
    try {
      const rol = orm.em.create(Rol, req.body)
      await orm.em.flush()
      return res.status(201).json(rol)
    }catch (error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al crear el rol',
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const rol = await orm.em.findOne(Rol, { id: id })

      if (!rol) {
        return res.status(404).json({
          message: 'Rol no encontrado',
        })
      }

      const{ descripcion } = req.body

      if (descripcion !== undefined) {
        rol.descripcion = descripcion
      }

      await orm.em.flush()

      return res.status(200).json(rol)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al actualizar el rol',
      })
    }
  }

    async remove(req: Request, res: Response) {
    try{
      const id = Number(req.params.id)
      const rol = await orm.em.findOne(Rol, { id: id })
      if(!rol) {
        return res.status(404).json({
          message: 'Rol no encontrado',
        })
      }
      await orm.em.remove(rol)
      await orm.em.flush()
      return res.status(200).json({
        message: 'Rol eliminado',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al eliminar el rol',
      })
    }
  }
}