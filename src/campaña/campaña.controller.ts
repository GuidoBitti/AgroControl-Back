import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Campania } from './campaña.entity.js'

export class CampaniaController {

  async getAll(req: Request, res: Response) {
    try {
      const campania = await orm.em.find(Campania, {})

      return res.status(200).json(campania)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener las campañas',
      })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const campania = await orm.em.findOne(Campania, { id: id })

      if (!campania) {
        return res.status(404).json({
          message: 'Campaña no encontrada',
        })
      }

      return res.status(200).json(campania)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener la campaña',
      })
    }
  }


  async create(req: Request, res: Response) {
    try {
      const campania = orm.em.create(Campania, req.body)
      await orm.em.flush()
      return res.status(201).json(campania)
    }catch (error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al crear la campaña',
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const campania = await orm.em.findOne(Campania, { id: id })

      if (!campania) {
        return res.status(404).json({
          message: 'Campaña no encontrada',
        })
      }
      const { descripcion, fechaInicio, fechaFin } = req.body
      
      if (descripcion !== undefined) {
        campania.descripcion = descripcion
      }
      if (fechaInicio !== undefined) {
        campania.fechaInicio = fechaInicio
      }
      if (fechaFin !== undefined) {
        campania.fechaFin = fechaFin
      }
      await orm.em.flush()

      return res.status(200).json(campania)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al actualizar la campaña',
      })
    }
  }

    async remove(req: Request, res: Response) {
    try{
      const id = Number(req.params.id)
      const campania = await orm.em.findOne(Campania, { id: id })
      if(!campania) {
        return res.status(404).json({
          message: 'Campaña no encontrada',
        })
      }
      await orm.em.remove(campania)
      await orm.em.flush()
      return res.status(200).json({
        message: 'Campaña eliminada',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al eliminar la campaña',
      })
    }
  }
}