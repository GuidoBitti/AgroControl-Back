import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Cultivo } from './cultivo.entity.js'

export class CultivoController {

  async getAll(req: Request, res: Response) {
    try {
      const cultivo = await orm.em.find(Cultivo, {})

      return res.status(200).json(cultivo)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener los cultivos',
      })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const cultivo = await orm.em.findOne(Cultivo, { id: id })

      if (!cultivo) {
        return res.status(404).json({
          message: 'cultivo no encontrado',
        })
      }

      return res.status(200).json(cultivo)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener el cultivo',
      })
    }
  }


  async create(req: Request, res: Response) {
    try {
      const cultivo = orm.em.create(Cultivo, req.body)
      await orm.em.flush()
      return res.status(201).json(cultivo)
    }catch (error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al crear el cultivo',
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const cultivo = await orm.em.findOne(Cultivo, { id: id })

      if (!cultivo) {
        return res.status(404).json({
          message: 'cultivo no encontrado',
        })
      }

      const { descripcion, tipo } = req.body
      
      if (descripcion !== undefined) {
        cultivo.descripcion = descripcion
      }
      
      if (tipo !== undefined) {
        cultivo.tipo = tipo
      }

      await orm.em.flush()

      return res.status(200).json(cultivo)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al actualizar el cultivo',
      })
    }
  }

    async remove(req: Request, res: Response) {
    try{
      const id = Number(req.params.id)
      const cultivo = await orm.em.findOne(Cultivo, { id: id })
      if(!cultivo) {
        return res.status(404).json({
          message: 'cultivo no encontrado',
        })
      }
      await orm.em.remove(cultivo)
      await orm.em.flush()
      return res.status(200).json({
        message: 'cultivo eliminado',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al eliminar el cultivo',
      })
    }
  }
}