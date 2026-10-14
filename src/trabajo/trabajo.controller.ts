import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Trabajo } from './trabajo.entity.js'

export class TrabajoController {

  async getAll(req: Request, res: Response) {
    try {
      const trabajo = await orm.em.find(Trabajo, {})

      return res.status(200).json(trabajo)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener los trabajos',
      })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const trabajo = await orm.em.findOne(Trabajo, { id: id })

      if (!trabajo) {
        return res.status(404).json({
          message: 'Trabajo no encontrado',
        })
      }

      return res.status(200).json(trabajo)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener el trabajo',
      })
    }
  }


  async create(req: Request, res: Response) {
    try {
      const trabajo = orm.em.create(Trabajo, req.body)
      await orm.em.flush()
      return res.status(201).json(trabajo)
    }catch (error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al crear el trabajo',
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const trabajo = await orm.em.findOne(Trabajo, { id: id })

      if (!trabajo) {
        return res.status(404).json({
          message: 'Trabajo no encontrado',
        })
      }
      const { descripcion, fechaInicio, fechaFin } = req.body
      
      if (descripcion !== undefined) {
        trabajo.descripcion = descripcion
      }
      if (fechaInicio !== undefined) {
        trabajo.fechaInicio = fechaInicio
      }
      if (fechaFin !== undefined) {
        trabajo.fechaFin = fechaFin
      }
      
      await orm.em.flush()

      return res.status(200).json(trabajo)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al actualizar el trabajo',
      })
    }
  }

    async remove(req: Request, res: Response) {
    try{
      const id = Number(req.params.id)
      const trabajo = await orm.em.findOne(Trabajo, { id: id })
      if(!trabajo) {
        return res.status(404).json({
          message: 'Trabajo no encontrado',
        })
      }
      await orm.em.remove(trabajo)
      await orm.em.flush()
      return res.status(200).json({
        message: 'Trabajo eliminado',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al eliminar el trabajo',
      })
    }
  }
}