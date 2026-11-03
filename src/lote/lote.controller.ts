import { Request, Response } from 'express'
import { orm } from '../shared/db/orm.js'
import { Lote } from './lote.entity.js'


export class LoteController {

  async getAll(req: Request, res: Response) {
    try {
      const lotes = await orm.em.find(
        Lote,
        { organizacion: req.user!.organizacion },
        { populate: ['LoteCampanias', 'LoteCampanias.Campania'] },
      )

      return res.status(200).json(lotes)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener los lotes',
      })
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const lote = await orm.em.findOne(
        Lote,
        { id, organizacion: req.user!.organizacion },
        { populate: ['LoteCampanias', 'LoteCampanias.Campania'] },
      )

      if (!lote) {
        return res.status(404).json({
          message: 'lote no encontrado',
        })
      }

      return res.status(200).json(lote)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al obtener el lote',
      })
    }
  }


  async create(req: Request, res: Response) {
    try {
      const { numero, latitud, longitud, hectareas, descripcion } = req.body
      const lote = orm.em.create(Lote, {
        numero,
        latitud,
        longitud,
        hectareas,
        descripcion,
        organizacion: req.user!.organizacion,
      })
      await orm.em.flush()
      return res.status(201).json(lote)
    }catch (error){
      console.error(error)
      return res.status(500).json({
        message: 'Error al crear el lote',
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)

      const lote = await orm.em.findOne(Lote, {
        id,
        organizacion: req.user!.organizacion,
      })

      if (!lote) {
        return res.status(404).json({
          message: 'lote no encontrado',
        })
      }

      const { descripcion } = req.body

      if (descripcion !== undefined) {
        lote.descripcion = descripcion
      }

      await orm.em.flush()

      return res.status(200).json(lote)
    } catch (error) {
      console.error(error)

      return res.status(500).json({
        message: 'Error al actualizar el lote',
      })
    }
  }

    async remove(req: Request, res: Response) {
    try{
      const id = Number(req.params.id)
      const lote = await orm.em.findOne(Lote, {
        id,
        organizacion: req.user!.organizacion,
      })
      if(!lote) {
        return res.status(404).json({
          message: 'lote no encontrado',
        })
      }
      await orm.em.remove(lote)
      await orm.em.flush()
      return res.status(200).json({
        message: 'lote eliminado',
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error al eliminar el lote',
      })
    }
  }
}